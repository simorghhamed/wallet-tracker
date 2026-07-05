// لیست شبکه‌های پشتیبانی‌شده
export const SUPPORTED_NETWORKS = [
  "ethereum",
  "eth",
  "bitcoin",
  "btc",
  "binance-smart-chain",
  "bsc",
  "polygon",
  "matic",
  "arbitrum",
  "arb",
  "optimism",
  "op",
  "avalanche",
  "avax",
  "fantom",
  "ftm",
  "solana",
  "sol",
  "pulse",
  "pulsechain",
];

// Regex patterns برای انواع والت‌ها
export const WALLET_PATTERNS = {
  ethereum: /^0x[a-fA-F0-9]{40}$/,
  pulse: /^0x[a-fA-F0-9]{40}$/,
  bsc: /^0x[a-fA-F0-9]{40}$/,
  bitcoin: /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^bc1[a-z0-9]{39,59}$/,
  solana: /^[1-9A-HJ-NP-Za-km-z]{32,44}$/,
  // میتونی باقی شبکه‌ها رو اضافه کنی
};

// تشخیص نوع شبکه از URL parameter
export const getNetworkType = (networkParam) => {
  const network = networkParam?.toLowerCase();

  if (["ethereum", "eth"].includes(network)) return "ethereum";
  if (["bitcoin", "btc"].includes(network)) return "bitcoin";
  if (["solana", "sol"].includes(network)) return "solana";
  if (["binance-smart-chain", "bsc"].includes(network)) return "bsc"; // BSC از همون pattern ethereum استفاده می‌کنه
  if (["polygon", "matic"].includes(network)) return "ethereum";
  if (["arbitrum", "arb"].includes(network)) return "ethereum";
  if (["optimism", "op"].includes(network)) return "ethereum";
  if (["avalanche", "avax"].includes(network)) return "ethereum";
  if (["fantom", "ftm"].includes(network)) return "ethereum";
  if (["pulse", "pulsechain"].includes(network)) return "pulse";

  return null;
};

// اعتبارسنجی آدرس والت
export const validateWalletAddress = (address, networkType) => {
  if (!address || !networkType) return false;

  const pattern = WALLET_PATTERNS[networkType];
  return pattern ? pattern.test(address) : false;
};
