import React, { useEffect, useState } from "react";
import BasicCard from "./Card";
// import { formatUnits } from "ethers/lib/utils";
import { getWalletData } from "./GetWalletData";
import FullWidthTabs from "./Tabs";
import { formatTransactionDetails, getTransactionDetails } from "./transactionDetails/Transaction-utils";
import TransactionDetailsUI from "./transactionDetails/TransactionDetailsUI";
// assuming the getWalletData function is exported from a separate file
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";



const override = css`
  display: block;
  margin: 0 auto;
`;

function AllWalletDetails() {
  const [address, setAddress] = useState("");
  const [transactionAddress, setTransactionAddress] = useState("");
  const [network, setNetwork] = useState("ethereum");
  const [walletData, setWalletData] = useState(null);
  const [allTransaction, setAllTransaction] = useState();
  const [moreAddress, setMoreAddress] = useState([]);
  const [isWalletAddr, setIsWalletAddr] = useState(true);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

console.log(details,isWalletAddr,address.length,allTransaction,"details")
function Loader(){

  if(walletData?.allTransaction?.length>0){
  setLoading(true)
  }else{
    setLoading(false)
  }
}
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
    // if(address?.length>42){
    //   setTransactionAddress("event.target.value")
    // }else if(address?.length===42){
    //   setIsWalletAddr(true)
    // }else{
    //   alert("Address is neither wallet address nor transaction hash")
    // }

  };

  const handleNetworkChange = (event) => {
    setNetwork(event.target.value);
  };

  const handleGetDetails = async () => {
    try {
      if (address?.length > 42) {
        setLoading(true);

        // alert("Please enter correct wallet address");
        const TransactionResult = await getTransactionDetails(address, network);
        const formattedDetails = formatTransactionDetails(TransactionResult);
        setDetails(formattedDetails);
      setLoading(false);

        
      } 
      
      else if(address?.length <50) {
      // setLoading(true);
// 
        const data = await getWalletData(address, network);
        setWalletData(data);
        setAllTransaction(data?.allTransaction)
        // setIsWalletAddr(true)
        // setLoading(false);

      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(walletData);

  useEffect(()=>{
    
// if(address.length>42){
//   setIsWalletAddr(false)
// }
// else if(address?.length<50){
//   setIsWalletAddr(true)

// }
handleGetDetails()
// Loader()
  },[address])
  console.log(walletData,walletData?.allTransaction,loading,"loading")
  return (
    <div>
      <label>
        Wallet address:{" "}
        <input type="text" value={address} onChange={handleAddressChange} />
      </label>
      <br />
      <label>
        Network:{" "}
        <select value={network} onChange={handleNetworkChange}>
          <option value="ethereum">Ethereum</option>
          <option value="polygon">Polygon</option>
          <option value="arbitrum">Arbitrum</option>
          <option value="bsc">BSC</option>
        </select>
      </label>
      <br />
      <button onClick={handleGetDetails}>Get details</button>
      <hr />
      {/* {walletData && (
        <div>
          <p>Balance: {walletData.balanceInEther} ETH</p>
          <p>Last transaction:</p>
          <ul>
            <li>Hash: {walletData.lastTx.hash}</li>
            <li>From: {walletData.lastTx.from}</li>
            <li>To: {walletData.lastTx.to}</li>
            <li>Value: {walletData.lastTx.value / 10 ** 18} ETH</li>
            <li>Timestamp: {walletData.lastTx.timestamp}</li>
            <li>Gas used: {walletData.lastTx.gasUsed}</li>
            <li>Gas price: {walletData.lastTx.gasPrice} Gwei</li>
            <li>Fee: {walletData.lastTx.fee / 10 ** 18} ETH</li>
          </ul>
          <p>First transaction:</p>
          <ul>
            <li>Hash: {walletData.firstTx.hash}</li>
            <li>From: {walletData.firstTx.from}</li>
            <li>To: {walletData.firstTx.to}</li>
            <li>Value: {walletData.firstTx.value / 10 ** 18} ETH</li>
            <li>Timestamp: {walletData.firstTx.timestamp}</li>
            <li>Gas used: {walletData.firstTx.gasUsed}</li>
            <li>Gas price: {walletData.firstTx.gasPrice} Gwei</li>
            <li>Fee: {walletData.firstTx.fee / 10 ** 18} ETH</li>
          </ul>
        </div>
      )} */}
      {isWalletAddr && walletData ?

        <>

          <div
            style={{
              width: "90%",
              margin: "auto",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {walletData &&  (
              <BasicCard
                balance={walletData?.balance}
                balanceInEther={walletData?.balanceInEther}
                network={network}
              />
              // <div>
              //   <p>
              //     Balance: {balance} wei ({balanceInEther} ether)
              //   </p>
              // </div>
            )}
            {walletData && (
              // <div>
              //   <p>Last Transaction:</p>
              //   <ul>
              //     <li>Hash: {lastTx.hash}</li>
              //     <li>Block Number: {lastTx.blockNumber}</li>
              //     <li>
              //       Value: {lastTx.value} wei ({lastTx.value / 10 ** 18} ether)
              //     </li>
              //     <li>Timestamp: {formatDate(lastTx.timeStamp)}</li>
              //   </ul>
              // </div>

              <BasicCard
                lastTxn={walletData?.lastTx.hash}
                lastTxnBlockNumber={walletData?.lastTx.blockNumber}
                lastTxnTime={walletData?.lastTx.timeStamp}
                firstTxn={walletData?.firstTx.hash}
                firstTxnBlockNumber={walletData?.firstTx.blockNumber}
                firstTxnTime={walletData?.firstTx.timeStamp}
              />
            )}
            {walletData && (
              // <div>
              //   <p>First Transaction:</p>
              //   <ul>
              //     <li>Hash: {firstTx.hash}</li>
              //     <li>Block Number: {firstTx.blockNumber}</li>
              //     <li>
              //       Value: {firstTx.value} wei ({firstTx.value / 10 ** 18} ether)
              //     </li>
              //     <li>Timestamp: {formatDate(firstTx.timeStamp)}</li>
              //   </ul>
              // </div>
              <BasicCard moreAddress={moreAddress} />
            )}
          </div>
          {/* {loading ?  
      <PulseLoader color={"#007bff"} loading={loading} css={override} />
:
} */}
<FullWidthTabs network={network} address={address}   />
        </> :
! isWalletAddr?        
        // <div>
        <>
        
        <TransactionDetailsUI data={details} />
        </>

        // </div>
        :<div>"We are working on Contract/Token Address part"</div>
      }

{/* <TransactionDetailsUI data={details} /> */}

    </div>
  );
}
export { AllWalletDetails };
