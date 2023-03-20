// import React, { useEffect, useState } from 'react';
// import './Etherscan.css'; // import CSS file

// const Etherscan = () => {
//   const [latestBlocks, setLatestBlocks] = useState([]);

//   useEffect(() => {
//     const fetchLatestBlocks = async () => {
//       const response = await fetch(
//         `https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=latest&boolean=true&apikey=YourApiKeyToken`
//       );
//       const data = await response.json();
//       setLatestBlocks(data.result.transactions);
//     };
//     fetchLatestBlocks();
//   }, []);

//   return (
//     <div className="col-lg-6 mb-4">
//       <div className="card">
//         <div className="card-header">
//           <h2 className="card-header-title">Latest Blocks</h2>
//         </div>
//         <div
//           className="card-body overflow-auto scrollbar-custom"
//           style={{ maxHeight: '30.3rem' }}
//           id="mCSB_1_container"
//         >
//           {latestBlocks.map((block) => (
//             <div key={block.hash} className="row">
//               <div className="col-sm-4">
//                 <div className="d-flex align-items-center gap-2">
//                   <div className="d-none d-sm-flex content-center bg-light text-muted rounded p-3" style={{ height: '3rem', width: '3rem' }}>
//                     <i className="fal fa-cube fs-lg"></i>
//                   </div>
//                   <div className="d-flex flex-row flex-sm-column align-items-center align-items-sm-start gap-1 gap-sm-0">
//                     <span className="d-inline-block d-sm-none">Block</span>
//                     <a className="text-truncate" style={{ maxWidth: '6rem' }} href={`https://etherscan.io/block/${block.blockNumber}`}>
//                       {block.blockNumber}
//                     </a>
//                     <div className="small text-muted"> {block.timeStamp} secs ago</div>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-sm-8 d-flex justify-content-sm-between align-items-end align-items-sm-center position-relative">
//                 <div className="pe-0 pe-sm-2">
//                   <div className="d-flex flex-wrap gap-1">
//                     Fee Recipient{' '}
//                     <a className="text-truncate d-block" style={{ maxWidth: '8rem' }} href={`https://etherscan.io/address/${block.to}`} data-bs-toggle="tooltip">
//                       {block.to}
//                     </a>
//                   </div>
//                   <a href={`https://etherscan.io/txs?block=${block.blockNumber}`} data-bs-toggle="tooltip">
//                     {block.transactions.length} txns{' '}
//                   </a>
//                   <span className="small text-muted me-2">in {block.duration} secs</span>
//                   <span
//                     className="d-inline-block d-sm-none badge border border-dark dark:border-white border-opacity-15 text-dark fw-medium py-1 py-sm-1.5 px-1.5 px-sm-2"
//                     data-bs-toggle="tooltip"
//                   >
//                     {block.gasUsed} Eth
//                   </span>
//                 </


import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

export const LatestBlocks = () => {
  const [latestBlocks, setLatestBlocks] = useState([]);

  useEffect(() => {
    const fetchLatestBlocks = async () => {
      const response = await axios.get(
        "https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=N98ZV19DWMZZ2HPA5J4NS7BVK1GRQ1QGSR"
      );
      const blockNumber = parseInt(response.data.result, 16);
      const blocks = [];

      for (let i = 0; i < 3; i++) {
        const blockResponse = await axios.get(
          `https://api.etherscan.io/api?module=block&action=getblockreward&blockno=${blockNumber - i}&apikey=${"N98ZV19DWMZZ2HPA5J4NS7BVK1GRQ1QGSR"}`
        );

        blocks.push(blockResponse.data.result);
      }

      setLatestBlocks(blocks);
    };

    fetchLatestBlocks();
  }, []);

  return (
    <div className="col-lg-6 mb-4">
      <div className="card">
        <div className="card-header">
          <h2 className="card-header-title">Latest Blocks</h2>
        </div>
        <div
          className="card-body overflow-auto scrollbar-custom"
          style={{ maxHeight: "30.3rem" }}
          id="mCSB_1_container"
        >
          {latestBlocks?.map((block, index) => (
            <React.Fragment key={index}>
              <div className="row">
                <div className="col-sm-4">
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="d-none d-sm-flex content-center bg-light text-muted rounded p-3"
                      style={{ height: "3rem", width: "3rem" }}
                    >
                      <i className="fal fa-cube fs-lg"></i>
                    </div>
                    <div className="d-flex flex-row flex-sm-column align-items-center align-items-sm-start gap-1 gap-sm-0">
                      <span className="d-inline-block d-sm-none">Block</span>
                      <a
                        className="text-truncate"
                        style={{ maxWidth: "6rem" }}
                        href={`https://etherscan.io/block/${block.number}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {block.number}
                      </a>
                      <span className="d-none d-sm-inline">Mined on&nbsp;</span>
                      {moment.unix(block.timeStamp).format("YYYY-MM-DD hh:mm:ss A")}
                    </div>
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="d-flex flex-row flex-sm-column justify-content-between gap-2 gap-sm-0">
                    <div>
                      <div className="text-muted mb-1">Transactions</div>
                      <div>{block.transactions?.length}</div>
                    </div>
                    <div>
                      <div className="text-muted mb-1">Reward</div>
                      <div>{block.blockReward} Ether</div>
                    </div>
                    <div>
                      <div className="text-muted mb-1">Miner</div>
                      <div className="text-truncate">{block.miner}</div>
                    </div>
                  </div>
                </div>
              </div>
              {index !== latestBlocks?.length - 1 && <hr className="my-3" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
          };

