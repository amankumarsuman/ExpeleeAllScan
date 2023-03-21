import axios from "axios";
// import { useDispatch } from "react-redux";
// import { formatUnits } from "ethers/lib/utils";

async function getWalletData(address, network) {
  let apiUrl, apiKey;
  switch (network) {
    case "Ethereum":
      apiUrl = "https://api.etherscan.io";
      apiKey = "N98ZV19DWMZZ2HPA5J4NS7BVK1GRQ1QGSR";
      break;
    case "polygon":
      apiUrl = "https://api.polygonscan.com";
      apiKey = "M22ZP6XJAGIRZ42RFS4UVHM5UYB2C7JME6";
      break;
    case "arbitrum":
      apiUrl = "https://api.arbiscan.io";
      apiKey = "C2IEDITCYBW6YPG5CX32P8MGE8UKU48PVA";
      break;
    case "bsc":
      apiUrl = "https://api.bscscan.com/";
      apiKey = "X9U59HU5Y5K5SHFN7WSNM6KIMJCYJMCAXP";
      break;
    default:
      throw new Error(`Unsupported network: ${network}`);
  }

  const txListResponse = await axios.get(
    `${apiUrl}/api?module=account&action=txlist&address=${address}&sort=asc&apikey=${apiKey}`
  );
  console.log(txListResponse, "txListResponse");

  const txListInternalResponse = await axios.get(
    `${apiUrl}/api?module=account&action=txlistinternal&address=${address}&sort=asc&apikey=${apiKey}`
  );

  // const blockResponse = await axios.get(
  //   `${apiUrl}/api?module=block&action=getblockreward&blocknumber=${blockNumber}&apikey=${apiKey}`
  // );

  // console.log(blockResponse,"blockrespponse")
  let balanceResponse;
  // if (txListResponse?.result?.length > 0) {
  balanceResponse = await axios.get(
    `${apiUrl}/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`
  );
  console.log(balanceResponse, "balanceResponse");
  // }

  //   const balanceInEther = formatUnits(balanceResponse.data.result, 18);
  const balanceInEther = balanceResponse?.data?.result
    ? balanceResponse?.data?.result / 10 ** 18
    : null;
  const lastTx = txListResponse?.data?.result[0];
  const firstTx =
    txListResponse?.data?.result[txListResponse?.data?.result?.length - 1];

  // const type = tx.to.toLowerCase() === address.toLowerCase() ? "IN" : "OUT";
// const blockProduced=txListResponse?.data?.result?.map((el=>{
//   return{

//   }
// }))
  return {
    balance: balanceResponse?.data?.result / 10 ** 18,
    balanceInEther,
    allTransaction: txListResponse?.data?.result || [],

internalTxn:txListInternalResponse?.data?.result,
    lastTx: {
      hash: lastTx?.hash,
      blockNumber: lastTx?.blockNumber,
      from: lastTx?.from,
      to: lastTx?.to,
      value: lastTx?.value,
      timestamp: formatDate(lastTx?.timeStamp),
      gasUsed: lastTx?.gasUsed,
      gasPrice: lastTx?.gasPrice,
      fee: lastTx?.gasUsed * parseInt(lastTx.gasPrice),
    },
    firstTx: {
      hash: firstTx?.hash,
      blockNumber: firstTx?.blockNumber,
      from: firstTx?.from,
      to: firstTx?.to,
      value: firstTx?.value,
      timestamp: formatDate(firstTx?.timeStamp),
      gasUsed: firstTx?.gasUsed,
      gasPrice: firstTx?.gasPrice,
      fee: firstTx?.gasUsed * parseInt(firstTx?.gasPrice),
    },


    blockDetails:{
blockNumber:txListResponse?.data?.result?.blockNumber,
timestamp: formatDate(firstTx?.timeStamp),
transactionIndex:txListResponse?.data?.result?.blockNumber?.transactionIndex,
cumulativeGasUsed:txListResponse?.data?.result?.blockNumber?.cumulativeGasUsed* parseInt(txListResponse?.data?.result?.blockNumber?.cumulativeGasUsed),
gasUsed:txListResponse?.data?.result?.blockNumber?.gasUsed* parseInt(txListResponse?.data?.result?.blockNumber?.gasUsed),
gasPrice:txListResponse?.data?.result?.blockNumber?.gasPrice* parseInt(txListResponse?.data?.result?.blockNumber?.gasPrice),

    },
  };
}

function formatDate(timestamp) {
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
}
export { getWalletData };
