import { Config, SupportedToken } from "./types";
const LIQUIDITY_POOL_MANAGER_ABI = [{ "inputs": [{ "internalType": "address", "name": "_executorManagerAddress", "type": "address" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "_trustedForwarder", "type": "address" }, { "internalType": "uint256", "name": "_adminFee", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "asset", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "target", "type": "address" }], "name": "AssetSent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "tokenAddress", "type": "address" }, { "indexed": true, "internalType": "address", "name": "receiver", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "toChainId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "", "type": "uint256" }, { "indexed": true, "internalType": "uint256", "name": "", "type": "uint256" }], "name": "GasUsed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "tokenAddress", "type": "address" }, { "indexed": true, "internalType": "address", "name": "receiver", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "LiquidityAdded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "tokenAddress", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "LiquidityRemoved", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Paused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousPauser", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newPauser", "type": "address" }], "name": "PauserChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Received", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Unpaused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "tokenAddress", "type": "address" }, { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "fundsWithdraw", "type": "event" }, { "inputs": [], "name": "addNativeLiquidity", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }, { "internalType": "uint256", "name": "minCapLimit", "type": "uint256" }, { "internalType": "uint256", "name": "maxCapLimit", "type": "uint256" }], "name": "addSupportedToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "addTokenLiquidity", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "adminFee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseGas", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "newAdminFee", "type": "uint256" }], "name": "changeAdminFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newPauser", "type": "address" }], "name": "changePauser", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "addresspayable", "name": "receiver", "type": "address" }, { "internalType": "bytes", "name": "depositHash", "type": "bytes" }], "name": "checkHashStatus", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }, { "internalType": "address", "name": "receiver", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "toChainId", "type": "uint256" }], "name": "depositErc20", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "receiver", "type": "address" }, { "internalType": "uint256", "name": "toChainId", "type": "uint256" }], "name": "depositNative", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "getAdminFee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getExecutorManager", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isOwner", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isPaused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isPauser", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "forwarder", "type": "address" }], "name": "isTrustedForwarder", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "liquidityProvider", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "pause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "pauser", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "processedHash", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "removeNativeLiquidity", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }], "name": "removeSupportedToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "removeTokenLiquidity", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renouncePauser", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "addresspayable", "name": "receiver", "type": "address" }, { "internalType": "bytes", "name": "depositHash", "type": "bytes" }, { "internalType": "uint256", "name": "tokenGasPrice", "type": "uint256" }], "name": "sendFundsToUser", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }, { "internalType": "uint256", "name": "gasOverhead", "type": "uint256" }], "name": "setTokenTransferOverhead", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "forwarderAddress", "type": "address" }], "name": "setTrustedForwarder", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "supportedToken", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "tokenLiquidity", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "tokenMaxCap", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "tokenMinCap", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "tokenTransferOverhead", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "trustedForwarder", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "unpause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }, { "internalType": "uint256", "name": "minCapLimit", "type": "uint256" }, { "internalType": "uint256", "name": "maxCapLimit", "type": "uint256" }], "name": "updateTokenCap", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "versionRecipient", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }], "name": "withdrawErc20", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdrawNative", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }];
const ERC20_ABI = [{ "inputs": [{ "internalType": "string", "name": "name_", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }];
const CUSTOM_META_TXN_ENABLED_ERC20_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[]},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"spender","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"MetaTransactionExecuted","inputs":[{"type":"address","name":"userAddress","internalType":"address","indexed":false},{"type":"address","name":"relayerAddress","internalType":"address payable","indexed":false},{"type":"bytes","name":"functionSignature","internalType":"bytes","indexed":false}],"anonymous":false},{"type":"event","name":"RoleAdminChanged","inputs":[{"type":"bytes32","name":"role","internalType":"bytes32","indexed":true},{"type":"bytes32","name":"previousAdminRole","internalType":"bytes32","indexed":true},{"type":"bytes32","name":"newAdminRole","internalType":"bytes32","indexed":true}],"anonymous":false},{"type":"event","name":"RoleGranted","inputs":[{"type":"bytes32","name":"role","internalType":"bytes32","indexed":true},{"type":"address","name":"account","internalType":"address","indexed":true},{"type":"address","name":"sender","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"RoleRevoked","inputs":[{"type":"bytes32","name":"role","internalType":"bytes32","indexed":true},{"type":"address","name":"account","internalType":"address","indexed":true},{"type":"address","name":"sender","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"CHILD_CHAIN_ID","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes","name":"","internalType":"bytes"}],"name":"CHILD_CHAIN_ID_BYTES","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"DEFAULT_ADMIN_ROLE","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"DEPOSITOR_ROLE","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"ERC712_VERSION","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"ROOT_CHAIN_ID","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes","name":"","internalType":"bytes"}],"name":"ROOT_CHAIN_ID_BYTES","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"allowance","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"spender","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"approve","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"decimals","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"decreaseAllowance","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"subtractedValue","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"address","name":"user","internalType":"address"},{"type":"bytes","name":"depositData","internalType":"bytes"}]},{"type":"function","stateMutability":"payable","outputs":[{"type":"bytes","name":"","internalType":"bytes"}],"name":"executeMetaTransaction","inputs":[{"type":"address","name":"userAddress","internalType":"address"},{"type":"bytes","name":"functionSignature","internalType":"bytes"},{"type":"bytes32","name":"sigR","internalType":"bytes32"},{"type":"bytes32","name":"sigS","internalType":"bytes32"},{"type":"uint8","name":"sigV","internalType":"uint8"}]},{"type":"function","stateMutability":"pure","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getChainId","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"getDomainSeperator","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"nonce","internalType":"uint256"}],"name":"getNonce","inputs":[{"type":"address","name":"user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"getRoleAdmin","inputs":[{"type":"bytes32","name":"role","internalType":"bytes32"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"getRoleMember","inputs":[{"type":"bytes32","name":"role","internalType":"bytes32"},{"type":"uint256","name":"index","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getRoleMemberCount","inputs":[{"type":"bytes32","name":"role","internalType":"bytes32"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"grantRole","inputs":[{"type":"bytes32","name":"role","internalType":"bytes32"},{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"hasRole","inputs":[{"type":"bytes32","name":"role","internalType":"bytes32"},{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"increaseAllowance","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"addedValue","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"initialize","inputs":[{"type":"string","name":"name_","internalType":"string"},{"type":"string","name":"symbol_","internalType":"string"},{"type":"uint8","name":"decimals_","internalType":"uint8"},{"type":"address","name":"childChainManager","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceRole","inputs":[{"type":"bytes32","name":"role","internalType":"bytes32"},{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"revokeRole","inputs":[{"type":"bytes32","name":"role","internalType":"bytes32"},{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transfer","inputs":[{"type":"address","name":"recipient","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transferFrom","inputs":[{"type":"address","name":"sender","internalType":"address"},{"type":"address","name":"recipient","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]}];
const ERC20_META_TXN_DOMAIN_TYPE = [{name: "name",type: "string"}, {name: "version",type: "string"}, {name: "verifyingContract",type: "address"}, {name: "salt",type: "bytes32"}];
const CUSTOM_META_TXN_TYPE = [{ name: "nonce", type: "uint256" },{ name: "from", type: "address" },{ name: "functionSignature", type: "bytes" }];

const defaultSupportedTokens: Map<number, SupportedToken[]> = new Map();
const erc20ABIByNetworkId: Map<number, object> = new Map();
erc20ABIByNetworkId.set(5, ERC20_ABI);
erc20ABIByNetworkId.set(1, ERC20_ABI);
erc20ABIByNetworkId.set(80001, CUSTOM_META_TXN_ENABLED_ERC20_ABI);
erc20ABIByNetworkId.set(137, CUSTOM_META_TXN_ENABLED_ERC20_ABI);

// Set Mumbai Network Default Supported Tokens
defaultSupportedTokens.set(80001, [
	{
		"tokenSymbol": "USDT",
		"decimal": 18,
		"address": "0xeaBc4b91d9375796AA4F69cC764A4aB509080A58"
	},
	{
		"tokenSymbol": "USDC",
		"decimal": 6,
		"address": "0xdA5289fCAAF71d52a80A254da614a192b693e977"
	},
	{
		"tokenSymbol": "DAI",
		"decimal": 18,
		"address": "0x27a44456bEDb94DbD59D0f0A14fE977c777fC5C3"
	}
]);

// Set Polygon Network Default Supported Tokens
defaultSupportedTokens.set(137, [
	{
		"tokenSymbol": "USDT",
		"decimal": 6,
		"address": "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"
	},
	{
		"tokenSymbol": "USDC",
		"decimal": 6,
		"address": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
	},
	{
		"tokenSymbol": "DAI",
		"decimal": 18,
		"address": "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063"
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
		"address": "0xb5B640E6414b6DeF4FC9B3C1EeF373925effeCcF"
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
    customMetaTxnSupportedNetworksForERC20Tokens : [137, 80001],
    erc20MetaTxnDomainType: ERC20_META_TXN_DOMAIN_TYPE,
    customMetaTxnType: CUSTOM_META_TXN_TYPE,
    metaTxnCompatibleTokenData: {
        80001: {
            // USDT
            "0xeabc4b91d9375796aa4f69cc764a4ab509080a58" : {
                name: "USDT (PoS)",
                version: "1",
                chainId: "80001"
            },
            // USDC
            "0xda5289fcaaf71d52a80a254da614a192b693e977" : {
                name: "USDC (PoS)",
                version: "1",
                chainId: "80001"
            },
            // DAI
            "0x27a44456bedb94dbd59d0f0a14fe977c777fc5c3" : {
                name: "Dai Stablecoin (PoS)",
                version: "1",
                chainId: "80001"
            }
		},

		137: {
            // USDT
            "0xc2132D05D31c914a87C6611C10748AEb04B58e8F" : {
                name: "USDT (PoS)", // (PoS) Tether USD
                version: "1",
                chainId: "137"
            },
            // USDC
            "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174" : {
                name: "USDC (PoS)", // USD Coin (PoS)
                version: "1",
                chainId: "137"
            },
            // DAI
            "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063" : {
                name: "Dai Stablecoin (PoS)", // (PoS) Dai Stablecoin
                version: "1",
                chainId: "137"
            }
		},

    },
    defaultSupportedTokens,
    supportedNetworkIds: [5, 80001, 1, 137],
    defaultExitCheckInterval: 5000,
    maxDepositCheckCallbackCount: 720
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

export {
	config,
	RESPONSE_CODES,
	EXIT_STATUS
}