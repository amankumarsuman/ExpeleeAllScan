import React, { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import axios from "axios";
import { css } from "@emotion/react";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const TransactionHashDetails = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${input}&apikey=${"N98ZV19DWMZZ2HPA5J4NS7BVK1GRQ1QGSR"}`
      );
      setData(response.data.result);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="wallet-container">
      <div className="wallet-search">
        <input
          type="text"
          placeholder="Enter wallet address or transaction hash"
          value={input}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {data !== null && (
        <div className="wallet-details">
          <div className="wallet-details-item">
            <div className="wallet-details-item-label">Transaction Hash</div>
            <div className="wallet-details-item-value">{data.hash}</div>
          </div>
          <div className="wallet-details-item">
            <div className="wallet-details-item-label">Block Number</div>
            <div className="wallet-details-item-value">{data.blockNumber}</div>
          </div>
          <div className="wallet-details-item">
            <div className="wallet-details-item-label">Block Hash</div>
            <div className="wallet-details-item-value">{data.blockHash}</div>
          </div>
          <div className="wallet-details-item">
            <div className="wallet-details-item-label">From</div>
            <div className="wallet-details-item-value">{data.from}</div>
          </div>
          <div className="wallet-details-item">
            <div className="wallet-details-item-label">To</div>
            <div className="wallet-details-item-value">{data.to}</div>
          </div>
          <div className="wallet-details-item">
            <div className="wallet-details-item-label">Value</div>
            <div className="wallet-details-item-value">{data.value}</div>
          </div>
          <div className="wallet-details-item">
            <div className="wallet-details-item-label">Gas Price</div>
            <div className="wallet-details-item-value">{data.gasPrice}</div>
          </div>
          <div className="wallet-details-item">
            <div className="wallet-details-item-label">Gas Used</div>
            <div className="wallet-details-item-value">{data.gasUsed}</div>
          </div>
          <div className="wallet-details-item">
            <div className="wallet-details-item-label">Input Data</div>
            <div className="wallet-details-item-value">{data.input}</div>
          </div>
        </div>
      )}
      {loading && (
        <PulseLoader color={"#007bff"} loading={loading} css={override} />
      )}
    </div>
  )}

  export default TransactionHashDetails