import { Contract } from "@ethersproject/contracts";
import { ethers } from "ethers";
import { config } from "./config";

export type Config = {
  hyphenBaseUrl: object;
  initiateExitPath: string;
  getSupportedTokensPath: string;
  checkRequestStatusPath: string;
  checkTransferStatusPath: string;
  getPoolInfoPath: string;
  liquidityPoolManagerABI: object[];
  erc20TokenABI: object[];
  defaultSupportedTokens: Map<number, SupportedToken[]>;
  supportedNetworkIds: number[];
  defaultExitCheckInterval: number;
  maxDepositCheckCallbackCount: number;
  erc20ABIByNetworkId: Map<number, object>;
};

export type CheckStatusRequest = {
  tokenAddress: string;
  amount: string;
  fromChainId: number;
  toChainId: number;
  userAddress: string;
};

export type CheckStatusResponse = {
  code: number;
  message: string;
};

export type SupportedToken = {
  tokenSymbol: string;
  decimal: number;
  address: string;
};

export type Options = {
  defaultAccount?: string;
  debug?: boolean;
  environment?: keyof typeof config.hyphenBaseUrl;
  signatureType?: string;
  infiniteApproval?: boolean;
  exitCheckInterval?: number; // Interval in milli seconds to check for exit status
  onFundsTransfered?: (data: ExitResponse) => void;
  biconomy?: BiconomyOption;
  walletProvider?: object;
};

export type InternalBiconomyOption = {
  apiKey: string;
  debug: boolean;
  walletProvider?: object;
};

export type BiconomyOption = {
  enable: boolean;
  apiKey: string;
  debug: boolean;
};

export type FetchOption = {
  body?: string;
  method: string;
  headers: any;
};

export type ExitRequest = {
  sender: string;
  receiver: string;
  tokenAddress: string;
  amount: string;
  fromChainId?: number;
  toChainId?: number;
};

export type CheckDepositStatusRequest = {
  depositHash: string;
  fromChainId: number;
};

export type ExitResponse = {
  code: number;
  message: string;
  statusCode: number;
  fromChainId: number;
  toChainId: number;
  amount: string;
  tokenAddress: string;
  depositHash: string;
  exitHash: string;
};

export type DepositRequest = {
  sender: string;
  receiver: string;
  tokenAddress: string;
  depositContractAddress: string;
  amount: string;
  fromChainId: number;
  toChainId: number;
  useBiconomy: boolean;
};

export type ERC20ApproveRequest = {
  contract: Contract;
  abi: ethers.ContractInterface;
  domainType: object;
  metaTransactionType: object;
  userAddress: string;
  spender: string;
  amount: string;
  name: string;
  version: string;
  address: string;
  salt: string;
};

export type ManualExitResponse = {
  code: number;
  message: string;
  exitHash: string;
};

export type TransactionResponse = {
  hash: string;
  wait: (confirmations?: number) => ethers.providers.TransactionReceipt;
};

export type Transaction = {
  from: string;
  data?: string;
  to: string;
  signatureType?: string;
  value: string;
};

export type PoolInformationResponse = {
  code: number;
  message: string;
  minDepositAmount: string;
  maxDepositAmount: string;
  availableLiquidity: string;
  fromLPManagerAddress: string;
  toLPManagerAddress: string;
};
