import { BigNumber, ethers } from "ethers";
import { EXIT_STATUS } from "./config";
import { CheckDepositStatusRequest, CheckStatusRequest, CheckStatusResponse, DepositRequest, ExitRequest, ExitResponse, FetchOption, GenerateTransactionIdParams, Options, SignatureType, SupportedToken } from "./types";

const { config, RESPONSE_CODES } = require('./config');

const domainType = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
];

const metaTransactionType = [
    { name: "sender", type: "address" },
    { name: "receiver", type: "address" },
    { name: "tokenAddress", type: "address" },
    { name: "amount", type: "string" },
    { name: "fromChainId", type: "string" },
    { name: "toChainId", type: "string" }
];

class InstaExit {
    provider: any;
    options: Options;
    supportedTokens: Map<number, SupportedToken[]>;
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
        this.supportedTokens = new Map();
        this.depositTransactionListenerMap = new Map();
    }

    init = async () => {
        const networkIds = config.supportedNetworkIds;
        for(let index = 0; index < networkIds.length; index++) {
            const networkId = networkIds[index];
            const supportedTokens = await this._getSupportedTokensFromServer(networkId);
            this.supportedTokens.set(networkId, supportedTokens);
        }
    }

    _validate = (options: Options) => {
        if (!options) {
            throw new Error(`Options object needs to be passed to InstaExit Object with fromChainId & toChainId as mandatory key`);
        }
        if (!options.fromChainId) {
            throw new Error(`fromChainId is required in options object when creating InstaExit object`);
        }
        if (!options.toChainId) {
            throw new Error(`toChainId is required in options object when creating InstaExit object`);
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

    getSupportedTokens = (networkId: number): (SupportedToken[] | undefined) => {
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
                toChainId: checkStatusRequest.toChainId
            };
            fetchOptions.body = JSON.stringify(body);
            fetch(`${self._getInstaExitBaseURL()}${config.checkRequestStatusPath}`, fetchOptions)
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

    _getSupportedTokensFromServer = (networkId: number): Promise<SupportedToken[]> => {
        const self = this;
        return new Promise(async (resolve, reject) => {
            const fetchOptions: FetchOption = this.getFetchOptions('GET');
            fetch(`${self._getInstaExitBaseURL()}${config.getSupportedTokensPath}?networkId=${networkId}`, fetchOptions)
                .then(response => response.json())
                .then((response) => {
                    if (response && response.SupportedPairList) {
                        self._logMessage(response.SupportedPairList);
                        resolve(response.SupportedPairList);
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

    deposit = async (request: DepositRequest): Promise<ethers.providers.TransactionResponse | undefined> => {
        const tokenContract = new ethers.Contract(request.tokenAddress, config.erc20TokenABI, this.provider.getUncheckedSigner());
        const allowance = await tokenContract.allowance(request.sender, request.depositContractAddress);
        this._logMessage(`Allowance given to LiquidityPoolManager is ${allowance}`);
        if (BigNumber.from(request.amount).lt(allowance)) {
            const depositTransaction = await this._depositTokensToLiquidityPoolManager(request);
            this.listenForExitTransaction(depositTransaction, parseInt(request.fromChainId, 10));
            return depositTransaction;
        } else {
            // this._logMessage(`Approval to Liquidity Pool Manager ${allowance} is less than exit amount requested ${request.amount}`);
            // this._logMessage(`Initiating approve transaction to give approval to ${request.depositContractAddress}`);
            // const approveTransaction = await this.approveLiquidityPoolManager(tokenContract, request.depositContractAddress, request.amount);
            // if (approveTransaction) {
            //     await approveTransaction.wait(1);
            //     return await this._depositTokensToLiquidityPoolManager(request);
            // }
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
                const getURL = `${self._getInstaExitBaseURL()}${config.checkTransferStatusPath}?depositHash=${depositRequest.depositHash}&fromChainId=${depositRequest.fromChainId}`;
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
                const getURL = `${self._getInstaExitBaseURL()}${config.getPoolInfoPath}?tokenAddress=${tokenAddress}&fromChainId=${fromChainId}&toChainId=${toChainId}`;
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

    approveERC20 = async (tokenAddress: string, spender: string, amount: string):
        Promise<ethers.providers.TransactionResponse | undefined> => {
        const tokenContract = new ethers.Contract(tokenAddress, config.erc20TokenABI, this.provider.getUncheckedSigner());
        if (tokenContract) {
            if(this.options.infiniteApproval) {
                amount = ethers.constants.MaxUint256.toString();
            }
            if (spender && amount) {
                return await tokenContract.approve(spender, amount);
            } else {
                this._logMessage(`One of the inputs is not valid => spender: ${spender}, amount: ${amount}`)
            }
        } else {
            this._logMessage("Token contract is not defined");
            throw new Error("Token contract is not defined");
        }
    }

    _depositTokensToLiquidityPoolManager = async (request: DepositRequest) => {
        const liquidityPoolManager = new ethers.Contract(request.depositContractAddress,
            config.liquidityPoolManagerABI, this.provider.getUncheckedSigner());
        const transaction = await liquidityPoolManager.depositErc20(request.tokenAddress, request.receiver, request.amount, request.toChainId);
        return transaction;
    }

    _getInstaExitBaseURL = () => {
        const environment = this.options.environment || "prod";
        return config.instaBaseUrl[environment];
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

module.exports = { InstaExit, SignatureType, RESPONSE_CODES }