import React, { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import axios from "axios";
import { css } from "@emotion/react";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const WalletAndTransaction = () => {
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
        `https://api.etherscan.io/api?module=${input.length === 42 ? 'account' : 'proxy'}&action=${input.length === 42 ? 'balance' : 'eth_getTransactionByHash'}&${input.length === 42 ? 'address' : 'txhash'}=${input}&tag=latest&apikey=${"N98ZV19DWMZZ2HPA5J4NS7BVK1GRQ1QGSR"}`
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
      {data && (
        <div className="wallet-details">
          {input.length === 42 && (
            <div className="wallet-details-container">
              <div className="wallet-details-item">
                <div className="wallet-details-label">Address</div>
                <div className="wallet-details-value">{data}</div>
              </div>
              <div className="wallet-details-item">
                <div className="wallet-details-label">ETH Balance</div>
                <div className="wallet-details-value">
                  {parseFloat(data / 1e18).toFixed(4)} ETH
                </div>
              </div>
            </div>
          )}
          {input.length === 66 && (
            <div className="transaction-details">
              <div className="transaction-details-container">
                <div className="transaction-details-item">
                  <div className="transaction-details-label">From</div>
                  <div className="transaction-details-value">
                    {data.from}
                  </div>
                </div>
                <div className="transaction-details-item">
                  <div className="transaction-details-label">To</div>
                  <div className="transaction-details-value">
                    {data.to}
                  </div>
                </div>
                <div className="transaction-details-item">
                  <div className="transaction-details-label">Value</div>
                  <div className="transaction-details-value">
                    {parseFloat(data.value / 1e18).toFixed(4)} ETH
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {loading && (
        <div className="wallet-loading">
          <PulseLoader color={"#007bff"} loading={loading} css={override} />
        </div>
      )}
    </div>
  );
};

export default WalletAndTransaction;
