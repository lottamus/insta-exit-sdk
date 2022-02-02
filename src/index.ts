import { BigNumber, ethers } from "ethers";
import { EXIT_STATUS, SIGNATURE_TYPES } from "./config";
import { CheckDepositStatusRequest, CheckStatusRequest, CheckStatusResponse,
    DepositRequest, FetchOption, InternalBiconomyOption, ManualExitResponse, Options, SupportedToken, Transaction, TransactionResponse } from "./types";
import { getERC20ApproveDataToSign, getMetaTxnCompatibleTokenData, getSignatureParameters } from './meta-transaction/util';
import { isEthersProvider, isNativeAddress } from './util';

const { config, RESPONSE_CODES } = require('./config');
const { Biconomy } = require("@biconomy/mexa");

class Hyphen {
    provider: any;
    walletProvider: any;
    biconomyProvider: any;
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
            this.provider = new ethers.providers.Web3Provider(provider);
        }

        if (this.options.biconomy && this.options.biconomy.enable) {
            const biconomyOptions : InternalBiconomyOption = {
                apiKey: this.options.biconomy.apiKey,
                debug: this.options.biconomy.debug
            };
            if(options.walletProvider) {
                biconomyOptions.walletProvider = options.walletProvider;
            }
            this.biconomy = new Biconomy(this.provider, biconomyOptions);
            this.biconomyProvider = new ethers.providers.Web3Provider(this.biconomy);
        }
        if(options.walletProvider) {
            if(isEthersProvider(options.walletProvider)) {
              throw new Error("Wallet Provider in options can't be an ethers provider. Please pass the provider you get from your wallet directly.")
            }
            this.walletProvider = new ethers.providers.Web3Provider(options.walletProvider);
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
                }).onEvent(self.biconomy.ERROR, (error: object, message: string) => {
                    self._logMessage(error);
                    self._logMessage(message);
                    reject(error);
                })
            } else {
                await self._init();
                resolve();
            }
        });
    }

    _init = async () => {
        if(this.provider) {
            const currentNetwork = await this.provider.getNetwork();
            const networkId = currentNetwork.chainId;
            if(networkId) {
                const supportedTokens = await this._getSupportedTokensFromServer(networkId);
                this.supportedTokens.set(networkId, supportedTokens);
            } else {
                throw new Error("Unable to get network id from given provider object");
            }
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

    _getProvider = (useBiconomy: boolean) => {
        if(useBiconomy) {
            return this.biconomyProvider ? this.biconomyProvider : this.provider;
        } else {
            return this.provider;
        }
    }

    _getProviderWithAccounts = (useBiconomy: boolean) => {
        let result;
        if(this.walletProvider) {
            result = this.walletProvider;
        } else {
            result = this._getProvider(useBiconomy);
        }
        return result;
    }

    getERC20TokenDecimals = (address: string) => {
        const tokenContract = new ethers.Contract(address, config.erc20TokenABI, this._getProvider(false));
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
                    const tokenContract = new ethers.Contract(tokenAddress, config.erc20TokenABI, this._getProvider(false));
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

    deposit = async (request: DepositRequest): Promise<TransactionResponse | undefined> => {
        const provider = this._getProvider(request.useBiconomy);
        if(isNativeAddress(request.tokenAddress)) {
            const depositTransaction = await this._depositTokensToLiquidityPoolManager(request);
            if(depositTransaction) {
                this.listenForExitTransaction(depositTransaction, parseInt(request.fromChainId, 10));
            }
            return depositTransaction;
        } else {
            const tokenContract = new ethers.Contract(request.tokenAddress, config.erc20TokenABI, provider);
            const allowance = await tokenContract.allowance(request.sender, request.depositContractAddress);
            this._logMessage(`Allowance given to LiquidityPoolManager is ${allowance}`);
            if (BigNumber.from(request.amount).lte(allowance)) {
                const depositTransaction = await this._depositTokensToLiquidityPoolManager(request);
                if(depositTransaction) {
                    this.listenForExitTransaction(depositTransaction, parseInt(request.fromChainId, 10));
                }
                return depositTransaction;
            } else {
                return Promise.reject(this.formatMessage(RESPONSE_CODES.ALLOWANCE_NOT_GIVEN,`Not enough allowance given to Liquidity Pool Manager contract`));
            }
        }
    }

    listenForExitTransaction = async (transaction: TransactionResponse, fromChainId: number) => {
        if(this.options.onFundsTransfered) {
            const interval = this.options.exitCheckInterval || config.defaultExitCheckInterval;
            await transaction.wait(1);
            this._logMessage(`Deposit transaction Confirmed. Listening for exit transaction now`);
            let invocationCount = 0;
            const intervalId = setInterval(async () => {
                const depositHash = transaction.hash;
                const response: any = await this.checkDepositStatus({depositHash, fromChainId});
                invocationCount++;
                if(response && response.code === RESPONSE_CODES.SUCCESS) {
                    if(response.statusCode === EXIT_STATUS.PROCESSED && response.exitHash) {
                        this.options.onFundsTransfered(response);
                        clearInterval(this.depositTransactionListenerMap.get(depositHash))
                        this.depositTransactionListenerMap.delete(depositHash);
                    } else if(response.exitHash) {
                        this.options.onFundsTransfered(response);
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

    approveERC20 = async (tokenAddress: string, spender: string, amount: string, userAddress: string,
        infiniteApproval: boolean, useBiconomy: boolean):
        Promise<TransactionResponse | undefined> => {
        const provider = this._getProvider(useBiconomy);
        const currentNetwork = await provider.getNetwork();
        let approvalAmount: BigNumber = BigNumber.from(amount);
        if(currentNetwork) {
            const erc20ABI = this._getERC20ABI(currentNetwork.chainId, tokenAddress);
            if(!erc20ABI) {
                throw new Error(`ERC20 ABI not found for token address ${tokenAddress} on networkId ${currentNetwork.chainId}`)
            }

            const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, provider);
            const tokenContractInterface = new ethers.utils.Interface(erc20ABI);
            const tokenInfo = config.tokenAddressMap[tokenAddress.toLowerCase()] ? config.tokenAddressMap[tokenAddress.toLowerCase()][currentNetwork.chainId] : undefined;
            if (tokenContract) {
                if((infiniteApproval !== undefined && infiniteApproval) || (infiniteApproval === undefined && this.options.infiniteApproval)) {
                    approvalAmount = ethers.constants.MaxUint256;
                    this._logMessage(`Infinite approval flag is true, so overwriting the amount with value ${amount}`);
                }
                if (spender && approvalAmount) {
                    // check if biconomy enable?
                    if(this.options.biconomy && this.options.biconomy.enable){
                        const customMetaTxSupport = config.customMetaTxnSupportedNetworksForERC20Tokens[currentNetwork.chainId];
                        if(customMetaTxSupport && customMetaTxSupport.indexOf(tokenAddress.toLowerCase()) > -1) {
                            // Call executeMetaTransaction method
                            const functionSignature = tokenContractInterface.encodeFunctionData("approve", [spender, approvalAmount.toString()]);
                            const tokenData = getMetaTxnCompatibleTokenData(tokenAddress, currentNetwork.chainId);
                            const dataToSign = await getERC20ApproveDataToSign({
                                contract: tokenContract,
                                abi: erc20ABI,
                                domainType: config.erc20MetaTxnDomainType,
                                metaTransactionType: config.customMetaTxnType,
                                userAddress,
                                spender,
                                amount: approvalAmount.toString(),
                                name: tokenData.name,
                                version: tokenData.version,
                                address: tokenAddress,
                                salt: '0x' + (currentNetwork.chainId).toString(16).padStart(64, '0')
                            });

                            const _provider = this._getProviderWithAccounts(useBiconomy);
                            if(_provider) {
                                const signature = await _provider.send("eth_signTypedData_v4", [userAddress, dataToSign])
                                const { r, s, v } = getSignatureParameters(signature);

                                const { data } = await tokenContract.populateTransaction.executeMetaTransaction(userAddress, functionSignature, r, s, v);
                                const txParams: Transaction = {
                                    data,
                                    to: tokenAddress,
                                    from: userAddress,
                                    value: '0x0'
                                };
                                return this._sendTransaction(provider, txParams);
                            } else {
                                throw new Error("Couldn't get a provider to get user signature. Make sure you have passed correct provider or walletProvider field in Hyphen constructor.");
                            }
                        } else if(tokenInfo && tokenInfo.symbol === 'USDC' && tokenInfo.permitSupported) {
                            // If token is USDC call permit method
                            const deadline:number = Number(Math.floor(Date.now() / 1000 + 3600));
                            const usdcDomainData = {
                                name: tokenInfo.name,
                                version: tokenInfo.version,
                                chainId: currentNetwork.chainId,
                                verifyingContract: tokenAddress
                            };
                            const nonce = await tokenContract.nonces(userAddress);
                            const permitDataToSign = {
                                types: {
                                  EIP712Domain: config.domainType,
                                  Permit: config.eip2612PermitType,
                                },
                                domain: usdcDomainData,
                                primaryType: "Permit",
                                message: {
                                  owner: userAddress,
                                  spender,
                                  value: approvalAmount.toString(),
                                  nonce: parseInt(nonce, 10),
                                  deadline
                                },
                            };
                            const _provider = this._getProviderWithAccounts(useBiconomy);
                            if(_provider) {
                                const signature = await _provider.send("eth_signTypedData_v4", [userAddress, JSON.stringify(permitDataToSign)]);
                                const { r, s, v } = getSignatureParameters(signature);

                                const { data } = await tokenContract.populateTransaction.permit(userAddress, spender, approvalAmount.toString(), deadline, v, r, s);
                                const txParams: Transaction = {
                                    data,
                                    to: tokenAddress,
                                    from: userAddress,
                                    value: '0x0'
                                };
                                return this._sendTransaction(provider, txParams);
                            } else {
                                throw new Error("Couldn't get a provider to get user signature. Make sure you have passed correct provider or walletProvider field in Hyphen constructor.");
                            }
                        } else {
                            const { data } = await tokenContract.populateTransaction.approve(spender, approvalAmount.toString());
                            const txParams: Transaction = {
                                data,
                                to: tokenAddress,
                                from: userAddress,
                                value: '0x0'
                            };
                            return this._sendTransaction(provider, txParams);
                        }
                    } else {
                        const { data } = await tokenContract.populateTransaction.approve(spender, approvalAmount.toString());
                        const txParams: Transaction = {
                            data,
                            to: tokenAddress,
                            from: userAddress,
                            value: '0x0'
                        };
                        return this._sendTransaction(provider, txParams);
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
        let abi = config.erc20ABIByToken.get(tokenAddress.toLowerCase());
        if(!abi) {
            abi = config.erc20ABIByNetworkId.get(networkId);
        }
        // tokenAddress to be used in future for any custom token support
        return abi;
    }

    _depositTokensToLiquidityPoolManager = async (request: DepositRequest) => {
        try {
            const provider = this._getProvider(request.useBiconomy);
            const lpManager = new ethers.Contract(request.depositContractAddress,
                config.liquidityPoolManagerABI, provider);

            let txData;
            let value = '0x0';
            if(isNativeAddress(request.tokenAddress)) {
                const { data } = await lpManager.populateTransaction.depositNative(request.receiver, request.toChainId);
                txData = data;
                value = ethers.utils.hexValue(ethers.BigNumber.from(request.amount));
            } else {
                const { data } = await lpManager.populateTransaction.depositErc20(request.tokenAddress, request.receiver,
                    request.amount, request.toChainId);
                txData = data;
            }

            const txParams: Transaction = {
                data: txData,
                to: request.depositContractAddress,
                from: request.sender,
                value
            };
            if(this.options.signatureType) {
                txParams.signatureType = this.options.signatureType;
            }

            return this._sendTransaction(provider, txParams);
        } catch(error) {
            this._logMessage(error as object);
        }
    }

    _sendTransaction = async (_provider: any, rawTransaction: Transaction) => {
        if(_provider && rawTransaction) {
            const transactionHash = await _provider.send("eth_sendTransaction", [rawTransaction]);

            const response : TransactionResponse = {
                hash: transactionHash,
                wait: (confirmations?: number): ethers.providers.TransactionReceipt => {
                    return _provider.waitForTransaction(transactionHash, confirmations);
                }
            };
            return response;
        } else {
            throw new Error("Error while sending transaction. Either provider or rawTransaction is not defined");
        }
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

module.exports = { Hyphen, RESPONSE_CODES, SIGNATURE_TYPES }