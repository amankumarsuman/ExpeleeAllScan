import React, { useState } from "react";
import axios from "axios";

function WalletDataWithTraxn() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(null);
  const [lastTx, setLastTx] = useState(null);
  const [firstTx, setFirstTx] = useState(null);

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
    setFirstTx(
      txListResponse.data.result[txListResponse.data.result.length - 1]
    );
  };

  const balanceInEther = balance ? balance / 10 ** 18 : null;

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
      {balanceInEther && (
        <div>
          <p>
            Balance: {balance} wei ({balanceInEther} ether)
          </p>
        </div>
      )}
      {lastTx && (
        <div>
          <p>Last Transaction:</p>
          <ul>
            <li>Hash: {lastTx.hash}</li>
            <li>Block Number: {lastTx.blockNumber}</li>
            <li>
              Value: {lastTx.value} wei ({lastTx.value / 10 ** 18} ether)
            </li>
          </ul>
        </div>
      )}
      {firstTx && (
        <div>
          <p>First Transaction:</p>
          <ul>
            <li>Hash: {firstTx.hash}</li>
            <li>Block Number: {firstTx.blockNumber}</li>
            <li>
              Value: {firstTx.value} wei ({firstTx.value / 10 ** 18} ether)
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default WalletDataWithTraxn;
