import React, { useEffect, useState } from "react";
import BasicCard from "./Card";
// import { formatUnits } from "ethers/lib/utils";
import { getWalletData } from "./GetWalletData";
import FullWidthTabs from "./Tabs";
import {
  formatTransactionDetails,
  getTransactionDetails,
} from "./transactionDetails/Transaction-utils";
import TransactionDetailsUI from "./transactionDetails/TransactionDetailsUI";

import { getNetworkFromAddress } from "./getNetworkFromAddress";
// assuming the getWalletData function is exported from a separate file
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";
import { CircularProgress, Grid, TextField } from "@mui/material";
import MediaCard from "./emptyCard/EmptyCard";
import "./mainBodystyle.css";
import Body from "./body/Body";
const override = css`
  display: block;
  margin: 0 auto;
`;

function AllWalletDetails() {
  const [address, setAddress] = useState("");
  const [transactionAddress, setTransactionAddress] = useState(false);
  const [network, setNetwork] = useState(null);
  const [walletData, setWalletData] = useState(null);
  const [allTransaction, setAllTransaction] = useState();
  const [moreAddress, setMoreAddress] = useState([]);
  const [isWalletAddr, setIsWalletAddr] = useState(true);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inProgress, setInProgress] = useState(false);
  function Loader() {
    if (walletData?.allTransaction?.length > 0) {
      setLoading(true);
    } else {
      setLoading(false);
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

  // const handleNetworkChange = (event) => {
  //   setNetwork(event.target.value);
  // };
  const handleNetworkChange = async (event) => {
    // event.preventDefault();
    const networks = await getNetworkFromAddress(address);
    console.log(networks, "networks");
    setNetwork(networks);
  };
  const handleGetDetails = async () => {
    try {
      if (address?.length > 42) {
        setInProgress(true);
        // console.log("called1");
        const networkName = await getNetworkFromAddress(address);
        console.log(networkName, "network");
        // setLoading(true);
        setTransactionAddress(true);
        setIsWalletAddr(false);
        // alert("Please enter correct wallet address");
        const TransactionResult = await getTransactionDetails(
          address,
          networkName
        );
        const formattedDetails = formatTransactionDetails(TransactionResult);
        setDetails(formattedDetails);
        setLoading(false);
        setInProgress(false);
        // setLoading(false);
      } else if (address?.length < 50) {
        // setLoading(true);
        //
        setInProgress(true);
        const networkName = await getNetworkFromAddress(address);
        console.log(networkName, "network");
        setTransactionAddress(false);
        setIsWalletAddr(true);
        // console.log("called2");
        const data = await getWalletData(address, networkName);
        // console.log(
        //   data?.allTransaction?.length,
        //   data?.allTransaction,
        //   data,
        //   "transaction"
        // );
        if (
          data?.allTransaction?.length > 0 &&
          data?.allTransaction !== "Error! Invalid address format"
        ) {
          setWalletData(data);
          setAllTransaction(data?.allTransaction);
          setLoading(false);
          setInProgress(false);
        }
        // setIsWalletAddr(true)
        // setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // if(address.length>42){
    //   setIsWalletAddr(false)
    // }
    // else if(address?.length<50){
    //   setIsWalletAddr(true)

    // }

    handleNetworkChange();
    if (network) {
      handleGetDetails();
    }

    // Loader()
  }, [address]);

  console.log(inProgress, "inProgress");
  return (
    <div>
      {/* <label>
        Wallet address:{" "}
        <input type="text" value={address} onChange={handleAddressChange} />
      </label> */}
      <div className="container">
        <div className="main">
          <h1>The All Network Explorer</h1>
          <span>
            <TextField
              style={{ width: "60%", marginTop: "2%" }}
              fullWidth
              variant="outlined"
              label="Search transactions, addresses, or blocks..."
              name="address"
              onChange={handleAddressChange}
            />
            <p style={{ fontSize: "15px", fontWeight: "bold" }}>
              Featured: Build Precise & Reliable Apps with AllScan APIs. Learn
              More!
              <span style={{ color: "green", fontWeight: "bold" }}>
                (Coming soon)
              </span>
            </p>
          </span>
        </div>
      </div>
      {/* <br /> */}
      {/* <label>
        Network:{" "}
        <select value={network} onChange={handleNetworkChange}>
          <option value="ethereum">Ethereum</option>
          <option value="polygon">Polygon</option>
          <option value="arbitrum">Arbitrum</option>
          <option value="bsc">BSC</option>
        </select>
      </label> */}
      {/* <br /> */}
      {/* <button onClick={handleGetDetails}>Get details</button> */}
      {/* <hr /> */}

      {/* {walletData ? ( */}

      {/* {!walletData || !allTransaction || !details ? <Body /> : null} */}

      {loading ? (
        <Body />
      ) : inProgress ? (
        <CircularProgress color="inherit" />
      ) : walletData && isWalletAddr && allTransaction.length > 0 ? (
        <>
          {/* <div
            style={{
              width: "90%",
              margin: "auto",
              display: "flex",
              justifyContent: "space-between",
            }}
          > */}
          <Grid container spacing={2} sx={{ width: "90%", margin: "auto" }}>
            {walletData && (
              <Grid item xs={12} md={4}>
                <BasicCard
                  balance={walletData?.balance}
                  balanceInEther={walletData?.balanceInEther}
                  network={network}
                />
              </Grid>
            )}
            {walletData && (
              <Grid item xs={12} md={4}>
                <BasicCard
                  lastTxn={walletData?.lastTx.hash}
                  lastTxnBlockNumber={walletData?.lastTx.blockNumber}
                  lastTxnTime={walletData?.lastTx.timeStamp}
                  firstTxn={walletData?.firstTx.hash}
                  firstTxnBlockNumber={walletData?.firstTx.blockNumber}
                  firstTxnTime={walletData?.firstTx.timeStamp}
                />
              </Grid>
            )}
            {walletData && (
              <Grid item xs={12} md={4}>
                <BasicCard moreAddress={moreAddress} />
              </Grid>
            )}
            {/* </div> */}
          </Grid>
          {allTransaction && !loading && (
            <FullWidthTabs data={allTransaction ? allTransaction : []} />
          )}
        </>
      ) : details && transactionAddress ? (
        <div>
          <>
            <TransactionDetailsUI data={details} />
          </>
        </div>
      ) : (
        <div style={{ width: "30%", margin: "auto" }}>
          <MediaCard />
        </div>
      )}
    </div>
  );
}
export { AllWalletDetails };
