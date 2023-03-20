// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const WalletDetails = () => {
//   const [walletAddress, setWalletAddress] = useState("");
//   const [walletData, setWalletData] = useState(null);

//   const fetchWalletData = async () => {
//     const apiUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&apikey=${"N98ZV19DWMZZ2HPA5J4NS7BVK1GRQ1QGSR"}`;
//     try {
//       const response = await axios.get(apiUrl);
//       setWalletData(response.data.result);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     if (walletAddress) {
//       fetchWalletData();
//     }
//   }, [walletAddress]);

//   const handleAddressChange = (event) => {
//     setWalletAddress(event.target.value);
//   };

//   return (
//     <div>
//       <h2>Enter Wallet Address</h2>
//       <input type="text" value={walletAddress} onChange={handleAddressChange} />
//       {walletData ? (
//         <div>
//           <h2>Wallet Details</h2>
//           <p>Wallet Address: {walletAddress}</p>
//           <p>Number of Transactions: {walletData.length}</p>
//           <table>
//             <thead>
//               <tr>
//                 <th>Transaction Hash</th>
//                 <th>From</th>
//                 <th>To</th>
//                 <th>Value (ETH)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {walletData.map((transaction) => (
//                 <tr key={transaction.hash}>
//                   <td>{transaction.hash}</td>
//                   <td>{transaction.from}</td>
//                   <td>{transaction.to}</td>
//                   <td>{(transaction.value / 1e18).toFixed(4)}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p>Please enter a valid wallet address</p>
//       )}
//     </div>
//   );
// };

// export default WalletDetails;


// ${"N98ZV19DWMZZ2HPA5J4NS7BVK1GRQ1QGSR"}


import React, { useState, useEffect } from "react";
import axios from "axios";
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const WalletDetails = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [walletData, setWalletData] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchWalletData = async () => {
    setLoading(true);
    const apiUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&apikey=${"N98ZV19DWMZZ2HPA5J4NS7BVK1GRQ1QGSR"}`;
    const balanceApiUrl = `https://api.etherscan.io/api?module=account&action=balance&address=${walletAddress}&tag=latest&apikey=${"N98ZV19DWMZZ2HPA5J4NS7BVK1GRQ1QGSR"}`;

    try {
      const [txListResponse, balanceResponse] = await Promise.all([
        axios.get(apiUrl),
        axios.get(balanceApiUrl),
      ]);
      setWalletData(txListResponse.data.result);
      setWalletBalance(balanceResponse.data.result);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (walletAddress) {
      fetchWalletData();
    }
  }, [walletAddress]);

  const handleAddressChange = (event) => {
    setWalletAddress(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const itemsPerPage = 10;
  const totalPages = walletData ? Math.ceil(walletData.length / itemsPerPage) : 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div>
      <h2>Enter Wallet Address</h2>
      <input type="text" value={walletAddress} onChange={handleAddressChange} />
      {loading ? (
        <PulseLoader css={override} size={10} color={"#123abc"} />
      ) : walletData ? (
        <div>
          <h2>Wallet Details</h2>
          <p>Wallet Address: {walletAddress}</p>
          <p>Balance: {(walletBalance / 1e18).toFixed(4)} ETH</p>
          <p>Number of Transactions: {walletData.length}</p>
          <table>
            <thead>
              <tr>
                <th>Transaction Hash</th>
                <th>From</th>
                <th>To</th>
                <th>Value (ETH)</th>
              </tr>
            </thead>
            <tbody>
              {walletData.slice(startIndex, endIndex).map((transaction) => (
                <tr key={transaction.hash}>
                  <td>{transaction.hash}</td>
                  <td>{transaction.from}</td>
                  <td>{transaction.to}</td>
                  <td>{(transaction.value / 1e18).toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <p>
              Page {currentPage} of {totalPages}
            </p>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              >
              Previous
              </button>
              <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              >
              Next
              </button>
              </div>
              </div>
              ) : null}
              </div>
              );
              };
              
              export default WalletDetails;
