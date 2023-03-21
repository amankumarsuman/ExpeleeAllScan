// async function getNetworkFromAddress(address) {
//   console.log(address, "address");
//   // Define network URLs and API keys
//   const networkUrls = {
//     Ethereum: "https://api.etherscan.io/api",
//     BSC: "https://api.bscscan.com/api",
//     Polygon: "https://api.polygonscan.com/api",
//     Arbitrum: "https://api.arbiscan.io/api",
//   };

//   const networkApiKeys = {
//     Ethereum: "N98ZV19DWMZZ2HPA5J4NS7BVK1GRQ1QGSR",
//     BSC: "X9U59HU5Y5K5SHFN7WSNM6KIMJCYJMCAXP",
//     Polygon: "M22ZP6XJAGIRZ42RFS4UVHM5UYB2C7JME6",
//     Arbitrum: "C2IEDITCYBW6YPG5CX32P8MGE8UKU48PVA",
//   };

//   // Loop through network URLs and check for balance
//   for (const [network, url] of Object.entries(networkUrls)) {
//     const apiKey = networkApiKeys[network];
//     const params = new URLSearchParams({
//       module: "account",
//       action: "balance",
//       address: address,
//       tag: "latest",
//       apikey: apiKey,
//     });
//     const response = await fetch(`${url}?${params}`);
//     if (response.status === 200) {
//       return network;
//     }
//   }

//   // Return null if address is not found on any network

//   return null;
// }

// async function getAllNetworkFromAddress(address) {
//   try {
//     // Ethereum Mainnet
//     let provider = ethers.getDefaultProvider("homestead");
//     let code = await provider.getCode(address);
//     if (code !== "0x") {
//       let network = await provider.getNetwork();
//       return network.name;
//     }

//     // Ethereum Testnets
//     provider = ethers.getDefaultProvider("rinkeby");
//     code = await provider.getCode(address);
//     if (code !== "0x") {
//       let network = await provider.getNetwork();
//       return network.name;
//     }

//     provider = ethers.getDefaultProvider("ropsten");
//     code = await provider.getCode(address);
//     if (code !== "0x") {
//       let network = await provider.getNetwork();
//       return network.name;
//     }

//     provider = ethers.getDefaultProvider("kovan");
//     code = await provider.getCode(address);
//     if (code !== "0x") {
//       let network = await provider.getNetwork();
//       return network.name;
//     }

//     // Binance Smart Chain Mainnet
//     provider = new ethers.providers.JsonRpcProvider(
//       "https://bsc-dataseed1.binance.org/"
//     );
//     code = await provider.getCode(address);
//     if (code !== "0x") {
//       return "Binance Smart Chain";
//     }

//     // Binance Smart Chain Testnet
//     provider = new ethers.providers.JsonRpcProvider(
//       "https://data-seed-prebsc-1-s1.binance.org:8545/"
//     );
//     code = await provider.getCode(address);
//     if (code !== "0x") {
//       return "Binance Smart Chain Testnet";
//     }

//     // Polygon Mainnet
//     provider = new ethers.providers.JsonRpcProvider(
//       "https://rpc-mainnet.maticvigil.com/"
//     );
//     code = await provider.getCode(address);
//     if (code !== "0x") {
//       return "Polygon";
//     }

//     // Polygon Testnet
//     provider = new ethers.providers.JsonRpcProvider(
//       "https://rpc-mumbai.maticvigil.com/"
//     );
//     code = await provider.getCode(address);
//     if (code !== "0x") {
//       return "Polygon Testnet";
//     }

//     // Arbitrum One
//     provider = new ethers.providers.JsonRpcProvider(
//       "https://arb1.arbitrum.io/rpc"
//     );
//     code = await provider.getCode(address);
//     if (code !== "0x") {
//       return "Arbitrum One";
//     }

//     // Arbitrum Testnet
//     provider = new ethers.providers.JsonRpcProvider(
//       "https://rinkeby.arbitrum.io/rpc"
//     );
//     code = await provider.getCode(address);
//     if (code !== "0x") {
//       return "Arbitrum Testnet";
//     }

//     // Avalanche Mainnet
//     provider = new ethers.providers.JsonRpcProvider(
//       "https://api.avax.network/ext/bc/C/rpc"
//     );
//     code = await provider.getCode(address);
//     if (code !== "0x") {
//       return "Avalanche";
//     }

//     // Avalanche Testnet
//     provider = new ethers.providers.JsonRpcProvider(
//       "https://api.avax-test.network/ext/bc/C/rpc"
//     );
//     code = await provider.getCode(address);
//     if (code !== "0x") {
//       return "Avalanche Testnet";
//     }

//     // If no network was detected
//     return null;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }

// import { getDefaultProvider, providers } from "ethers";

// async function getAllNetworkFromAddress(address) {
//   try {
//     // Ethereum Mainnet
//     let provider = getDefaultProvider("homestead");
//     let code = await provider.getCode(address);
//     if (code !== "0x") {
//       let network = await provider.getNetwork();
//       return network.name;
//     }

//     // Ethereum Testnets
//     provider = getDefaultProvider("rinkeby");
//     code = await provider.getCode(address);
//     if (code !== "0x") {
//       let network = await provider.getNetwork();
//       return network.name;
//     }

//     provider = getDefaultProvider("ropsten");
//     code = await provider.getCode(address);
//     if (code !== "0x") {
//       let network = await provider.getNetwork();
//       return network.name;
//     }

//     provider = getDefaultProvider("kovan");
//     code = await provider.getCode(address);
//     if (code !== "0x") {
//       let network = await provider.getNetwork();
//       return network.name;
//     }

//     // Binance Smart Chain Mainnet
//     provider = new providers.JsonRpcProvider(
//       "https://bsc-dataseed1.binance.org/"
//     );
//     code = await provider.getCode(address);
//     if (code !== "0x") {
//       return "Binance Smart Chain";
//     }

//     // Binance Smart Chain Testnet
//     provider = new providers.JsonRpcProvider(
//       "https://data-seed-prebsc-1-s1.binance.org:8545/"
//     );
//     code = await provider.getCode(address);
//     if (code !== "0x") {
//       return "Binance Smart Chain Testnet";
//     }

//     // Polygon Mainnet
//     provider = new providers.JsonRpcProvider(
//       "https://rpc-mainnet.maticvigil.com/"
//     );
//     code = await provider.getCode(address);
//     if (code !== "0x") {
//       return "Polygon";
//     }

//     // Polygon Testnet
//     provider = new providers.JsonRpcProvider(
//       "https://rpc-mumbai.maticvigil.com/"
//     );
//     code = await provider.getCode(address);
//     if (code !== "0x") {
//       return "Polygon Testnet";
//     }

//     // Arbitrum One
//     provider = new providers.JsonRpcProvider("https://arb1.arbitrum.io/rpc");
//     code = await provider.getCode(address);
//     if (code !== "0x") {
//       return "Arbitrum One";
//     }

//     // Arbitrum Testnet
//     provider = new providers.JsonRpcProvider("https://rinkeby.arbitrum.io/rpc");
//     code = await provider.getCode(address);
//     if (code !== "0x") {
//       return "Arbitrum Testnet";
//     }

//     // Avalanche Mainnet
//     provider = new providers.JsonRpcProvider(
//       "https://api.avax.network/ext/bc/C/rpc"
//     );
//     code = await provider.getCode(address);
//     if (code !== "0x") {
//       return "Avalanche";
//     }

//     // Avalanche Testnet
//     provider = new providers.JsonRpcProvider(
//       "https://api.avax-test.network/ext/bc/C/rpc"
//     );
//     code = await provider.getCode(address);
//     if (code !== "0x") {
//       return "Avalanche Testnet";
//     }

//     // If no network was detected
//     return null;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }

// async function getNetworkFromAddress(address) {
//   try {
//     // Ethereum Mainnet
//     const response = await fetch(
//       `https://api.etherscan.io/api?module=proxy&action=eth_getCode&address=${address}&tag=latest&apikey=YOUR_API_KEY`
//     );
//     const data = await response.json();
//     if (data.result !== "0x") {
//       return "Ethereum Mainnet";
//     }

//     // Ethereum Testnets
//     const testnets = ["rinkeby", "ropsten", "kovan"];
//     for (let i = 0; i < testnets.length; i++) {
//       const response = await fetch(
//         `https://${testnets[i]}.infura.io/v3/YOUR_PROJECT_ID`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             jsonrpc: "2.0",
//             method: "eth_getCode",
//             params: [address, "latest"],
//             id: 1,
//           }),
//         }
//       );
//       const data = await response.json();
//       if (data.result !== "0x") {
//         return `${testnets[i].charAt(0).toUpperCase()}${testnets[i].slice(
//           1
//         )} Testnet`;
//       }
//     }

//     // Binance Smart Chain Mainnet
//     const responses = await fetch(
//       `https://bsc-dataseed1.binance.org/api/v1/contracts/${address}`
//     );
//     const datas = await responses.json();
//     if (datas.name !== "") {
//       return "Binance Smart Chain";
//     }

//     // Binance Smart Chain Testnet
//     const testnetResponse = await fetch(
//       `https://data-seed-prebsc-1-s1.binance.org:8545/`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           jsonrpc: "2.0",
//           method: "eth_getCode",
//           params: [address, "latest"],
//           id: 1,
//         }),
//       }
//     );
//     const testnetData = await testnetResponse.json();
//     if (testnetData.result !== "0x") {
//       return "Binance Smart Chain Testnet";
//     }

//     // Polygon Mainnet
//     const polygonResponse = await fetch(
//       `https://rpc-mainnet.maticvigil.com/contract/${address}`
//     );
//     const polygonData = await polygonResponse.json();
//     if (polygonData.name !== "") {
//       return "Polygon";
//     }

//     // Polygon Testnet
//     const mumbaiResponse = await fetch(
//       `https://rpc-mumbai.maticvigil.com/contract/${address}`
//     );
//     const mumbaiData = await mumbaiResponse.json();
//     if (mumbaiData.name !== "") {
//       return "Polygon Testnet";
//     }

//     // Arbitrum One
//     const arbitrumResponse = await fetch(
//       `https://api.arbiscan.io/api?module=contract&action=getsourcecode&address=${address}`
//     );
//     const arbitrumData = await arbitrumResponse.json();
//     if (arbitrumData.result.length > 0) {
//       return "Arbitrum One";
//     }

//     // Arbitrum Testnet
//     const rinkebyResponse = await fetch(`https://rinkeby.arbitrum.io/rpc`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         jsonrpc: "2.0",
//         method: "eth_getCode",
//         params: [address, "latest"],
//         id: 1,
//       }),
//     });
//     const rinkebyData = await rinkebyResponse.json();
//     if (rinkebyData.result !== "0x") {
//       return "Arbitrum Testnet";
//     }

//     // No matching network found
//     return "Unknown";
//   } catch (error) {
//     console.error(error);
//     return "Error";
//   }
// }

async function getNetworkFromAddress(hashOrAddress) {
  const etherscanApiKey = "N98ZV19DWMZZ2HPA5J4NS7BVK1GRQ1QGSR";
  const polygonscanApiKey = "M22ZP6XJAGIRZ42RFS4UVHM5UYB2C7JME6";
  const bscscanApiKey = "X9U59HU5Y5K5SHFN7WSNM6KIMJCYJMCAXP";
  const arbitrumApiKey = "C2IEDITCYBW6YPG5CX32P8MGE8UKU48PVA";

  if (hashOrAddress?.length > 42) {
    // Ethereum Mainnet
    const etherscanUrl = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${hashOrAddress}&apikey=${etherscanApiKey}`;
    let response = await fetch(etherscanUrl);
    let data = await response.json();
    if (data.result) {
      return "Ethereum";
    }

    // Polygon Mainnet
    const polygonscanUrl = `https://api.polygonscan.com/api?module=proxy&action=eth_getTransactionByHash&txhash=${hashOrAddress}&apikey=${polygonscanApiKey}`;
    response = await fetch(polygonscanUrl);
    data = await response.json();
    if (data.result) {
      return "polygon";
    }

    // Binance Smart Chain Mainnet
    const bscscanUrl = `https://api.bscscan.com/api?module=proxy&action=eth_getTransactionByHash&txhash=${hashOrAddress}&apikey=${bscscanApiKey}`;
    response = await fetch(bscscanUrl);
    data = await response.json();
    if (data.result) {
      return "bsc";
    }

    // Arbitrum Smart Chain Mainnet
    const arbiscanUrl = `https://api.arbiscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${hashOrAddress}&apikey=${arbitrumApiKey}`;
    response = await fetch(arbiscanUrl);
    data = await response.json();
    if (data.result) {
      return "arbitrum";
    }
  } else if (hashOrAddress?.length == 42) {
    console.log("called wallet addr in api");

    const etherscanWalletUrl = `https://api.etherscan.io/api?module=account&action=balance&address=${hashOrAddress}&tag=latest&apikey=${etherscanApiKey}`;
    let response = await fetch(etherscanWalletUrl);
    let data = await response.json();
    console.log(data, "etheradatat");

    if (data.result?.length > 2) {
      return "Ethereum";
    } else if (data.result?.length < 3) {
      const polygonscanWalletUrl = `https://api.polygonscan.com/api?module=account&action=balance&address=${hashOrAddress}&tag=latest&apikey=${polygonscanApiKey}`;
      let polygonresponse = await fetch(polygonscanWalletUrl);
      let polygondata = await polygonresponse.json();
      console.log(polygondata, "polygonadatata");
      if (polygondata.result?.length > 2) {
        return "polygon";
      } else if (data.result?.length < 3 || polygondata.result?.length < 3) {
        const bscscanWalletUrl = `https://api.bscscan.com/api?module=account&action=balance&address=${hashOrAddress}&tag=latest&apikey=${bscscanApiKey}`;
        let bscresponse = await fetch(bscscanWalletUrl);
        let bscdata = await bscresponse.json();
        console.log(bscdata, "bascdata");
        if (bscdata.result?.length > 2) {
          return "bsc";
        } else if (
          data.result?.length < 3 ||
          polygondata.result?.length < 3 ||
          bscdata.result?.length < 3
        ) {
          const arbiscanWalletUrl = `https://api.arbiscan.io/api?module=account&action=balance&address=${hashOrAddress}&tag=latest&apikey=${arbitrumApiKey}`;
          let arbiResponse = await fetch(arbiscanWalletUrl);
          let arbiData = await arbiResponse.json();
          console.log(arbiData, "polygonadatata");
          if (arbiData.result?.length > 2) {
            return "arbitrum";
          }
        }
      }
    }
  }

  // Arbitrum Mainnet
  // const arbitrumUrl = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${hashOrAddress}&apikey=${arbitrumApiKey}`;
  // response = await fetch(arbitrumUrl);
  // data = await response.json();
  // if (data.status === "1") {
  //   return "arbitrum";
  // }

  // No matching network found
  return "Unknown network";
}

const formatDate = (timestamp) => {
  const date = new Date(parseInt(timestamp) * 1000);
  const currentDate = new Date();
  const diff = Math.floor((currentDate - date) / 1000); // difference in seconds

  const seconds = diff % 60;
  const minutes = Math.floor(diff / 60) % 60;
  const hours = Math.floor(diff / 3600) % 24;
  const days = Math.floor(diff / 86400);

  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();
  const time = date.toLocaleTimeString();

  return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds (${month} ${day}, ${year} ${time})`;
};
export {
  // getNetworkFromAddress
  // getAllNetworkFromAddress,
  getNetworkFromAddress,
  formatDate,
};
