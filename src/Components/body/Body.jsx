import { Divider, Grid, Paper, TextField } from "@mui/material";
import React from "react";
import "./bodyStyle.css";
import { FaEthereum } from "react-icons/fa";
import { FcGlobe } from "react-icons/fc";
import ChartComponent from "../charts/ChartComponents";
import GasAndEthPrice from "./GasTracker";
import { useSelector } from "react-redux";
function Body() {
  const ethereumPrice=useSelector((state)=>state?.allscan?.ethereumPrice)

  return (

    <>
    
    <Paper sx={{ width: "80%", margin: "-35px auto 0px" }} elevation={6}>
      <Grid sx={{ textAlign: "left", marginLeft: "1%" }} container spacing={2}>
        <Grid item xs={12} md={3}>
          <span style={{ display: "flex" }}>
            <span
              style={{
                fontSize: "90px",
              }}
            >
              <FaEthereum />
            </span>
            <span>
              <p
                style={{ fontSize: "15px", color: "green", fontWeight: "bold" }}
              >
                {/* <span style={{ marginRight: "1%" }}>
              <FaEthereum />
            </span> */}
                ETHER PRICE
              </p>
              <p>
                ${ethereumPrice} 
                <span style={{ color: "red" }}>(-3.24%)</span>
              </p>
            </span>
          </span>
          <div style={{ border: "0.3px dotted grey" }}></div>
        </Grid>

        {/* <Divider variant="midle" orientation="vertical" /> */}
        <Divider orientation="vertical" variant="middle" flexItem />
        <Grid item xs={12} md={3}>
          <span style={{ display: "flex" }}>
            <span
              style={{
                fontSize: "90px",
              }}
            >
              <FaEthereum />
            </span>
            <span>
              <p
                style={{ fontSize: "15px", color: "green", fontWeight: "bold" }}
              >
                {/* <span style={{ marginRight: "1%" }}>
              <FaEthereum />
            </span> */}
                BNB PRICE
              </p>
              <p>
                $1,738.46 @0.06287 btc{" "}
                <span style={{ color: "red" }}>(-3.24%)</span>
              </p>
            </span>
          </span>
          <div style={{ border: "1px dotted grey" }}></div>
        </Grid>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Grid item xs={12} md={4}>
          <ChartComponent />
        </Grid>

        {/* </Grid> */}
        {/* <Divider variant="middle" /> */}
        {/* <Grid container spacing={2}> */}
        <Grid item xs={12} md={3}>
          <span>
            <p>MARKET CAP</p>
            $217,391,551,443
          </span>
        </Grid>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Grid item xs={12} md={3} sx={{ paddingBottom: "1em" }}>
          <span>
            <p>LATEST L1 BATCH</p>
            $217,391,551,443
          </span>
        </Grid>
        <Divider orientation="vertical" variant="middle" flexItem />
      </Grid>
    </Paper>
<div style={{width:"80%",margin:"auto"}}>

    <GasAndEthPrice/>
</div>
    </>
  );
}

export default Body;
