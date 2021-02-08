import { BigNumber, ethers } from "ethers";
import { DepositRequest, ExitRequest, FetchOption, GenerateTransactionIdParams, Options, SignatureType } from "./types";

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

    constructor(provider: any, options: Options) {
        this._validate(options);
        if(ethers.providers.Provider.isProvider(provider)) {
            this._logMessage(`Ethers provider detected`);
            this.provider = provider;
        } else {
            this._logMessage(`Non-Ethers provider detected`);
            this.provider = new ethers.providers.Web3Provider(provider);
        }
        this.options = options;
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

    getFetchOptions = (method: string) => {
        return {
            method,
            body: "",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }
    }

    generateTxId = (exitRequest: ExitRequest, signatureType: SignatureType) => {
        const engine = this;

        return new Promise(async (resolve, reject) => {
            let signature;

            const message: ExitRequest = exitRequest;
            if (!message.receiver) {
                message.receiver = message.sender;
            }

            if(!message.fromChainId) {
                message.fromChainId = this.options.fromChainId;
            }

            if(!message.toChainId) {
                message.toChainId = this.options.toChainId;
            }

            console.log(message.sender);
            console.log(message);
            if (signatureType === SignatureType.PERSONAL_SIGN) {
                signature = await engine.provider.send("personal_sign", [message.sender, JSON.stringify(message)]);
                console.log(signature);
                const recoveredAddress = await ethers.utils.verifyMessage(JSON.stringify(message), signature);
                console.log(recoveredAddress);

            } else if (signatureType === SignatureType.EIP712_SIGN) {
                const domainData = {
                    name: "InstaExit",
                    version: "1",
                };

                const dataToSign = JSON.stringify({
                    types: {
                        EIP712Domain: domainType,
                        MetaTransaction: metaTransactionType
                    },
                    domain: domainData,
                    primaryType: "MetaTransaction",
                    message
                });

                const signedMessage = await engine.provider.send("eth_signTypedData_v3", [message.sender, dataToSign]);
                signature = signedMessage.result;
                console.log(signature);
            }
            const fetchOptions: FetchOption = engine.getFetchOptions('POST');
            const body = {
                data: message,
                senderSignature: signature,
                signatureType
            };
            fetchOptions.body = JSON.stringify(body);
            fetch(`${config.instaBaseUrl}${config.initiateExitPath}`, fetchOptions)
                .then(response => response.json())
                .then((response) => {
                    if (response) {
                        console.log(response);
                        resolve(response);
                    } else {
                        const error = engine.formatMessage(RESPONSE_CODES.ERROR_RESPONSE, `Unable to get generate id`);
                        console.log(error);
                        reject(error);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    }

    deposit = async (request: DepositRequest) : Promise<ethers.providers.TransactionResponse | undefined> => {
        const tokenContract = new ethers.Contract(request.tokenAddress, config.erc20TokenABI, this.provider.getUncheckedSigner());
        const allowance = await tokenContract.allowance(request.sender, request.depositContractAddress);
        if(BigNumber.from(request.amount).lt(allowance)) {
            return this._depositTokensToLiquidityPoolManager(request);
        } else {
            this._logMessage(`Approval to Liquidity Pool Manager ${allowance} is less than exit amount requested ${request.amount}`);
            const approveTransaction = await this.approveLiquidityPoolManager(tokenContract, request.depositContractAddress, request.amount);
            if(approveTransaction) {
                await approveTransaction.wait(1);
                return await this._depositTokensToLiquidityPoolManager(request);
            }
        }
    }

    approveLiquidityPoolManager = async (tokenContract: ethers.Contract, spender: string, amount: string):
    Promise<ethers.providers.TransactionResponse | undefined> => {
        if(tokenContract) {
            if(spender && amount) {
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
        const transaction = await liquidityPoolManager.depositErc20(request.tokenAddress, request.receiver, request.amount, request.trackingId);
        return transaction;
    }


    formatMessage = (code: number, message: string) => {
        return {
            code,
            message
        };
    }

    _logMessage = (message: string) => {
        console.log(message);
    }
}

module.exports = { InstaExit, SignatureType }