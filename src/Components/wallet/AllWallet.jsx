import React, { useState } from 'react';
import { getWalletData } from '../transactionDetails/Transaction-utils';
// import { getWalletData } from './api';

function WalletBalance() {
  const [network, setNetwork] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);

  const handleNetworkChange = (event) => {
    setNetwork(event.target.value);
  };

  const handleWalletAddressChange = (event) => {
    setWalletAddress(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const balance = await getWalletData(network, walletAddress);
      setBalance(balance);
      setError(null);
    } catch (error) {
      setBalance(null);
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Network:
          <input type="text" value={network} onChange={handleNetworkChange} />
        </label>
        <label>
          Wallet Address:
          <input type="text" value={walletAddress} onChange={handleWalletAddressChange} />
        </label>
        <button type="submit">Get Balance</button>
      </form>
      {error && <div>Error: {error}</div>}
      {balance && <div>Balance: {balance}</div>}
    </div>
  );
}

export default WalletBalance;
