const { Web3 } = require('web3');
const events = require('events');
const {config, RESPONSE_CODES, EVENTS, BICONOMY_RESPONSE_CODES, STATUS} = require('./config').default;
import { ethers } from "ethers";

type Options = {
    fromChainId : string,
    toChainId: string,
    defaultAccount: string
}

type FetchOption = {
    body: string,
    method: string,
    headers: any
}

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
        console.log("in Constructor");
        this._validate(options);
        this.provider = provider;
        this.options = options;
    }

    _validate = (options: Options) => {
        if(!options) {
            throw new Error(`Options object needs to be passed to InstaExit Object with fromChainId & toChainId as mandatory key`);
        }
        if(!options.fromChainId) {
            throw new Error(`fromChainId is required in options object when creating InstaExit object`);
        }
        if(!options.toChainId) {
            throw new Error(`toChainId is required in options object when creating InstaExit object`);
        }
    }

    getFetchOptions = (method: string) => {
        return {
            method: method,
            body: "",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }
    }

    generateTxId = (data: any, signer: any, signatureType: string) => {
        
        let engine = this;
        return new Promise(async (resolve, reject)=>{
            let signature;

            let message: any = {...data};
            if(!message.receiver){
                message.receiver = message.sender;
            } 

            if(signatureType === "PERSONAL_SIGN"){
                signature = await signer.signMessage(JSON.stringify(message));
                console.log(signature);
                let recoveredAddress = await ethers.utils.verifyMessage(JSON.stringify(message), signature);
                console.log(recoveredAddress);
            } else if(signatureType === "EIP712_SIGN"){
                let domainData = {
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
                    message: message
                });

                let signedMessage = await this.provider.send("eth_signTypedData_v3", [message.sender, dataToSign]);
                signature = signedMessage.result;
                console.log(signature);
            }
            let fetchOptions: FetchOption = engine.getFetchOptions('POST');
            let body = {
                data: message,
                senderSignature: signature,
                signatureType: signatureType
            };
            fetchOptions.body = JSON.stringify(body);
            fetch(`${config.instaBaseUrl}${config.endPoint}`, fetchOptions)
            .then(response => response.json())
            .then(function(response) {
                if(response) {
                    console.log(response);
                    resolve(response);
                    
                } else {
					let error = engine.formatMessage(RESPONSE_CODES.ERROR_RESPONSE, `Unable to get generate id`);
                    console.log(error);
                    reject(error);
                }
            })
            .catch(function(error) {
                console.log(error);
                reject(error);
            });
        });
    }

    formatMessage = (code: number, message: string) => {
        return {
            code: code,
            message: message
        };
    }
}




module.exports = { InstaExit }