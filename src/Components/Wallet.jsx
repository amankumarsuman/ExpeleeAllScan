import React, { useState } from "react";
import axios from "axios";

function WalletData() {
  const [address, setAddress] = useState("");
  const [data, setData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get(
      `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${"N98ZV19DWMZZ2HPA5J4NS7BVK1GRQ1QGSR"}`
    );
    setData(response.data.result);
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
      {data && (
        <div>
          <p>Balance: {data}</p>
        </div>
      )}
    </div>
  );
}

export default WalletData;
