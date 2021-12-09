import { Config, SupportedToken } from "./types";
const LIQUIDITY_POOL_MANAGER_ABI = [{ "inputs": [{ "internalType": "address", "name": "_executorManagerAddress", "type": "address" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "_trustedForwarder", "type": "address" }, { "internalType": "uint256", "name": "_adminFee", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "asset", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "target", "type": "address" }], "name": "AssetSent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "tokenAddress", "type": "address" }, { "indexed": true, "internalType": "address", "name": "receiver", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "toChainId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "", "type": "uint256" }, { "indexed": true, "internalType": "uint256", "name": "", "type": "uint256" }], "name": "GasUsed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "tokenAddress", "type": "address" }, { "indexed": true, "internalType": "address", "name": "receiver", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "LiquidityAdded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "tokenAddress", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "LiquidityRemoved", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Paused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousPauser", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newPauser", "type": "address" }], "name": "PauserChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Received", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Unpaused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "tokenAddress", "type": "address" }, { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "fundsWithdraw", "type": "event" }, { "inputs": [], "name": "addNativeLiquidity", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }, { "internalType": "uint256", "name": "minCapLimit", "type": "uint256" }, { "internalType": "uint256", "name": "maxCapLimit", "type": "uint256" }], "name": "addSupportedToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "addTokenLiquidity", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "adminFee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseGas", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "newAdminFee", "type": "uint256" }], "name": "changeAdminFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newPauser", "type": "address" }], "name": "changePauser", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "addresspayable", "name": "receiver", "type": "address" }, { "internalType": "bytes", "name": "depositHash", "type": "bytes" }], "name": "checkHashStatus", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }, { "internalType": "address", "name": "receiver", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "toChainId", "type": "uint256" }], "name": "depositErc20", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "receiver", "type": "address" }, { "internalType": "uint256", "name": "toChainId", "type": "uint256" }], "name": "depositNative", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "getAdminFee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getExecutorManager", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isOwner", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isPaused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isPauser", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "forwarder", "type": "address" }], "name": "isTrustedForwarder", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "liquidityProvider", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "pause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "pauser", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "processedHash", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "removeNativeLiquidity", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }], "name": "removeSupportedToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "removeTokenLiquidity", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renouncePauser", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "addresspayable", "name": "receiver", "type": "address" }, { "internalType": "bytes", "name": "depositHash", "type": "bytes" }, { "internalType": "uint256", "name": "tokenGasPrice", "type": "uint256" }], "name": "sendFundsToUser", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }, { "internalType": "uint256", "name": "gasOverhead", "type": "uint256" }], "name": "setTokenTransferOverhead", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "forwarderAddress", "type": "address" }], "name": "setTrustedForwarder", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "supportedToken", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "tokenLiquidity", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "tokenMaxCap", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "tokenMinCap", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "tokenTransferOverhead", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "trustedForwarder", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "unpause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }, { "internalType": "uint256", "name": "minCapLimit", "type": "uint256" }, { "internalType": "uint256", "name": "maxCapLimit", "type": "uint256" }], "name": "updateTokenCap", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "versionRecipient", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }], "name": "withdrawErc20", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdrawNative", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }];
const ERC20_ABI = [{ "inputs": [{ "internalType": "string", "name": "name_", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }];
const EIP2612_ABI = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "authorizer", "type": "address" }, { "indexed": true, "internalType": "bytes32", "name": "nonce", "type": "bytes32" }], "name": "AuthorizationCanceled", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "authorizer", "type": "address" }, { "indexed": true, "internalType": "bytes32", "name": "nonce", "type": "bytes32" }], "name": "AuthorizationUsed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "account", "type": "address" }], "name": "Blacklisted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "userAddress", "type": "address" }, { "indexed": false, "internalType": "address payable", "name": "relayerAddress", "type": "address" }, { "indexed": false, "internalType": "bytes", "name": "functionSignature", "type": "bytes" }], "name": "MetaTransactionExecuted", "type": "event" }, { "anonymous": false, "inputs": [], "name": "Pause", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "newRescuer", "type": "address" }], "name": "RescuerChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "previousAdminRole", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "newAdminRole", "type": "bytes32" }], "name": "RoleAdminChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleGranted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleRevoked", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "account", "type": "address" }], "name": "UnBlacklisted", "type": "event" }, { "anonymous": false, "inputs": [], "name": "Unpause", "type": "event" }, { "inputs": [], "name": "APPROVE_WITH_AUTHORIZATION_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "BLACKLISTER_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "CANCEL_AUTHORIZATION_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "DECREASE_ALLOWANCE_WITH_AUTHORIZATION_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "DEFAULT_ADMIN_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "DEPOSITOR_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "DOMAIN_SEPARATOR", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "EIP712_VERSION", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "INCREASE_ALLOWANCE_WITH_AUTHORIZATION_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "META_TRANSACTION_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "PAUSER_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "PERMIT_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "RESCUER_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "TRANSFER_WITH_AUTHORIZATION_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "WITHDRAW_WITH_AUTHORIZATION_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "validAfter", "type": "uint256" }, { "internalType": "uint256", "name": "validBefore", "type": "uint256" }, { "internalType": "bytes32", "name": "nonce", "type": "bytes32" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "approveWithAuthorization", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "authorizer", "type": "address" }, { "internalType": "bytes32", "name": "nonce", "type": "bytes32" }], "name": "authorizationState", "outputs": [{ "internalType": "enum GasAbstraction.AuthorizationState", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "blacklist", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "blacklisters", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "authorizer", "type": "address" }, { "internalType": "bytes32", "name": "nonce", "type": "bytes32" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "cancelAuthorization", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "decrement", "type": "uint256" }, { "internalType": "uint256", "name": "validAfter", "type": "uint256" }, { "internalType": "uint256", "name": "validBefore", "type": "uint256" }, { "internalType": "bytes32", "name": "nonce", "type": "bytes32" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "decreaseAllowanceWithAuthorization", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "bytes", "name": "depositData", "type": "bytes" }], "name": "deposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "userAddress", "type": "address" }, { "internalType": "bytes", "name": "functionSignature", "type": "bytes" }, { "internalType": "bytes32", "name": "sigR", "type": "bytes32" }, { "internalType": "bytes32", "name": "sigS", "type": "bytes32" }, { "internalType": "uint8", "name": "sigV", "type": "uint8" }], "name": "executeMetaTransaction", "outputs": [{ "internalType": "bytes", "name": "", "type": "bytes" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }], "name": "getRoleAdmin", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "getRoleMember", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }], "name": "getRoleMemberCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "grantRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "hasRole", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "increment", "type": "uint256" }, { "internalType": "uint256", "name": "validAfter", "type": "uint256" }, { "internalType": "uint256", "name": "validBefore", "type": "uint256" }, { "internalType": "bytes32", "name": "nonce", "type": "bytes32" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "increaseAllowanceWithAuthorization", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "newName", "type": "string" }, { "internalType": "string", "name": "newSymbol", "type": "string" }, { "internalType": "uint8", "name": "newDecimals", "type": "uint8" }, { "internalType": "address", "name": "childChainManager", "type": "address" }], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "initialized", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "isBlacklisted", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "nonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "pause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "paused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "pausers", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "permit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "renounceRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "contract IERC20", "name": "tokenContract", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "rescueERC20", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "rescuers", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "revokeRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "validAfter", "type": "uint256" }, { "internalType": "uint256", "name": "validBefore", "type": "uint256" }, { "internalType": "bytes32", "name": "nonce", "type": "bytes32" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "transferWithAuthorization", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "unBlacklist", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "unpause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "newName", "type": "string" }, { "internalType": "string", "name": "newSymbol", "type": "string" }], "name": "updateMetadata", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "validAfter", "type": "uint256" }, { "internalType": "uint256", "name": "validBefore", "type": "uint256" }, { "internalType": "bytes32", "name": "nonce", "type": "bytes32" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "withdrawWithAuthorization", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
const CUSTOM_META_TXN_ENABLED_ERC20_ABI = [{ "type": "constructor", "stateMutability": "nonpayable", "inputs": [] }, { "type": "event", "name": "Approval", "inputs": [{ "type": "address", "name": "owner", "internalType": "address", "indexed": true }, { "type": "address", "name": "spender", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "value", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "MetaTransactionExecuted", "inputs": [{ "type": "address", "name": "userAddress", "internalType": "address", "indexed": false }, { "type": "address", "name": "relayerAddress", "internalType": "address payable", "indexed": false }, { "type": "bytes", "name": "functionSignature", "internalType": "bytes", "indexed": false }], "anonymous": false }, { "type": "event", "name": "RoleAdminChanged", "inputs": [{ "type": "bytes32", "name": "role", "internalType": "bytes32", "indexed": true }, { "type": "bytes32", "name": "previousAdminRole", "internalType": "bytes32", "indexed": true }, { "type": "bytes32", "name": "newAdminRole", "internalType": "bytes32", "indexed": true }], "anonymous": false }, { "type": "event", "name": "RoleGranted", "inputs": [{ "type": "bytes32", "name": "role", "internalType": "bytes32", "indexed": true }, { "type": "address", "name": "account", "internalType": "address", "indexed": true }, { "type": "address", "name": "sender", "internalType": "address", "indexed": true }], "anonymous": false }, { "type": "event", "name": "RoleRevoked", "inputs": [{ "type": "bytes32", "name": "role", "internalType": "bytes32", "indexed": true }, { "type": "address", "name": "account", "internalType": "address", "indexed": true }, { "type": "address", "name": "sender", "internalType": "address", "indexed": true }], "anonymous": false }, { "type": "event", "name": "Transfer", "inputs": [{ "type": "address", "name": "from", "internalType": "address", "indexed": true }, { "type": "address", "name": "to", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "value", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "CHILD_CHAIN_ID", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "bytes", "name": "", "internalType": "bytes" }], "name": "CHILD_CHAIN_ID_BYTES", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "bytes32", "name": "", "internalType": "bytes32" }], "name": "DEFAULT_ADMIN_ROLE", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "bytes32", "name": "", "internalType": "bytes32" }], "name": "DEPOSITOR_ROLE", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "ERC712_VERSION", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "ROOT_CHAIN_ID", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "bytes", "name": "", "internalType": "bytes" }], "name": "ROOT_CHAIN_ID_BYTES", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "allowance", "inputs": [{ "type": "address", "name": "owner", "internalType": "address" }, { "type": "address", "name": "spender", "internalType": "address" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "approve", "inputs": [{ "type": "address", "name": "spender", "internalType": "address" }, { "type": "uint256", "name": "amount", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "balanceOf", "inputs": [{ "type": "address", "name": "account", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint8", "name": "", "internalType": "uint8" }], "name": "decimals", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "decreaseAllowance", "inputs": [{ "type": "address", "name": "spender", "internalType": "address" }, { "type": "uint256", "name": "subtractedValue", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "deposit", "inputs": [{ "type": "address", "name": "user", "internalType": "address" }, { "type": "bytes", "name": "depositData", "internalType": "bytes" }] }, { "type": "function", "stateMutability": "payable", "outputs": [{ "type": "bytes", "name": "", "internalType": "bytes" }], "name": "executeMetaTransaction", "inputs": [{ "type": "address", "name": "userAddress", "internalType": "address" }, { "type": "bytes", "name": "functionSignature", "internalType": "bytes" }, { "type": "bytes32", "name": "sigR", "internalType": "bytes32" }, { "type": "bytes32", "name": "sigS", "internalType": "bytes32" }, { "type": "uint8", "name": "sigV", "internalType": "uint8" }] }, { "type": "function", "stateMutability": "pure", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "getChainId", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "bytes32", "name": "", "internalType": "bytes32" }], "name": "getDomainSeperator", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "nonce", "internalType": "uint256" }], "name": "getNonce", "inputs": [{ "type": "address", "name": "user", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "bytes32", "name": "", "internalType": "bytes32" }], "name": "getRoleAdmin", "inputs": [{ "type": "bytes32", "name": "role", "internalType": "bytes32" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "getRoleMember", "inputs": [{ "type": "bytes32", "name": "role", "internalType": "bytes32" }, { "type": "uint256", "name": "index", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "getRoleMemberCount", "inputs": [{ "type": "bytes32", "name": "role", "internalType": "bytes32" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "grantRole", "inputs": [{ "type": "bytes32", "name": "role", "internalType": "bytes32" }, { "type": "address", "name": "account", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "hasRole", "inputs": [{ "type": "bytes32", "name": "role", "internalType": "bytes32" }, { "type": "address", "name": "account", "internalType": "address" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "increaseAllowance", "inputs": [{ "type": "address", "name": "spender", "internalType": "address" }, { "type": "uint256", "name": "addedValue", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "initialize", "inputs": [{ "type": "string", "name": "name_", "internalType": "string" }, { "type": "string", "name": "symbol_", "internalType": "string" }, { "type": "uint8", "name": "decimals_", "internalType": "uint8" }, { "type": "address", "name": "childChainManager", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "name", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "renounceRole", "inputs": [{ "type": "bytes32", "name": "role", "internalType": "bytes32" }, { "type": "address", "name": "account", "internalType": "address" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "revokeRole", "inputs": [{ "type": "bytes32", "name": "role", "internalType": "bytes32" }, { "type": "address", "name": "account", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "symbol", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "totalSupply", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "transfer", "inputs": [{ "type": "address", "name": "recipient", "internalType": "address" }, { "type": "uint256", "name": "amount", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "transferFrom", "inputs": [{ "type": "address", "name": "sender", "internalType": "address" }, { "type": "address", "name": "recipient", "internalType": "address" }, { "type": "uint256", "name": "amount", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "withdraw", "inputs": [{ "type": "uint256", "name": "amount", "internalType": "uint256" }] }];
const ERC20_META_TXN_DOMAIN_TYPE = [{ name: "name", type: "string" }, { name: "version", type: "string" }, { name: "verifyingContract", type: "address" }, { name: "salt", type: "bytes32" }];
const CUSTOM_META_TXN_TYPE = [{ name: "nonce", type: "uint256" }, { name: "from", type: "address" }, { name: "functionSignature", type: "bytes" }];

const NATIVE_ADDRESS = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

const tokensMap = {
	"USDT": {
		80001: {
			address: "0xeabc4b91d9375796aa4f69cc764a4ab509080a58",
			transferOverhead: 86147,
			decimal: 18,
			symbol: "USDT"
		},
		5: {
			address: "0x64ef393b6846114bad71e2cb2ccc3e10736b5716",
			transferOverhead: 86147,
			decimal: 18,
			symbol: "USDT"
		},
		4: {
			address: "0xfab46e002bbf0b4509813474841e0716e6730136",
			transferOverhead: 86147,
			decimal: 18,
			symbol: "USDT"
		},
		43113: {
			address: "0xb4e0f6fef81bdfea0856bb846789985c9cff7e85",
			transferOverhead: 86147,
			decimal: 18,
			symbol: "USDT"
		},
		43114: {
			address: "0xc7198437980c041c805a1edcba50c1ce5db95118",
			transferOverhead: 86147,
			decimal: 6,
			symbol: "USDT"
		},
		137: {
			address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
			transferOverhead: 86147,
			decimal: 6,
			symbol: "USDT"
		},
		1: {
			address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
			transferOverhead: 86147,
			decimal: 6,
			symbol: "USDT"
		}
	},
	"USDC": {
		80001: {
			address: "0xda5289fcaaf71d52a80a254da614a192b693e977",
			transferOverhead: 86099,
			decimal: 6,
			symbol: "USDC",
			permitSupported: true
		},
		5: {
			address: "0xb5b640e6414b6def4fc9b3c1eef373925effeccf",
			transferOverhead: 86099,
			decimal: 6,
			symbol: "USDC",
			name: "USDC",
			version: "1",
			permitSupported: true
		},
		137: {
			address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
			transferOverhead: 86099,
			decimal: 6,
			symbol: "USDC",
			name: "USD Coin (PoS)",
			permitSupported: true
		},
		1: {
			address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
			transferOverhead: 86099,
			decimal: 6,
			symbol: "USDC",
			name: "USD Coin",
			version: "2",
			permitSupported: true
		},
		43114: {
			address: "0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664",
			transferOverhead: 86099,
			decimal: 6,
			symbol: "USDC",
			name: "USD Coin",
			version: "2",
			permitSupported: false
		}
	},
	"DAI": {
		80001: {
			address: "0x27a44456bedb94dbd59d0f0a14fe977c777fc5c3",
			transferOverhead: 86147,
			decimal: 18,
			symbol: "DAI"
		},
		5: {
			address: "0x2686eca13186766760a0347ee8eeb5a88710e11b",
			transferOverhead: 96061,
			decimal: 18,
			symbol: "DAI"
		},
		137: {
			address: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
			transferOverhead: 96061,
			decimal: 18,
			symbol: "DAI"
		},
		1: {
			address: "0x6b175474e89094c44da98b954eedeac495271d0f",
			transferOverhead: 96061,
			decimal: 18,
			symbol: "DAI"
		}
	},
	"ETH": {
		80001: {
			address: "0xa6fa4fb5f76172d178d61b04b0ecd319c5d1c0aa",
			transferOverhead: 29766,
			decimal: 18,
			symbol: "ETH"
		},
		5: {
			address: NATIVE_ADDRESS,
			transferOverhead: 29766,
			decimal: 18,
			symbol: "ETH"
		},
		137: {
			address: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
			transferOverhead: 29766,
			decimal: 18,
			symbol: "ETH"
		},
		1: {
			address: NATIVE_ADDRESS,
			transferOverhead: 29766,
			decimal: 18,
			symbol: "ETH"
		},
		4: {
			address: NATIVE_ADDRESS,
			transferOverhead: 29766,
			decimal: 18,
			symbol: "ETH"
		},
		43113: {
			address: "0x7fcdc2c1ef3e4a0bcc8155a558bb20a7218f2b05",
			transferOverhead: 29766,
			decimal: 18,
			symbol: "ETH"
		},
		43114: {
			address: "0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab",
			transferOverhead: 29766,
			decimal: 18,
			symbol: "ETH"
		}
	}
};

const tokenAddressMap = {
	"0x64ef393b6846114bad71e2cb2ccc3e10736b5716": { 5: tokensMap.USDT[5] },
	"0xeabc4b91d9375796aa4f69cc764a4ab509080a58": { 80001: tokensMap.USDT[80001] },
	"0xdac17f958d2ee523a2206206994597c13d831ec7": { 1: tokensMap.USDT[1] },
	"0xc2132d05d31c914a87c6611c10748aeb04b58e8f": { 137: tokensMap.USDT[137] },
	"0xfab46e002bbf0b4509813474841e0716e6730136": { 4: tokensMap.USDT[4] },
	"0xb4e0f6fef81bdfea0856bb846789985c9cff7e85": { 43113: tokensMap.USDT[43113] },
	"0xc7198437980c041c805a1edcba50c1ce5db95118": { 43114: tokensMap.USDT[43114] },

	"0xb5b640e6414b6def4fc9b3c1eef373925effeccf": { 5: tokensMap.USDC[5] },
	"0xda5289fcaaf71d52a80a254da614a192b693e977": { 80001: tokensMap.USDC[80001] },
	"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": { 1: tokensMap.USDC[1] },
	"0x2791bca1f2de4661ed88a30c99a7a9449aa84174": { 137: tokensMap.USDC[137] },
	"0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664": { 43114: tokensMap.USDC[43114] },

	"0x2686eca13186766760a0347ee8eeb5a88710e11b": { 5: tokensMap.DAI[5] },
	"0x27a44456bEDb94DbD59D0f0A14fE977c777fC5C3": { 80001: tokensMap.DAI[80001] },
	"0x6b175474e89094c44da98b954eedeac495271d0f": { 1: tokensMap.DAI[1] },
	"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063": { 137: tokensMap.DAI[137] },
}

const defaultSupportedTokens: Map<number, SupportedToken[]> = new Map();
const erc20ABIByNetworkId: Map<number, object> = new Map();
erc20ABIByNetworkId.set(5, ERC20_ABI);
erc20ABIByNetworkId.set(4, ERC20_ABI);
erc20ABIByNetworkId.set(43113, ERC20_ABI);
erc20ABIByNetworkId.set(43114, ERC20_ABI);
erc20ABIByNetworkId.set(1, ERC20_ABI);
erc20ABIByNetworkId.set(80001, CUSTOM_META_TXN_ENABLED_ERC20_ABI);
erc20ABIByNetworkId.set(137, CUSTOM_META_TXN_ENABLED_ERC20_ABI);

const erc20ABIByToken: Map<string, object> = new Map();
erc20ABIByToken.set(tokensMap.USDC[5].address, EIP2612_ABI);
erc20ABIByToken.set(tokensMap.USDC[1].address, EIP2612_ABI);
erc20ABIByToken.set(tokensMap.USDC[137].address, EIP2612_ABI);
erc20ABIByToken.set(tokensMap.USDC[43114].address, EIP2612_ABI);

// Set Mumbai Network Default Supported Tokens
defaultSupportedTokens.set(80001,
	[
	{
		"tokenSymbol": "USDT",
		"decimal": 18,
		"address": "0xeabc4b91d9375796aa4f69cc764a4ab509080a58"
	},
	{
		"tokenSymbol": "USDC",
		"decimal": 6,
		"address": "0xda5289fcaaf71d52a80a254da614a192b693e977"
	},
	{
		"tokenSymbol": "DAI",
		"decimal": 18,
		"address": "0x27a44456bedb94dbd59d0f0a14fe977c777fc5c3"
	}
]);

defaultSupportedTokens.set(4, [
	{
		"tokenSymbol": "USDT",
		"decimal": 18,
		"address": "0xfab46e002bbf0b4509813474841e0716e6730136"
	},
]);

defaultSupportedTokens.set(43113, [
	{
		"tokenSymbol": "USDT",
		"decimal": 18,
		"address": "0xb4e0f6fef81bdfea0856bb846789985c9cff7e85"
	},
]);

defaultSupportedTokens.set(43114, [
	{
		"tokenSymbol": "USDT",
		"decimal": 6,
		"address": "0xc7198437980c041c805a1edcba50c1ce5db95118"
	},
	{
		"tokenSymbol": "USDC",
		"decimal": 6,
		"address": "0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664"
	},
	{
		"tokenSymbol": "ETH",
		"decimal": 6,
		"address": "0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab"
	},
]);

// Set Polygon Network Default Supported Tokens
defaultSupportedTokens.set(137, [
	{
		"tokenSymbol": "USDT",
		"decimal": 6,
		"address": "0xc2132d05d31c914a87c6611c10748aeb04b58e8f"
	},
	{
		"tokenSymbol": "USDC",
		"decimal": 6,
		"address": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174"
	},
	{
		"tokenSymbol": "DAI",
		"decimal": 18,
		"address": "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063"
	}
]);

// Set Goerli Network Default Supported Tokens
defaultSupportedTokens.set(
	5, [
	{
		"tokenSymbol": "USDT",
		"decimal": 18,
		"address": "0x64ef393b6846114bad71e2cb2ccc3e10736b5716"
	},
	{
		"tokenSymbol": "USDC",
		"decimal": 6,
		"address": "0xb5b640e6414b6def4fc9b3c1eef373925effeccf"
	},
	{
		"tokenSymbol": "DAI",
		"decimal": 18,
		"address": "0x2686eca13186766760a0347ee8eeb5a88710e11b"
	}
]);

// Set Ethereum Network Default Supported Tokens
defaultSupportedTokens.set(
	1, [
	{
		"tokenSymbol": "USDT",
		"decimal": 6,
		"address": "0xdac17f958d2ee523a2206206994597c13d831ec7"
	},
	{
		"tokenSymbol": "USDC",
		"decimal": 6,
		"address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
	},
	{
		"tokenSymbol": "DAI",
		"decimal": 18,
		"address": "0x6b175474e89094c44da98b954eedeac495271d0f"
	}
]);


const config = {
	hyphenBaseUrl: {
		"test": "https://hyphen-test-api.biconomy.io",
		"staging": "https://hyphen-staging-api.biconomy.io",
		"prod": "https://hyphen-api.biconomy.io"
	},
	initiateExitPath: "/api/v1/insta-exit/initiate-exit",
	getSupportedTokensPath: "/api/v1/admin/supported-token/list",
	checkRequestStatusPath: "/api/v1/insta-exit/system-status",
	getPoolInfoPath: "/api/v1/insta-exit/get-pool-info",
	getManualTransferPath: "/api/v1/insta-exit/execute",
	checkTransferStatusPath: "/api/v1/insta-exit/check-status",
	liquidityPoolManagerABI: LIQUIDITY_POOL_MANAGER_ABI,
	erc20TokenABI: ERC20_ABI,
	erc20ABIByNetworkId,
	erc20ABIByToken,

	customMetaTxnSupportedNetworksForERC20Tokens: {
		80001: [tokensMap.USDC[80001].address, tokensMap.USDT[80001].address, tokensMap.DAI[80001].address, tokensMap.ETH[80001].address],
		137: [tokensMap.USDC[137].address, tokensMap.USDT[137].address, tokensMap.DAI[137].address, tokensMap.ETH[137].address]
	},
	erc20MetaTxnDomainType: ERC20_META_TXN_DOMAIN_TYPE,
	customMetaTxnType: CUSTOM_META_TXN_TYPE,
	metaTxnCompatibleTokenData: {
		80001: {
			// USDT
			"0xeabc4b91d9375796aa4f69cc764a4ab509080a58": {
				name: "USDT (PoS)",
				version: "1",
				chainId: "80001"
			},
			// USDC
			"0xda5289fcaaf71d52a80a254da614a192b693e977": {
				name: "USDC (PoS)",
				version: "1",
				chainId: "80001"
			},
			// DAI
			"0x27a44456bedb94dbd59d0f0a14fe977c777fc5c3": {
				name: "Dai Stablecoin (PoS)",
				version: "1",
				chainId: "80001"
			},
			// WETH
			"0xa6fa4fb5f76172d178d61b04b0ecd319c5d1c0aa": {
				name: "Wrapped Ether",
				version: "1",
				chainId: "80001"
			}
		},
		137: {
			// USDT
			"0xc2132d05d31c914a87c6611c10748aeb04b58e8f": {
				name: "(PoS) Tether USD", // (PoS) Tether USD
				version: "1",
				chainId: "137"
			},
			// USDC
			"0x2791bca1f2de4661ed88a30c99a7a9449aa84174": {
				name: "USD Coin (PoS)", // USD Coin (PoS)
				version: "1",
				chainId: "137"
			},
			// DAI
			"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063": {
				name: "(PoS) Dai Stablecoin", // (PoS) Dai Stablecoin
				version: "1",
				chainId: "137"
			},
			// WETH
			"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619": {
				name: "Wrapped Ether", // (PoS) Dai Stablecoin
				version: "1",
				chainId: "137"
			}
		},
		43114: {
			// USDT
			"0xc7198437980c041c805a1edcba50c1ce5db95118": {
				name: "(PoS) Tether USD", // (PoS) Tether USD
				version: "1",
				chainId: "43114"
			},
			// USDC
			"0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664": {
				name: "USD Coin (PoS)", // USD Coin (PoS)
				version: "1",
				chainId: "43114"
			},
			// WETH
			"0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab": {
				name: "Wrapped Ether", // (PoS) Dai Stablecoin
				version: "1",
				chainId: "43114"
			}
		},
		1: {
			"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": {
				name: "USDC",
				version: "1",
				chainId: "1"
			}
		}
	},
	defaultSupportedTokens,
	supportedNetworkIds: [5, 80001, 1, 137, 4, 43113, 43114],
	defaultExitCheckInterval: 5000,
	maxDepositCheckCallbackCount: 720,
	tokenAddressMap,
	eip2612PermitType: [
		{ name: "owner", type: "address" },
		{ name: "spender", type: "address" },
		{ name: "value", type: "uint256" },
		{ name: "nonce", type: "uint256" },
		{ name: "deadline", type: "uint256" }
	],
	// This domain type is used in Permit Client where chainId needs to be preserved
	domainType: [
		{ name: "name", type: "string" },
		{ name: "version", type: "string" },
		{ name: "chainId", type: "uint256" },
		{ name: "verifyingContract", type: "address" }
	],
	NATIVE_ADDRESS
};


const RESPONSE_CODES = {
	ERROR_RESPONSE: 500,
	OK: 144,
	ALREADY_EXISTS: 145,
	UNSUPPORTED_TOKEN: 146,
	NO_LIQUIDITY: 148,
	UNSUPPORTED_NETWORK: 149,
	ALLOWANCE_NOT_GIVEN: 150,
	BAD_REQUEST: 400,
	SUCCESS: 200
};

const EXIT_STATUS = {
	PROCESSING: 1,
	PROCESSED: 2,
	FAILED: 3
}

const SIGNATURE_TYPES = {
	EIP712: "EIP712_SIGN",
	PERSONAL: "PERSONAL_SIGN"
}

export {
	config,
	RESPONSE_CODES,
	EXIT_STATUS,
	SIGNATURE_TYPES
}