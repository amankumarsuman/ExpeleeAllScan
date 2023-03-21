async function getTransactionDetails(transactionHash, network) {
  let baseUrl, apiKey;

  switch (network) {
    case "ethereum":
      baseUrl = {
        ethereum: "https://api.etherscan.io/api",
      };
      apiKey = {
        ethereum: "N98ZV19DWMZZ2HPA5J4NS7BVK1GRQ1QGSR",
      };
      break;
    case "arbitrum":
      baseUrl = {
        arbitrum: "https://api.arbiscan.io/api",
      };
      apiKey = {
        arbitrum: "C2IEDITCYBW6YPG5CX32P8MGE8UKU48PVA",
      };
      break;
    case "bsc":
      baseUrl = {
        bsc: "https://api.bscscan.com/api",
      };
      apiKey = {
        bsc: "X9U59HU5Y5K5SHFN7WSNM6KIMJCYJMCAXP",
      };
      break;

    case "polygon":
      baseUrl = {
        polygon: "https://api.polygonscan.com/api",
      };
      apiKey = {
        polygon: "M22ZP6XJAGIRZ42RFS4UVHM5UYB2C7JME6",
      };
      break;

    default:
      throw new Error("Unsupported network");
  }

  if (!baseUrl[network] || !apiKey[network]) {
    throw new Error("Unsupported network");
  }

  const url = `${baseUrl[network]}?module=proxy&action=eth_getTransactionByHash&txhash=${transactionHash}&apikey=${apiKey[network]}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to fetch transaction details");
  }

  const data = await response.json();

  if (data.status === "0") {
    throw new Error("Transaction failed");
  }

  return data.result;
}

function formatTransactionDetails(transactionDetails) {
  const formattedDetails = {};

  // Convert block number to human-readable format
  formattedDetails.blockNumber = parseInt(transactionDetails.blockNumber, 16);

  // Convert gas price to human-readable format
  const gasPriceWei = parseInt(transactionDetails.gasPrice, 16);
  formattedDetails.gasPriceGwei = gasPriceWei / 1e9;

  // Convert gas used to human-readable format
  const gasUsedWei = parseInt(transactionDetails.gas, 16);
  // formattedDetails.gasUsed = gasUsedWei.toString();
  formattedDetails.gasUsedWei = gasUsedWei / 1e9;

  // Convert value to human-readable format
  const valueWei = parseInt(transactionDetails.value, 16);
  formattedDetails.valueEth = valueWei / 1e18;

  // Add other details to formatted object
  formattedDetails.from = transactionDetails.from;
  formattedDetails.to = transactionDetails.to;
  formattedDetails.hash = transactionDetails.hash;
  formattedDetails["blockHash"] = transactionDetails.blockHash;
  formattedDetails["Data"] = transactionDetails.input;

  return formattedDetails;
}

async function getContractOrTokenDetails(address, network) {
  let baseUrl, apiKey;

  switch (network) {
    case "ethereum":
      baseUrl = {
        ethereum: "https://api.etherscan.io/api",
      };
      apiKey = {
        ethereum: "N98ZV19DWMZZ2HPA5J4NS7BVK1GRQ1QGSR",
      };
      break;
    case "bsc":
      baseUrl = {
        bsc: "https://api.bscscan.com/api",
      };
      apiKey = {
        bsc: "X9U59HU5Y5K5SHFN7WSNM6KIMJCYJMCAXP",
      };
      break;
    default:
      throw new Error("Unsupported network");
  }

  if (!baseUrl[network] || !apiKey[network]) {
    throw new Error("Unsupported network");
  }

  const url = `${baseUrl[network]}?module=contract&action=getabi&address=${address}&apikey=${apiKey[network]}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to fetch contract or token details");
  }

  const data = await response.json();

  if (data.status === "0") {
    throw new Error("Invalid address or network");
  }

  const contractAbi = JSON.parse(data.result);

  const tokenUrl = `${baseUrl[network]}?module=token&action=tokeninfo&contractaddress=${address}&apikey=${apiKey[network]}`;
  const tokenResponse = await fetch(tokenUrl);

  if (!tokenResponse.ok) {
    throw new Error("Unable to fetch token details");
  }

  const tokenData = await tokenResponse.json();

  if (tokenData.status === "0") {
    throw new Error("Invalid address or network");
  }

  const tokenDetails = {
    name: tokenData.result.name,
    symbol: tokenData.result.symbol,
    totalSupply: tokenData.result.totalSupply,
    decimals: tokenData.result.decimals,
  };

  return { contractAbi, tokenDetails };
}

// async function getWalletData(network, walletAddress,) {
//     let apiUrl;
//     switch (network.toLowerCase()) {
//       case 'ethereum':
//         apiUrl = `https://api.etherscan.io/api?module=account&action=balance&address=${walletAddress}&apikey=${"N98ZV19DWMZZ2HPA5J4NS7BVK1GRQ1QGSR"}`;
//         break;
//       case 'polygon':
//         apiUrl = `https://api.polygonscan.com/api?module=account&action=balance&address=${walletAddress}&apikey=${"M22ZP6XJAGIRZ42RFS4UVHM5UYB2C7JME6"}`;
//         break;
//       case 'arbitrum':
//         apiUrl = `https://api.arbiscan.io/api?module=account&action=balance&address=${walletAddress}&apikey=${"C2IEDITCYBW6YPG5CX32P8MGE8UKU48PVA"}`;
//         break;
//       default:
//         return `${network} is not a supported network`;
//     }
//     const response = await fetch(apiUrl);
//     const data = await response.json();
//     return data.result;
//   }

async function getWalletData(network, walletAddress) {
  let apiUrl;
  let symbol;
  let decimals;
  switch (network.toLowerCase()) {
    case "ethereum":
      apiUrl = `https://api.etherscan.io/api?module=account&action=balance&address=${walletAddress}&apikey=${"N98ZV19DWMZZ2HPA5J4NS7BVK1GRQ1QGSR"}`;
      symbol = "ETH";
      decimals = 18;
      break;
    case "polygon":
      apiUrl = `https://api.polygonscan.com/api?module=account&action=balance&address=${walletAddress}&apikey=${"M22ZP6XJAGIRZ42RFS4UVHM5UYB2C7JME6"}`;
      symbol = "MATIC";
      decimals = 18;
      break;
    case "arbitrum":
      apiUrl = `https://api.arbiscan.io/api?module=account&action=balance&address=${walletAddress}&apikey=${"C2IEDITCYBW6YPG5CX32P8MGE8UKU48PVA"}`;
      symbol = "ARB";
      decimals = 18;
      break;
    default:
      return `${network} is not a supported network`;
  }
  const balanceResponse = await fetch(apiUrl);
  const balanceData = await balanceResponse.json();
  const balance = formatAmount(balanceData.result, decimals, symbol);

  const txApiUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&apikey=${"N98ZV19DWMZZ2HPA5J4NS7BVK1GRQ1QGSR"}`;
  const txResponse = await fetch(txApiUrl);
  const txData = await txResponse.json();
  const transactions = txData.result;

  const tokenApiUrl = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D&address=${walletAddress}&apikey=${"N98ZV19DWMZZ2HPA5J4NS7BVK1GRQ1QGSR"}`;
  const tokenResponse = await fetch(tokenApiUrl);
  const tokenData = await tokenResponse.json();
  const tokenBalance = formatAmount(tokenData.result, decimals, symbol);

  const polygonTxApiUrl = `https://api.polygonscan.com/api?module=account&action=txlist&address=${walletAddress}&apikey=${"M22ZP6XJAGIRZ42RFS4UVHM5UYB2C7JME6"}`;
  const txResponseOfPolygon = await fetch(polygonTxApiUrl);
  const txDataOfPolygon = await txResponseOfPolygon.json();
  const transactionsOfPolygon = txDataOfPolygon.result;

  const polygonTokenApiUrl = `https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0&address=${walletAddress}&apikey=${"M22ZP6XJAGIRZ42RFS4UVHM5UYB2C7JME6"}`;
  const tokenResponseOfPolygon = await fetch(polygonTokenApiUrl);
  const tokenDataOfPolygon = await tokenResponseOfPolygon.json();
  const tokenBalanceOfPolygon = formatAmount(
    tokenDataOfPolygon.result,
    decimals,
    symbol
  );

  return [
    balance,
    transactions,
    tokenBalance,
    transactionsOfPolygon,
    tokenBalanceOfPolygon,
  ];
}

//   function formatAmount(amount, decimals, symbol) {
//     const amountString = new BigNumber(amount).dividedBy(new BigNumber(10).pow(decimals)).toString();
//     return `${amountString} ${symbol}`;
//   }

// function formatAmount(amount, decimals, symbol) {
//     const amountInWei = BigInt(amount);
//     const amountInToken = amountInWei / BigInt(10 ** decimals);
//     const amountString = amountInToken.toString();
//     return `${amountString} ${symbol}`;
//   }
function formatAmount(amount, decimals, symbol, decimalPlaces = 2) {
  const amountInToken = amount / 10 ** decimals;
  const amountString = amountInToken.toFixed(decimalPlaces);
  return `${amountString} ${symbol}`;
}

export {
  getTransactionDetails,
  formatTransactionDetails,
  getContractOrTokenDetails,
  getWalletData,
};
