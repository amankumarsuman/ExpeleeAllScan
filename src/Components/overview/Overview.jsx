import React, { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { css } from "@emotion/react";
import "./overview.css"
const override = css`
  display: block;
  margin: 0 auto;
`;

export const WalletOverview = () => {
  const [address, setAddress] = useState("");
  const [walletData, setWalletData] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  useEffect(() => {
    const fetchWalletData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${"N98ZV19DWMZZ2HPA5J4NS7BVK1GRQ1QGSR"}`
        );
        const json = await response.json();
        setWalletData(json.result);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    const fetchWalletBalance = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${"N98ZV19DWMZZ2HPA5J4NS7BVK1GRQ1QGSR"}`
        );
        const json = await response.json();
        setWalletBalance(json.result);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    const fetchTokenBalance = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2&address=${address}&tag=latest&apikey=${"N98ZV19DWMZZ2HPA5J4NS7BVK1GRQ1QGSR"}`
        );
        const json = await response.json();
        setTokenBalance(json.result);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    if (address) {
      fetchWalletData();
      fetchWalletBalance();
      fetchTokenBalance();
    }
  }, [address]);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const sortedWalletData =
    walletData &&
    walletData.sort((a, b) => b.timeStamp - a.timeStamp);

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction =
    indexOfLastTransaction - transactionsPerPage;
  const currentTransactions =
    sortedWalletData &&
    sortedWalletData.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const totalPages =
    sortedWalletData && Math.ceil(sortedWalletData.length / transactionsPerPage);

  return (
    <div>
      <h1>Wallet Details</h1>
      <h2>Enter Wallet Address</h2>
      <input type="text" value={address} onChange={handleAddressChange} />
      <div className="wallet-overview">
        <div className="wallet-overview-item">
          <div className="wallet-overview-item-label">ETH Balance</div>
          {loading || walletBalance === null ? (
      <PulseLoader color={"#007bff"} loading={loading} css={override} />
    ) : (
      <div className="wallet-overview-item-value">
        {parseFloat(walletBalance / 1e18).toFixed(4)} ETH
      </div>
    )}
  </div>
  <div className="wallet-overview-item">
    <div className="wallet-overview-item-label">ETH Value</div>
    {loading || walletBalance === null ? (
      <PulseLoader color={"#007bff"} loading={loading} css={override} />
    ) : (
      <div className="wallet-overview-item-value">
        ${parseFloat(
          (walletBalance / 1e18) *
            parseFloat(
              document.getElementById("ethusd").getAttribute("data-price")
            )
        ).toFixed(2)}
      </div>
    )}
  </div>
  <div className="wallet-overview-item">
    <div className="wallet-overview-item-label">Token Holdings</div>
    {loading || tokenBalance === null ? (
      <PulseLoader color={"#007bff"} loading={loading} css={override} />
    ) : (
      <div className="wallet-overview-item-value">
        {parseFloat(tokenBalance / 1e18).toFixed(4)} DAI
      </div>
    )}
  </div>
</div>
</div>
  )

    }

