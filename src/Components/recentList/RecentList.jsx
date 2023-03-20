// import React, { useState, useEffect } from "react";
// import "./RecentList.css";
// import Web3 from "web3";

// function RecentList({ type }) {
//   const [recentList, setRecentList] = useState([]);

//   useEffect(() => {
//     const web3 = new Web3(
//       "https://mainnet.infura.io/v3/320147bac521449188ac7347ba389fb5"
//     );
//     // Replace <YOUR_INFURA_PROJECT_ID> with your Infura project ID
//     console.log(web3, "web");
//     const fetchRecentList = async () => {
//       try {
//         let result;
//         if (type === "transactions") {
//           result = await web3.eth.getBlock("latest");
//         } else if (type === "blocks") {
//           result = await web3.eth.getPastLogs({
//             fromBlock: 0,
//             toBlock: "latest",
//             topics: [],
//           });
//         }
//         setRecentList(result);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchRecentList();
//   }, [type]);

//   return (
//     <div className="recent-list">
//       <h2>Recent {type}</h2>
//       <ul>
//         {recentList?.map((item) => (
//           <li key={item.hash}>{item.hash}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default RecentList;

// import React, { useState, useEffect } from "react";
// import "./RecentList.css";
// import Web3 from "web3";

// function RecentList({ type }) {
//   const [recentList, setRecentList] = useState([]);

//   useEffect(() => {
//     const web3 = new Web3(
//       "https://mainnet.infura.io/v3/320147bac521449188ac7347ba389fb5"
//     );
//     const batchSize = 1000;
//     const startBlock = 0;
//     const endBlock = "latest";

//     let batch = new web3.BatchRequest();

//     const fetchRecentList = async (batchStart, batchEnd) => {
//       try {
//         let result;
//         if (type === "transactions") {
//           result = await web3.eth.getBlockRange(batchStart, batchEnd, true);
//         } else if (type === "blocks") {
//           result = await web3.eth.getPastLogs({
//             fromBlock: batchStart,
//             toBlock: batchEnd,
//             topics: [],
//           });
//         }
//         setRecentList((prevList) => [...prevList, ...result]);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     for (let i = startBlock; i <= endBlock; i += batchSize) {
//       let batchStart = i;
//       let batchEnd = Math.min(i + batchSize - 1, endBlock);

//       let request = web3.eth.getBlockRange.request(
//         batchStart,
//         batchEnd,
//         true,
//         (error, result) => {
//           if (error) {
//             console.error(error);
//             return;
//           }

//           fetchRecentList(batchStart, batchEnd);
//         }
//       );

//       batch.add(request);
//     }

//     batch.execute();
//   }, [type]);

//   return (
//     <div className="recent-list">
//       <h2>Recent {type}</h2>
//       <ul>
//         {recentList?.map((item) => (
//           <li key={item.hash}>{item.hash}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default RecentList;


// import React, { useState, useEffect } from "react";
// import "./RecentList.css";
// import { ethers } from "ethers";

// function RecentList({ type }) {
//   const [recentList, setRecentList] = useState([]);

//   useEffect(() => {
//     const provider = new ethers.providers.JsonRpcProvider(
//       "https://mainnet.infura.io/v3/320147bac521449188ac7347ba389fb5"
//     );
//     const batchSize = 1000;
//     const startBlock = 0;
//     const endBlock = "latest";

//     const fetchRecentList = async (batchStart, batchEnd) => {
//       try {
//         let result;
//         if (type === "transactions") {
//           result = await provider.getLogs({
//             fromBlock: batchStart,
//             toBlock: batchEnd,
//           });
//         } else if (type === "blocks") {
//           const blocks = [];
//           for (let i = batchStart; i <= batchEnd; i++) {
//             const block = await provider.getBlock(i);
//             blocks.push(block);
//           }
//           result = blocks;
//         }
//         setRecentList((prevList) => [...prevList, ...result]);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     for (let i = startBlock; i <= endBlock; i += batchSize) {
//       let batchStart = i;
//       let batchEnd = Math.min(i + batchSize - 1, endBlock);

//       fetchRecentList(batchStart, batchEnd);
//     }
//   }, [type]);

//   return (
//     <div className="recent-list">
//       <h2>Recent {type}</h2>
//       <ul>
//         {recentList?.map((item) => (
//           <li key={item.hash}>{item.hash}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default RecentList;


import React, { useState, useEffect } from "react";
import "./RecentList.css";
import { ethers } from "ethers";

function RecentList({ type }) {
  const [recentList, setRecentList] = useState([]);

  useEffect(() => {
    const provider = new ethers.providers.InfuraProvider(
      "mainnet",
      "320147bac521449188ac7347ba389fb5"
    );

    const batchSize = 1000;
    const startBlock = 0;
    const endBlock = "latest";

    const fetchRecentList = async (batchStart, batchEnd) => {
      try {
        let result;
        if (type === "transactions") {
          result = await provider.getBlockWithTransactions(batchStart);
        } else if (type === "blocks") {
          result = await provider.getLogs({
            fromBlock: batchStart,
            toBlock: batchEnd,
          });
        }
        setRecentList((prevList) => [...prevList, ...result]);
      } catch (error) {
        console.error(error);
      }
    };

    for (let i = startBlock; i <= endBlock; i += batchSize) {
      let batchStart = i;
      let batchEnd = Math.min(i + batchSize - 1, endBlock);

      fetchRecentList(batchStart, batchEnd);
    }
  }, [type]);

  return (
    <div className="recent-list">
      <h2>Recent {type}</h2>
      <ul>
        {recentList?.map((item) => (
          <li key={item.hash}>{item.hash}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecentList;
