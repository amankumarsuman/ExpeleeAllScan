import React, { useState } from "react";

function AllInOneTransactionHashDetails() {
  // async function getTransactionDetails(transactionHash) {
  //     const apiBaseUrl = {
  //         mainnet: {
  //             etherscan: "https://api.etherscan.io/api",
  //             bscscan: "https://api.bscscan.com/api",
  //             polygon: "https://api.polygonscan.com/api",
  //             arbitrum: "https://api.arbiscan.io/api"
  //         },
  //         testnet: {
  //             ropsten: "https://api-ropsten.etherscan.io/api",
  //             rinkeby: "https://api-rinkeby.etherscan.io/api",
  //             kovan: "https://api-kovan.etherscan.io/api",
  //             goerli: "https://api-goerli.etherscan.io/api",
  //             bscTestnet: "https://api-testnet.bscscan.com/api",
  //             maticMumbai: "https://api-testnet.polygonscan.com/api",
  //             arbitrumRinkeby: "https://api-testnet.arbiscan.io/api"
  //         }
  //     };

  //     let apiKeys = {
  //         mainnet: {
  //             etherscan: "N98ZV19DWMZZ2HPA5J4NS7BVK1GRQ1QGSR",
  //             bscscan: "X9U59HU5Y5K5SHFN7WSNM6KIMJCYJMCAXP",
  //             polygon: "M22ZP6XJAGIRZ42RFS4UVHM5UYB2C7JME6",
  //             arbitrum: "C2IEDITCYBW6YPG5CX32P8MGE8UKU48PVA"
  //         },
  //         testnet: {
  //             etherscan: "N98ZV19DWMZZ2HPA5J4NS7BVK1GRQ1QGSR",
  //             bscTestnet: "X9U59HU5Y5K5SHFN7WSNM6KIMJCYJMCAXP",
  //             maticMumbai: "M22ZP6XJAGIRZ42RFS4UVHM5UYB2C7JME6",
  //             arbitrumRinkeby: "C2IEDITCYBW6YPG5CX32P8MGE8UKU48PVA"
  //         }
  //     };

  //     const networks = {
  //         "https://api.etherscan.io/api": ["mainnet"],
  //         "https://api.bscscan.com/api": ["mainnet", "bscTestnet"],
  //         "https://api.polygonscan.com/api": ["mainnet", "maticMumbai"],
  //         "https://api.arbiscan.io/api": ["mainnet", "arbitrumRinkeby"],
  //         "https://api-ropsten.etherscan.io/api": ["testnet"],
  //         "https://api-rinkeby.etherscan.io/api": ["testnet"],
  //         "https://api-kovan.etherscan.io/api": ["testnet"],
  //         "https://api-goerli.etherscan.io/api": ["testnet"]
  //     };

  //     // const networks = {
  //     //     mainnet: ["etherscan", "bscscan", "polygon", "arbitrum"],
  //     //     testnet: ["ropsten", "rinkeby", "kovan", "goerli", "bscTestnet", "maticMumbai", "arbitrumRinkeby"]
  //     // }

  //     let network;
  //     let apiKey;

  //     // Try each network until a valid receipt is returned
  //     for (let baseUrl in apiBaseUrl) {
  //         if (network) {
  //             break;
  //         }
  //         for (let i = 0; i < networks[baseUrl].length; i++) {
  //             const networkName = networks[baseUrl][i];
  //             const key = apiKeys[networkName][baseUrl.split('/').pop()];

  //             const url = `${baseUrl}?module=transaction&action=gettxreceiptstatus&txhash=${transactionHash}&apikey=${key}`;
  //             const response = await fetch(url);
  //             const data = await response.json();

  //             if (data.status === "1" && data.result) {
  //                 network = networkName;
  //                 apiKey = key;
  //                 break;
  //             }
  //         }
  //     }

  //     // if (!network) {
  //     //     throw new Error("Unable to fetch transaction details or network not supported");
  //     // }

  //     const url = `${apiBaseUrl[network][networks[network][0]]}?module=transaction&action=gettxreceiptstatus&txhash=${transactionHash}&apikey=${apiKey}`;

  //     const response = await fetch(url);

  //     // if (!response.ok) {
  //     //     throw new Error("Unable to fetch transaction details");
  //     // }

  //     const data = await response.json();

  //     if (data.status === "0") {
  //         throw new Error("Transaction failed");
  //     }

  //     const txDetails = {};

  //     // Add transaction hash
  //     txDetails.transactionHash = transactionHash;

  //     // Add block number and timestamp
  //     txDetails.blockNumber = data.result.blockNumber;
  //     txDetails.timestamp = new Date(parseInt(data.result.timeStamp) * 1000);

  //     // Add from and to addresses
  //     txDetails.from = data.result.from;
  //     txDetails.to = data.result.to;

  //     // Add gas and gas price
  //     txDetails.gasUsed = data.result.gasUsed;
  //     txDetails.gasPrice = data.result.gasPrice;

  //     // Add value in Ether
  //     // txDetails.value = web3.utils.fromWei(data.result.value);

  //     return txDetails;
  // }

  // async function getTransactionDetails(txHash, apiKey = 'N98ZV19DWMZZ2HPA5J4NS7BVK1GRQ1QGSR') {
  //     const endpoint = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=${apiKey}`;

  //     const response = await fetch(endpoint);
  //     const json = await response.json();
  //     console.log(json.result)

  //     // if (json.status !== '1') {
  //     //   throw new Error(`Request failed with message: ${json.message}`);
  //     // }

  //     const data = json.result;
  //     console.log(data)
  //     const txData = {
  //       hash: data.hash,
  //       blockNumber: parseInt(data.blockNumber, 16),
  //       timestamp: parseInt(data.timeStamp),
  //       from: data.from,
  //       to: data.to,
  //       value: parseInt(data.value, 16),
  //       gasPrice: parseInt(data.gasPrice, 16),
  //       gasUsed: parseInt(data.gasUsed, 16),
  //       input: data.input
  //     };

  //     return txData;
  //     // console.log(txData)
  //   }

  // async function getTransactionDetails(transactionHash, network) {
  //     const apiBaseUrl = {
  //         etherscan: {
  //             mainnet: "https://api.etherscan.io/api",
  //             ropsten: "https://api-ropsten.etherscan.io/api",
  //             rinkeby: "https://api-rinkeby.etherscan.io/api",
  //             kovan: "https://api-kovan.etherscan.io/api",
  //             goerli: "https://api-goerli.etherscan.io/api",
  //         },
  //         bscscan: {
  //             mainnet: "https://api.bscscan.com/api",
  //             testnet: "https://api-testnet.bscscan.com/api",
  //         },
  //         polygonscan: {
  //             mainnet: "https://api.polygonscan.com/api",
  //             testnet: "https://api-testnet.polygonscan.com/api",
  //         },
  //         arbiscan: {
  //             mainnet: "https://api.arbiscan.io/api",
  //             testnet: "https://api-testnet.arbiscan.io/api",
  //         },
  //     };

  //     const apiKeys = {
  //         etherscan: "N98ZV19DWMZZ2HPA5J4NS7BVK1GRQ1QGSR",
  //         bscscan: "X9U59HU5Y5K5SHFN7WSNM6KIMJCYJMCAXP",
  //         polygonscan: "M22ZP6XJAGIRZ42RFS4UVHM5UYB2C7JME6",
  //         arbiscan: "C2IEDITCYBW6YPG5CX32P8MGE8UKU48PVA",
  //     };

  //     if (!(network in apiBaseUrl) || !(network in apiKeys)) {
  //         throw new Error("Unsupported network");
  //     }

  //     const baseUrl = apiBaseUrl[network];
  //     const apiKey = apiKeys[network];

  //     const url = `${baseUrl}?module=transaction&action=gettxreceiptstatus&txhash=${transactionHash}&apikey=${apiKey}`;
  //     const response = await fetch(url);

  //     if (!response.ok) {
  //         throw new Error("Unable to fetch transaction details");
  //     }

  //     const data = await response.json();

  //     if (data.status === "0") {
  //         throw new Error("Transaction failed");
  //     }

  //     return data.result;
  // }

  async function getTransactionDetails(transactionHash, network) {
    let baseUrl, apiKey;

    switch (network) {
      case "mainnet":
        baseUrl = {
          etherscan: "https://api.etherscan.io/api",
          bscscan: "https://api.bscscan.com/api",
          polygonscan: "https://api.polygonscan.com/api",
          arbiscan: "https://api.arbiscan.io/api",
        };
        apiKey = {
          etherscan: "N98ZV19DWMZZ2HPA5J4NS7BVK1GRQ1QGSR",
          bscscan: "X9U59HU5Y5K5SHFN7WSNM6KIMJCYJMCAXP",
          polygonscan: "M22ZP6XJAGIRZ42RFS4UVHM5UYB2C7JME6",
          arbiscan: "C2IEDITCYBW6YPG5CX32P8MGE8UKU48PVA",
        };
        break;

      case "testnet":
        baseUrl = {
          etherscan: "https://api-ropsten.etherscan.io/api",
          bscscan: "https://api-testnet.bscscan.com/api",
          polygonscan: "https://api-testnet.polygonscan.com/api",
          arbiscan: "https://api-testnet.arbiscan.io/api",
        };
        apiKey = {
          etherscan: "",
          bscscan: "",
          polygonscan: "",
          arbiscan: "",
        };
        break;

      case "rinkeby":
        baseUrl = {
          etherscan: "https://api-rinkeby.etherscan.io/api",
          bscscan: "",
          polygonscan: "",
          arbiscan: "",
        };
        apiKey = {
          etherscan: "",
          bscscan: "",
          polygonscan: "",
          arbiscan: "",
        };
        break;

      case "kovan":
        baseUrl = {
          etherscan: "https://api-kovan.etherscan.io/api",
          bscscan: "",
          polygonscan: "",
          arbiscan: "",
        };
        apiKey = {
          etherscan: "",
          bscscan: "",
          polygonscan: "",
          arbiscan: "",
        };
        break;

      case "goerli":
        baseUrl = {
          etherscan: "https://api-goerli.etherscan.io/api",
          bscscan: "",
          polygonscan: "",
          arbiscan: "",
        };
        apiKey = {
          etherscan: "",
          bscscan: "",
          polygonscan: "",
          arbiscan: "",
        };
        break;

      default:
        throw new Error("Unsupported network");
    }

    if (!baseUrl[network] || !apiKey[network]) {
      throw new Error("Unsupported network");
    }

    const url = `${baseUrl[network]}?module=transaction&action=gettxreceiptstatus&txhash=${transactionHash}&apikey=${apiKey[network]}`;
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

  const [transactionHash, setTransactionHash] = useState("");
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const details = await getTransactionDetails(transactionHash, "ethereum");

      setTransactionDetails(details);
      setError(null);
    } catch (err) {
      setTransactionDetails(null);
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Transaction Hash:
          <input
            type="text"
            value={transactionHash}
            onChange={(e) => setTransactionHash(e.target.value)}
            placeholder="enter you trnsaction hash"
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Get Details"}
        </button>
      </form>
      {error && <p>Error: {error}</p>}
      {transactionDetails && (
        <div>
          <p>Network: {transactionDetails.network}</p>
          <p>Block Number: {transactionDetails.blockNumber}</p>
          <p>Gas Used: {transactionDetails.gasUsed}</p>
          <p>Status: {transactionDetails.status}</p>
        </div>
      )}
    </div>
  );
}

export default AllInOneTransactionHashDetails;
