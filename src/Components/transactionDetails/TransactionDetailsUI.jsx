// import React from 'react';
// import './TransactionDetailsStyle.css';
// import {Paper} from "@mui/material"
// const TransactionDetailsUI = () => {
//   return (
//     <Paper elevation={6} className="transaction-details-container">
//       <div className="transaction-details-header">
//         <h1>Transaction Details</h1>
//         <button>Back</button>
//       </div>
//       <div className="transaction-details">
//         <div className="transaction-details-section">
//           <h2>Transaction Hash</h2>
//           <p>0x123456789abcdef</p>
//         </div>
//         <div className="transaction-details-section">
//           <h2>Status</h2>
//           <p>Success</p>
//         </div>
//         <div className="transaction-details-section">
//           <h2>Block</h2>
//           <p>1234567</p>
//         </div>
//         <div className="transaction-details-section">
//           <h2>From</h2>
//           <p>0x123456789abcdef</p>
//         </div>
//         <div className="transaction-details-section">
//           <h2>To</h2>
//           <p>0x987654321fedcba</p>
//         </div>
//         <div className="transaction-details-section">
//           <h2>Value</h2>
//           <p>1 ETH</p>
//         </div>
//         <div className="transaction-details-section">
//           <h2>Gas Limit</h2>
//           <p>21000</p>
//         </div>
//         <div className="transaction-details-section">
//           <h2>Gas Used By Transaction</h2>
//           <p>21000</p>
//         </div>
//         <div className="transaction-details-section">
//           <h2>Gas Price</h2>
//           <p>20 Gwei</p>
//         </div>
//         <div className="transaction-details-section">
//           <h2>Nonce</h2>
//           <p>1234</p>
//         </div>
//       </div>
//     </Paper>
//   );
// };

// export default TransactionDetailsUI;

import React from "react";
import { Grid, Paper } from "@mui/material";
import { formatDate } from "../getNetworkFromAddress";
function TransactionDetailsUI({ data }) {
  console.log(data, "transactionDetails");
  return (
    <>
      <Paper
        sx={{ width: "80%", margin: "auto", padding: "20px" }}
        elevation={6}
      >
        <Grid spacing={3} container>
          <Grid sx={{ textAlign: "left" }} item xs={12} md={2}>
            Hash
          </Grid>
          <Grid sx={{ textAlign: "left" }} item xs={12} md={10}>
            {data?.hash}
          </Grid>
          <Grid sx={{ textAlign: "left" }} item xs={12} md={2}>
            Status
          </Grid>
          <Grid sx={{ textAlign: "left" }} item xs={12} md={10}>
            {data ? (
              <button
                style={{
                  background: "green",
                  color: "white",
                  borderRadius: "10px",
                  border: "none",
                }}
              >
                Success
              </button>
            ) : (
              <button>Fail</button>
            )}
          </Grid>
          <Grid sx={{ textAlign: "left" }} item xs={12} md={2}>
            Block Number:
          </Grid>
          <Grid sx={{ textAlign: "left" }} item xs={12} md={10}>
            {data?.blockNumber}
          </Grid>
          {/* <Grid sx={{ textAlign: "left" }} item xs={12} md={2}>
            Time Stamp:
          </Grid>
          <Grid sx={{ textAlign: "left" }} item xs={12} md={10}>
            {formatDate(data?.blockNumber)}
          </Grid> */}
          <Grid sx={{ textAlign: "left" }} item xs={12} md={2}>
            Gas Used:
          </Grid>
          <Grid sx={{ textAlign: "left" }} item xs={12} md={10}>
            {data?.gasUsedWei}
          </Grid>
          <Grid sx={{ textAlign: "left" }} item xs={12} md={2}>
            Gas Price:
          </Grid>
          <Grid sx={{ textAlign: "left" }} item xs={12} md={10}>
            {data?.gasPriceGwei}
          </Grid>
          <Grid sx={{ textAlign: "left" }} item xs={12} md={2}>
            From:
          </Grid>
          <Grid sx={{ textAlign: "left" }} item xs={12} md={10}>
            {data?.from}
          </Grid>
          <Grid sx={{ textAlign: "left" }} item xs={12} md={2}>
            To:
          </Grid>
          <Grid sx={{ textAlign: "left" }} item xs={12} md={10}>
            {data?.to}
          </Grid>
        </Grid>
        {/* <p>Hash: {data.blockHash}</p>
          <p>Status: {data.status}</p>
          <p>Block Number: {data.blockNumber}</p>
          <p>Gas Used: {data.gasUsedWei}</p>
          <p>Gas Price: {data.gasPriceGwei}</p>
          <p>From: {data.from}</p>
          <p>To: {data.to}</p>
          <p>Value: {data.value}</p>
          <p>Data: {data.Data}</p> */}
      </Paper>
    </>
  );
}

export default TransactionDetailsUI;
