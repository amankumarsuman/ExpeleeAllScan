import React, { useState } from "react";
import { formatTransactionDetails, getContractOrTokenDetails, getTransactionDetails } from "./Transaction-utils";
import TransactionDetailsUI from "./TransactionDetailsUI";

function ContractDetails() {
  const [transactionHash, setTransactionHash] = useState("");
  const [network, setNetwork] = useState("ethereum");
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const TransactionResult = await getContractOrTokenDetails(transactionHash, network);
      const formattedDetails = formatTransactionDetails(TransactionResult);
      setDetails(formattedDetails);
      console.log(formattedDetails,"formattedDetails")
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <h1>Transaction Details</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Transaction Hash:
          <input
            type="text"
            value={transactionHash}
            onChange={(e) => setTransactionHash(e.target.value)}
          />
        </label>
        <br />
        <label>
          Network:
          <select value={network} onChange={(e) => setNetwork(e.target.value)}>
            <option value="ethereum">Ethereum</option>
            <option value="polygon">Polygon</option>
            <option value="bsc">Bsc</option>
            <option value="arbitrum">arbitrum</option>
            <option value="goerli">Goerli</option>
          </select>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {error && <div>Error: {error}</div>}
      {details && (
        <div>
          <TransactionDetailsUI data={details}/>
          {/* <p>Hash: {details.blockHash}</p>
          <p>Status: {details.status}</p>
          <p>Block Number: {details.blockNumber}</p>
          <p>Gas Used: {details.gasUsedWei}</p>
          <p>Gas Price: {details.gasPriceGwei}</p>
          <p>From: {details.from}</p>
          <p>To: {details.to}</p>
          <p>Value: {details.value}</p>
          <p>Data: {details.Data}</p> */}
        </div>
      )}
    </div>
  );
}

export {ContractDetails}