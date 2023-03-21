async function getNetworkFromAddress(address) {
  // Define network URLs and API keys
  const networkUrls = {
    Ethereum: "https://api.etherscan.io/api",
    BSC: "https://api.bscscan.com/api",
    Polygon: "https://api.polygonscan.com/api",
    Arbitrum: "https://api.arbiscan.io/api",
  };

  const networkApiKeys = {
    Ethereum: "N98ZV19DWMZZ2HPA5J4NS7BVK1GRQ1QGSR",
    BSC: "X9U59HU5Y5K5SHFN7WSNM6KIMJCYJMCAXP",
    Polygon: "M22ZP6XJAGIRZ42RFS4UVHM5UYB2C7JME6",
    Arbitrum: "C2IEDITCYBW6YPG5CX32P8MGE8UKU48PVA",
  };

  // Loop through network URLs and check for balance
  for (const [network, url] of Object.entries(networkUrls)) {
    const apiKey = networkApiKeys[network];
    const params = new URLSearchParams({
      module: "account",
      action: "balance",
      address: address,
      tag: "latest",
      apikey: apiKey,
    });
    const response = await fetch(`${url}?${params}`);
    if (response.status === 200) {
      return network;
    }
  }

  // Return null if address is not found on any network

  return null;
}
