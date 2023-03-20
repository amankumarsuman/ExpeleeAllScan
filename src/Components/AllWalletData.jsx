import React, { useState } from "react";
import BasicCard from "./Card";
// import { formatUnits } from "ethers/lib/utils";
import { getWalletData } from "./GetWalletData";
import FullWidthTabs from "./Tabs";
// assuming the getWalletData function is exported from a separate file

function AllWalletDetails() {
  const [address, setAddress] = useState("");
  const [network, setNetwork] = useState("ethereum");
  const [walletData, setWalletData] = useState(null);
  const [allTransaction, setAllTransaction] = useState([]);
  const [moreAddress, setMoreAddress] = useState([]);
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleNetworkChange = (event) => {
    setNetwork(event.target.value);
  };

  const handleGetDetails = async () => {
    try {
      const data = await getWalletData(address, network);
      setWalletData(data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(walletData);
  return (
    <div>
      <label>
        Wallet address:{" "}
        <input type="text" value={address} onChange={handleAddressChange} />
      </label>
      <br />
      <label>
        Network:{" "}
        <select value={network} onChange={handleNetworkChange}>
          <option value="ethereum">Ethereum</option>
          <option value="polygon">Polygon</option>
          <option value="arbitrum">Arbitrum</option>
          <option value="bsc">BSC</option>
        </select>
      </label>
      <br />
      <button onClick={handleGetDetails}>Get details</button>
      <hr />
      {/* {walletData && (
        <div>
          <p>Balance: {walletData.balanceInEther} ETH</p>
          <p>Last transaction:</p>
          <ul>
            <li>Hash: {walletData.lastTx.hash}</li>
            <li>From: {walletData.lastTx.from}</li>
            <li>To: {walletData.lastTx.to}</li>
            <li>Value: {walletData.lastTx.value / 10 ** 18} ETH</li>
            <li>Timestamp: {walletData.lastTx.timestamp}</li>
            <li>Gas used: {walletData.lastTx.gasUsed}</li>
            <li>Gas price: {walletData.lastTx.gasPrice} Gwei</li>
            <li>Fee: {walletData.lastTx.fee / 10 ** 18} ETH</li>
          </ul>
          <p>First transaction:</p>
          <ul>
            <li>Hash: {walletData.firstTx.hash}</li>
            <li>From: {walletData.firstTx.from}</li>
            <li>To: {walletData.firstTx.to}</li>
            <li>Value: {walletData.firstTx.value / 10 ** 18} ETH</li>
            <li>Timestamp: {walletData.firstTx.timestamp}</li>
            <li>Gas used: {walletData.firstTx.gasUsed}</li>
            <li>Gas price: {walletData.firstTx.gasPrice} Gwei</li>
            <li>Fee: {walletData.firstTx.fee / 10 ** 18} ETH</li>
          </ul>
        </div>
      )} */}

      <div
        style={{
          width: "90%",
          margin: "auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {walletData && (
          <BasicCard
            balance={walletData?.balance}
            balanceInEther={walletData?.balanceInEther}
            network={network}
          />
          // <div>
          //   <p>
          //     Balance: {balance} wei ({balanceInEther} ether)
          //   </p>
          // </div>
        )}
        {walletData && (
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
            lastTxn={walletData?.lastTx.hash}
            lastTxnBlockNumber={walletData?.lastTx.blockNumber}
            lastTxnTime={walletData?.lastTx.timeStamp}
            firstTxn={walletData?.firstTx.hash}
            firstTxnBlockNumber={walletData?.firstTx.blockNumber}
            firstTxnTime={walletData?.firstTx.timeStamp}
          />
        )}
        {walletData && (
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
      {walletData?.allTransaction && walletData?.allTransaction?.length > 0 ? (
        <FullWidthTabs data={walletData?.allTransaction} />
      ) : null}
    </div>
  );
}
export { AllWalletDetails };
