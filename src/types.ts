export type Config = {
    instaBaseUrl: string,
    initiateExitPath: string,
    liquidityPoolManagerABI: object[],
    erc20TokenABI: object[]
}


export type Options = {
    fromChainId : string,
    toChainId: string,
    defaultAccount: string
}

export type FetchOption = {
    body: string,
    method: string,
    headers: any
}

export enum SignatureType {
    PERSONAL_SIGN,
    EIP712_SIGN
}

export type ExitRequest = {
    sender: string,
    receiver: string,
    tokenAddress: string,
    amount: string,
    fromChainId?: string,
    toChainId?: string
}

export type DepositRequest = {
    sender: string,
    receiver: string,
    tokenAddress: string,
    depositContractAddress: string,
    amount: string,
    fromChainId: string,
    toChainId: string,
    trackingId: string
}

export type GenerateTransactionIdParams = {
    data: ExitRequest,
    signatureType: SignatureType
}