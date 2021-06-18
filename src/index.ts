import { BigNumber, ethers } from "ethers";
import { EXIT_STATUS } from "./config";
import { CheckDepositStatusRequest, CheckStatusRequest, CheckStatusResponse,
    DepositRequest, FetchOption, ManualExitResponse, Options, SupportedToken } from "./types";
import { getERC20ApproveDataToSign, getMetaTxnCompatibleTokenData, getSignatureParameters } from './meta-transaction/util';

const { config, RESPONSE_CODES } = require('./config');
const { Biconomy } = require("@biconomy/mexa");


class Hyphen {
    provider: any;
    biconomy: any;
    options: Options;
    supportedTokens: Map<number, void | SupportedToken[]>;
    depositTransactionListenerMap: Map<string, any>;

    constructor(provider: any, options: Options) {
        this._validate(options);
        this.options = options;
        if (ethers.providers.Provider.isProvider(provider)) {
            this._logMessage(`Ethers provider detected`);
            this.provider = provider;
        } else {
            this._logMessage(`Non-Ethers provider detected`);
            if (this.options.biconomy && this.options.biconomy.enable) {
                this.biconomy = new Biconomy(provider, {
                    apiKey: this.options.biconomy.apiKey,
                    debug: this.options.biconomy.debug
                });
                this.provider = new ethers.providers.Web3Provider(this.biconomy);
            } else {
                this.provider = new ethers.providers.Web3Provider(provider);
            }
        }
        this.supportedTokens = new Map();
        this.depositTransactionListenerMap = new Map();
    }

    init = () => {
        const self = this;
        return new Promise<void>(async (resolve, reject) => {
            if(self.options.biconomy && self.options.biconomy.enable
                && self.biconomy.status !== self.biconomy.READY){
                self.biconomy.onEvent(self.biconomy.READY, async () => {
                    await self._init();
                    resolve();
                }).onEvent(self.biconomy.ERROR, () => {
                    self._logMessage("");
                    reject();
                })
            } else {
                await self._init();
                resolve();
            }
        });
    }

    _init = async () => {
        const networkIds = config.supportedNetworkIds;
        for(let index = 0; index < networkIds.length; index++) {
            const networkId = networkIds[index];
            const supportedTokens = await this._getSupportedTokensFromServer(networkId);
            this.supportedTokens.set(networkId, supportedTokens);
        }
    }
    _validate = (options: Options) => {
        if (!options) {
            throw new Error(`Options object needs to be passed to Hyphen Object`);
        }
        if(options.biconomy && options.biconomy.enable && !options.biconomy.apiKey) {
            throw new Error(`apiKey is required under biconomy option. Either disable biconomy or provide apiKey`);
        }
    }

    getERC20TokenDecimals = (address: string) => {
        const tokenContract = new ethers.Contract(address, config.erc20TokenABI, this.provider);
        if(tokenContract) {
            return tokenContract.decimals();
        } else {
            throw new Error("Unable to create token contract object. Please check your network and token address");
        }
    }

    getFetchOptions = (method: string) => {
        return {
            method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }
    }

    getSupportedTokens = (networkId: number): (SupportedToken[] | void) => {
        return this.supportedTokens.get(networkId);
    }

    preDepositStatus = (checkStatusRequest: CheckStatusRequest) : Promise<CheckStatusResponse> => {
        const self = this;
        return new Promise(async (resolve, reject) => {
            const fetchOptions: FetchOption = this.getFetchOptions('POST');
            const body = {
                tokenAddress: checkStatusRequest.tokenAddress,
                amount: checkStatusRequest.amount,
                fromChainId: checkStatusRequest.fromChainId,
                toChainId: checkStatusRequest.toChainId,
                userAddress: checkStatusRequest.userAddress
            };
            fetchOptions.body = JSON.stringify(body);
            fetch(`${self._getHyphenBaseURL()}${config.checkRequestStatusPath}`, fetchOptions)
                .then(response => response.json())
                .then((response) => {
                    self._logMessage(response)
                    resolve(response);
                })
                .catch((error) => {
                    self._logMessage(error);
                    reject(error);
                });
        });
    }

    _getSupportedTokensFromServer = (networkId: number): Promise<SupportedToken[] | void> => {
        const self = this;
        return new Promise(async (resolve, reject) => {
            const fetchOptions: FetchOption = this.getFetchOptions('GET');
            fetch(`${self._getHyphenBaseURL()}${config.getSupportedTokensPath}?networkId=${networkId}`, fetchOptions)
                .then(response => response.json())
                .then((response) => {
                    if (response && response.supportedPairList) {
                        self._logMessage(response.supportedPairList);
                        resolve(response.supportedPairList);
                    } else {
                        const error = self.formatMessage(RESPONSE_CODES.ERROR_RESPONSE, `Unable to get supported tokens`);
                        self._logMessage(error);
                        self._logMessage("Returning default list from config");
                        resolve(config.defaultSupportedTokens.get(networkId));
                    }
                })
                .catch((error) => {
                    self._logMessage(error);
                    self._logMessage("Returning default list from config");
                    resolve(config.defaultSupportedTokens.get(networkId));
                });
        });
    }

    getERC20Allowance = (tokenAddress: string, userAddress: string, spender: string) => {
        return new Promise(async (resolve, reject) => {
            try {
                if(tokenAddress && userAddress && spender) {
                    const tokenContract = new ethers.Contract(tokenAddress, config.erc20TokenABI, this.provider.getUncheckedSigner());
                    const allowance = await tokenContract.allowance(userAddress, spender);
                    resolve(allowance);
                } else {
                    reject("Bad input parameters. Check if all parameters are valid");
                }
            } catch(error) {
                reject(error);
            }
        });
    }

    deposit = async (request: DepositRequest): Promise<ethers.providers.TransactionResponse | undefined> => {
        const tokenContract = new ethers.Contract(request.tokenAddress, config.erc20TokenABI, this.provider.getUncheckedSigner());
        const allowance = await tokenContract.allowance(request.sender, request.depositContractAddress);
        this._logMessage(`Allowance given to LiquidityPoolManager is ${allowance}`);
        if (BigNumber.from(request.amount).lte(allowance)) {
            const depositTransaction = await this._depositTokensToLiquidityPoolManager(request);
            this.listenForExitTransaction(depositTransaction, parseInt(request.fromChainId, 10));
            return depositTransaction;
        } else {
            return Promise.reject(this.formatMessage(RESPONSE_CODES.ALLOWANCE_NOT_GIVEN,`Not enough allowance given to Liquidity Pool Manager contract`));
        }
    }

    listenForExitTransaction = async (transaction: ethers.providers.TransactionResponse, fromChainId: number) => {
        if(this.options.onFundsTransfered) {
            const interval = this.options.exitCheckInterval || config.defaultExitCheckInterval;
            await transaction.wait(1);
            this._logMessage(`Deposit transaction Confirmed. Listening for exit transaction now`);
            let invocationCount = 0;
            const intervalId = setInterval(async ()=>{
                const depositHash = transaction.hash;
                const response: any = await this.checkDepositStatus({depositHash, fromChainId});
                invocationCount++;
                if(response && response.code === RESPONSE_CODES.SUCCESS) {
                    if(response.statusCode === EXIT_STATUS.PROCESSED && response.exitHash) {
                        this.options.onFundsTransfered(response);
                        clearInterval(this.depositTransactionListenerMap.get(depositHash))
                        this.depositTransactionListenerMap.delete(depositHash);
                    }
                }
                if(invocationCount >= config.maxDepositCheckCallbackCount) {
                    this._logMessage(`Max callback count reached ${config.maxDepositCheckCallbackCount}. Clearing interval now`);
                    clearInterval(this.depositTransactionListenerMap.get(depositHash))
                    this.depositTransactionListenerMap.delete(depositHash);
                }
            }, interval);
            this.depositTransactionListenerMap.set(transaction.hash, intervalId);
        } else {
            this._logMessage(`onFundsTransfered method is missing from options so not listening for exit transaction`);
        }
    }

    checkDepositStatus = (depositRequest: CheckDepositStatusRequest) => {
        const self = this;
        return new Promise(async (resolve, reject) => {
            if(depositRequest && depositRequest.depositHash && depositRequest.fromChainId) {
                const fetchOptions: FetchOption = this.getFetchOptions('GET');
                const getURL = `${self._getHyphenBaseURL()}${config.checkTransferStatusPath}?depositHash=${depositRequest.depositHash}&fromChainId=${depositRequest.fromChainId}`;
                fetch(getURL, fetchOptions)
                    .then(response => response.json())
                    .then((response) => {
                        self._logMessage(response)
                        resolve(response);
                    })
                    .catch((error) => {
                        self._logMessage(error);
                        reject(error);
                    });
            } else {
                reject(this.formatMessage(RESPONSE_CODES.BAD_REQUEST ,"Bad input params. depositHash and fromChainId are mandatory parameters"));
            }
        });
    }

    getPoolInformation = (tokenAddress: string, fromChainId: number, toChainId: number) => {
        const self = this;
        return new Promise(async (resolve, reject) => {
            if(tokenAddress && fromChainId !== undefined && toChainId !== undefined) {
                const fetchOptions: FetchOption = this.getFetchOptions('GET');
                const getURL = `${self._getHyphenBaseURL()}${config.getPoolInfoPath}?tokenAddress=${tokenAddress}&fromChainId=${fromChainId}&toChainId=${toChainId}`;
                fetch(getURL, fetchOptions)
                    .then(response => response.json())
                    .then((response) => {
                        self._logMessage(response)
                        resolve(response);
                    })
                    .catch((error) => {
                        self._logMessage(error);
                        reject(error);
                    });
            } else {
                reject(this.formatMessage(RESPONSE_CODES.BAD_REQUEST ,"Bad input params. fromChainId, toChainId and tokenAddress are mandatory parameters"));
            }
        });
    }

    approveERC20 = async (tokenAddress: string, spender: string, amount: string, userAddress: string):
        Promise<ethers.providers.TransactionResponse | undefined> => {
        const currentNetwork = await this.provider.getNetwork();
        if(currentNetwork) {
            const erc20ABI = this._getERC20ABI(currentNetwork.chainId, tokenAddress);
            if(!erc20ABI) {
                throw new Error(`ERC20 ABI not found for token address ${tokenAddress} on networkId ${currentNetwork.chainId}`)
            }

            const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, this.provider.getUncheckedSigner());
            const tokenContractInterface = new ethers.utils.Interface(erc20ABI);
            if (tokenContract) {
                if(this.options.infiniteApproval) {
                    amount = ethers.constants.MaxUint256.toString();
                    this._logMessage(`Infinite approval flag is true, so overwriting the amount with value ${amount}`);
                }
                if (spender && amount) {
                    // check if biconomy enable?
                    if(this.options.biconomy && this.options.biconomy.enable){
                        if(config.customMetaTxnSupportedNetworksForERC20Tokens.indexOf(currentNetwork.chainId) > -1) {
                            // Call executeMetaTransaction method
                            const functionSignature = tokenContractInterface.encodeFunctionData("approve", [spender, amount]);
                            const tokenData = getMetaTxnCompatibleTokenData(tokenAddress, currentNetwork.chainId);
                            const dataToSign = await getERC20ApproveDataToSign({
                                contract: tokenContract,
                                abi: erc20ABI,
                                domainType: config.erc20MetaTxnDomainType,
                                metaTransactionType: config.customMetaTxnType,
                                userAddress,
                                spender,
                                amount,
                                name: tokenData.name,
                                version: tokenData.version,
                                address: tokenAddress,
                                salt: '0x' + (currentNetwork.chainId).toString(16).padStart(64, '0')
                            });
                            // Its important to use eth_signTypedData_v3 and not v4 to get EIP712 signature because we have used salt in domain data
                            // instead of chainId
                            const signature = await this.provider.send("eth_signTypedData_v3", [userAddress, dataToSign])
                            const { r, s, v } = getSignatureParameters(signature);
                            return await tokenContract.executeMetaTransaction(userAddress, functionSignature, r, s, v);
                        } else {
                            return await tokenContract.approve(spender, amount);
                        }
                    } else {
                        return await tokenContract.approve(spender, amount);
                    }
                } else {
                    this._logMessage(`One of the inputs is not valid => spender: ${spender}, amount: ${amount}`)
                }
            } else {
                this._logMessage("Token contract is not defined");
                throw new Error("Token contract is not defined. Please check if token address is present on the current chain");
            }
        } else {
            throw new Error("Unable to get current network from provider during approveERC20 method");
        }
    }

    triggerManualTransfer = (depositHash: string, chainId: string) : Promise<ManualExitResponse | undefined> => {
        const self = this;
        return new Promise( (resolve, reject) => {
            if(depositHash && chainId && depositHash!=="" && chainId !== "") {
                const fetchOptions: FetchOption = this.getFetchOptions('POST');
                const _data = {
                    "fromChainId" : chainId,
                    "depositHash" : depositHash
                }
                fetchOptions.body = JSON.stringify(_data);
                const getURL = `${self._getHyphenBaseURL()}${config.getManualTransferPath}`;
                fetch(getURL, fetchOptions)
                    .then(response => response.json())
                    .then((response) => {
                        self._logMessage(response)
                        resolve(response);
                    })
                    .catch((error) => {
                        self._logMessage(error);
                        reject(error);
                    });
            } else {
                reject(this.formatMessage(RESPONSE_CODES.BAD_REQUEST ,"Bad input params. depositHash and chainId are mandatory parameters"));
            }
        })
    }

    _getERC20ABI = (networkId: number, tokenAddress: string) => {
        // tokenAddress to be used in future for any custom token support
        return config.erc20ABIByNetworkId.get(networkId);
    }

    _depositTokensToLiquidityPoolManager = async (request: DepositRequest) => {
        const liquidityPoolManager = new ethers.Contract(request.depositContractAddress,
            config.liquidityPoolManagerABI, this.provider.getUncheckedSigner());
        const transaction = await liquidityPoolManager.depositErc20(request.tokenAddress, request.receiver,
            request.amount, request.toChainId);
        return transaction;
    }

    _getHyphenBaseURL = () => {
        const environment = this.options.environment || "prod";
        return config.hyphenBaseUrl[environment];
    }

    formatMessage = (code: number, message: string) => {
        return {
            code,
            message
        };
    }

    _logMessage = (message: object|string) => {
        if(this.options && this.options.debug)
            console.log(message);
    }
}

module.exports = { Hyphen, RESPONSE_CODES }