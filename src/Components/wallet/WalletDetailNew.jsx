// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { css } from "@emotion/react";
// import PulseLoader from "react-spinners/PulseLoader";

// const override = css`
//   display: block;
//   margin: 0 auto;
//   border-color: red;
// `;

// const WalletDetails = () => {
//   const [walletAddress, setWalletAddress] = useState("");
//   const [walletData, setWalletData] = useState(null);
//   const [sortedWalletData, setSortedWalletData] = useState(null);
//   const [walletBalance, setWalletBalance] = useState(null);
//   const [tokenBalance, setTokenBalance] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);

//   const fetchWalletData = async () => {
//     setLoading(true);
//     const apiUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&apikey=${"N98ZV19DWMZZ2HPA5J4NS7BVK1GRQ1QGSR"}`;
//     const balanceApiUrl = `https://api.etherscan.io/api?module=account&action=balance&address=${walletAddress}&tag=latest&apikey=${"N98ZV19DWMZZ2HPA5J4NS7BVK1GRQ1QGSR"}`;

//     try {
//       const [txListResponse, balanceResponse] = await Promise.all([
//         axios.get(apiUrl),
//         axios.get(balanceApiUrl),
//       ]);
//       setWalletData(txListResponse.data.result);
//       setWalletBalance(balanceResponse.data.result);
//     } catch (error) {
//       console.error(error);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (walletAddress) {
//       fetchWalletData();
//     }
//   }, [walletAddress]);

//   useEffect(() => {
//     if (walletData) {
//       const sortedData = [...walletData].sort((a, b) => b.timeStamp - a.timeStamp);
//       setSortedWalletData(sortedData);
//     }
//   }, [walletData]);

//   const handleAddressChange = (event) => {
//     setWalletAddress(event.target.value);
//   };

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const itemsPerPage = 10;
//   const totalPages = sortedWalletData ? Math.ceil(sortedWalletData.length / itemsPerPage) : 0;
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;

//   const fetchTokenBalance = async () => {
//     const tokenApiUrl = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x5f422e1ce6d1a0cbe37f4a4a2ac4ddb96bafba75&address=${walletAddress}&tag=latest&apikey=${"N98ZV19DWMZZ2HPA5J4NS7BVK1GRQ1QGSR"}`;
//     try {
//       const tokenResponse = await axios.get(tokenApiUrl);
//       setTokenBalance(tokenResponse.data.result);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     if (walletAddress) {
//       fetchTokenBalance();
//     }
//   }, [walletAddress]);

//   return (
//     <div
//     <h2>Wallet Details</h2>
//     <label htmlFor="address">Enter Wallet Address:</label>
//     <input type="text" id="address" onChange={handleAddressChange} />
//     {loading ? (
//         <PulseLoader color={"#36D7B7"} loading={loading} css={override} size={10} />
//       ) : (
//         <div>
//           {walletData && (
//             <div>
//               <h3>Transaction History</h3>
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Block Number</th>
//                     <th>Timestamp</th>
//                     <th>From</th>
//                     <th>To</th>
//                     <th>Value (Ether)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {sortedWalletData.slice(startIndex, endIndex).map((tx) => (
//                     <tr key={tx.hash}>
//                       <td>{tx.blockNumber}</td>
//                       <td>{new Date(tx.timeStamp * 1000).toLocaleString()}</td>
//                       <td>{tx.from}</td>
//                       <td>{tx.to}</td>
//                       <td>{tx.value / 10 ** 18}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               <div>
//                 <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
//                   Previous Page
//                 </button>
//                 <span>Page {currentPage} of {totalPages}</span>
//                 <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
//                   Next Page
//                 </button>
//               </div>
//             </div>
//           )}
//           {walletBalance && (
//             <div>
//               <h3>Wallet Balance</h3>
//               <p>{walletBalance / 10 ** 18} Ether</p>
//             </div>
//           )}
//           {tokenBalance && (
//             <div>
//               <h3>Token Holdings</h3>
//               <p>{tokenBalance / 10 ** 18} ERC-20 tokens</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>


import React, { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import axios from "axios";
import { css } from "@emotion/react";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const WalletNew = () => {
    const [input, setInput] = useState("");
    const [walletData, setWalletData] = useState(null);
    const [transactionData, setTransactionData] = useState(null);
    const [mode, setMode] = useState("wallet");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleModeChange = (mode) => {
        setMode(mode);
        setWalletData(null);
        setTransactionData(null);
    };

    const handleSearch = async () => {
        setLoading(true);
        if (mode === "wallet") {
            try {
                const response = await axios.get(
                    `https://api.etherscan.io/api?module=account&action=balance&address=${input}&tag=latest&apikey=${"N98ZV19DWMZZ2HPA5J4NS7BVK1GRQ1QGSR"}`
                );
                setWalletData(response.data.result);
            } catch (error) {
                console.error(error);
            }
        } else if (mode === "transaction") {
            try {
                const response = await axios.get(
                    `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${input}&apikey=${"N98ZV19DWMZZ2HPA5J4NS7BVK1GRQ1QGSR"}`
                );
                setTransactionData(response.data.result);
            } catch (error) {
                console.error(error);
            }
        }
        setLoading(false);
    };

    return (
        <div className="wallet-container">
            <div className="wallet-mode-toggle">
                <button
                    className={mode === "wallet" ? "active" : ""}
                    onClick={() => handleModeChange("wallet")}
                >
                    Wallet
                </button>
                <button
                    className={mode === "transaction" ? "active" : ""}
                    onClick={() => handleModeChange("transaction")}
                >
                    Transaction
                </button>
            </div>
            <div className="wallet-search">
                <input
                    type="text"
                    placeholder={
                        mode === "wallet"
                            ? "Enter wallet address"
                            : "Enter transaction hash"
                    }
                    value={input}
                    onChange={handleInputChange}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {mode === "wallet" && (
                <div className="wallet-overview">
                    <div className="wallet-overview-item">
                        <div className="wallet-overview-item-label">ETH Balance</div>
                        {loading || walletData === null ? (
                            <PulseLoader color={"#007bff"} loading={loading} css={override} />
                        ) : (
                            <div className="wallet-overview-item-value">
                                {parseFloat(walletData / 1e18).toFixed(4)} ETH
                            </div>
                        )}
                    </div>
                    <div className="wallet-overview-item">
                        <div className="wallet-overview-item-label">ETH Value</div>
                        {
                            loading || walletData === null ? (
                                <PulseLoader color={"#007bff"} loading={loading} css={override} />
                            ) : (
                                <div className="wallet-overview-item-value">
                                    {/* ${parseFloat(walletData / 1e18 * ETHPrice).toFixed(2)} */}
                                </div>
                            )}
                    </div>
                </div>
            )}
            {mode === "transaction" && (
                <div className="transaction-details">
                    {loading || transactionData === null ? (
                        <PulseLoader color={"#007bff"} loading={loading} css={override} />
                    ) : (
                        <div className="transaction-details-container">
                            <div className="transaction-details-item">
                                <div className="transaction-details-label">From</div>
                                <div className="transaction-details-value">
                                    {transactionData.from}
                                </div>
                            </div>
                            <div className="transaction-details-item">
                                <div className="transaction-details-label">To</div>
                                <div className="transaction-details-value">
                                    {transactionData.to}
                                </div>
                            </div>
                            <div className="transaction-details-item">
                                <div className="transaction-details-label">Value</div>
                                <div className="transaction-details-value">
                                    {parseFloat(transactionData.value / 1e18).toFixed(4)} ETH
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default WalletNew;
