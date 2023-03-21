import React, { useState } from "react";
import axios from "axios";
import TransactionTable from "./TransactionTable";
import { Paper } from "@mui/material";
import BasicCard from "./Card";
import ColorTabs from "./Tabs";
import FullWidthTabs from "./Tabs";
function WalletDataWithTime() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(null);
  const [lastTx, setLastTx] = useState(null);
  const [firstTx, setFirstTx] = useState(null);
  const [allTransaction, setAllTransaction] = useState([]);
  const [moreAddress, setMoreAddress] = useState([]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const balanceResponse = await axios.get(
      `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${"N98ZV19DWMZZ2HPA5J4NS7BVK1GRQ1QGSR"}`
    );
    const txListResponse = await axios.get(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=asc&apikey=${"N98ZV19DWMZZ2HPA5J4NS7BVK1GRQ1QGSR"}`
    );
    setBalance(balanceResponse.data.result);
    setLastTx(txListResponse.data.result[0]);
    setAllTransaction(txListResponse?.data?.result);
    setFirstTx(
      txListResponse.data.result[txListResponse.data.result.length - 1]
    );
  };

  const balanceInEther = balance ? balance / 10 ** 18 : null;
  // const formatDate = (timestamp) => {
  //   const date = new Date(parseInt(timestamp) * 1000);
  //   return date.toLocaleString();
  // };
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Wallet Address:
          <input
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      <div
        style={{
          width: "90%",
          margin: "auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {balanceInEther && (
          <BasicCard balance={balance} balanceInEther={balanceInEther} />
          // <div>
          //   <p>
          //     Balance: {balance} wei ({balanceInEther} ether)
          //   </p>
          // </div>
        )}
        {lastTx && (
          // <div>
          //   <p>Last Transaction:</p>
          //   <ul>
          //     <li>Hash: {lastTx.hash}</li>
          //     <li>Block Number: {lastTx.blockNumber}</li>
          //     <li>
          //       Value: {lastTx.value} wei ({lastTx.value / 10 ** 18} ether)
          //     </li>
          //     <li>Timestamp: {formatDate(lastTx.timeStamp)}</li>
          //   </ul>
          // </div>

          <BasicCard
            lastTxn={lastTx.hash}
            lastTxnBlockNumber={lastTx.blockNumber}
            lastTxnTime={formatDate(lastTx.timeStamp)}
            firstTxn={firstTx.hash}
            firstTxnBlockNumber={firstTx.blockNumber}
            firstTxnTime={formatDate(firstTx.timeStamp)}
          />
        )}
        {firstTx && (
          // <div>
          //   <p>First Transaction:</p>
          //   <ul>
          //     <li>Hash: {firstTx.hash}</li>
          //     <li>Block Number: {firstTx.blockNumber}</li>
          //     <li>
          //       Value: {firstTx.value} wei ({firstTx.value / 10 ** 18} ether)
          //     </li>
          //     <li>Timestamp: {formatDate(firstTx.timeStamp)}</li>
          //   </ul>
          // </div>
          <BasicCard moreAddress={moreAddress} />
        )}
      </div>
      {allTransaction && allTransaction?.length > 0 ? (
        <FullWidthTabs data={allTransaction} />
      ) : null}
      {/* <TransactionTable data={allTransaction} /> */}
    </div>
  );
}

export default WalletDataWithTime;
