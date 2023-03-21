import React, { useState, useEffect } from "react";
import getWalletData from "../transactionDetails/Transaction-utils/getWalletData";

const TransactionsTable = ({ network, walletAddress }) => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(10);

  useEffect(() => {
    const fetchTransactions = async () => {
      const walletData = await getWalletData(network, walletAddress);
      setTransactions(walletData);
    };
    fetchTransactions();
  }, [network, walletAddress]);

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const renderTransactionsTable = () => {
    return (
      //   <table>
      //     <thead>
      //       <tr>
      //         <th>Block #</th>
      //         <th>Timestamp</th>
      //         <th>From</th>
      //         <th>To</th>
      //         <th>Value</th>
      //       </tr>
      //     </thead>
      //     <tbody>
      //       {currentTransactions.map((tx) => (
      //         <tr key={tx.hash}>
      //           <td>{tx.blockNumber}</td>
      //           <td>{new Date(tx.timeStamp * 1000).toLocaleString()}</td>
      //           <td>{tx.from}</td>
      //           <td>{tx.to}</td>
      //           <td>
      //             {Number(tx.value) / 10 ** 18} {network === "ethereum" ? "ETH" : "MATIC"}
      //           </td>
      //         </tr>
      //       ))}
      //     </tbody>
      //   </table>

      <></>
    );
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(transactions.length / transactionsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }
    return (
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={currentPage === number ? "active" : null}
          >
            {number}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div>
      {transactions.length > 0 ? (
        <div>
          {renderTransactionsTable()}
          {renderPagination()}
        </div>
      ) : (
        <p>Loading transactions...</p>
      )}
    </div>
  );
};

export default TransactionsTable;
