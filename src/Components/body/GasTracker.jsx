// import { Paper } from "@mui/material";
// import React, { useState, useEffect } from "react";

// function GasAndEthPrice() {
//   const [gasPrice, setGasPrice] = useState(0);
//   const [ethPrice, setEthPrice] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const gasUrl =
//           "https://api.etherscan.io/api?module=gastracker&action=gasoracle";
//         const gasResponse = await fetch(gasUrl);
//         const gasData = await gasResponse.json();
//         const gasPrice = parseInt(gasData.result.SafeGasPrice) / 10 ** 9;
//         setGasPrice(gasPrice);

//         const ethUrl =
//           "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";
//         const ethResponse = await fetch(ethUrl);
//         const ethData = await ethResponse.json();
//         const ethPrice = ethData.ethereum.usd;
//         setEthPrice(ethPrice);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//     const interval = setInterval(() => {
//       fetchData();
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <Paper>
//       <p>Gas price in gwei: {gasPrice}</p>
//       <p>ETH price in USD: {ethPrice}</p>
//     </Paper>
//   );
// }

// export default GasAndEthPrice;

import { Grid, Paper } from "@mui/material";
import React, { useState, useEffect } from "react";
import {BsFuelPumpFill} from "react-icons/bs"
import { FaEthereum } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { getEthereumPrice } from "../redux/action";

function GasAndEthPrice() {
  const [gasPrice, setGasPrice] = useState(0);
  const [ethPrice, setEthPrice] = useState(0);
  const [gasPercentage, setGasPercentage] = useState("");
  const [ethPercentage, setEthPercentage] = useState("");
const dispatch=useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const gasUrl =
          "https://api.etherscan.io/api?module=gastracker&action=gasoracle";
        const gasResponse = await fetch(gasUrl);
        const gasData = await gasResponse.json();
        const gasPrice = parseInt(gasData.result.SafeGasPrice) ;
        setGasPercentage(calculatePercentageChange(gasPrice, gasPercentage));
        setGasPrice(gasPrice);

        const ethUrl =
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";
        const ethResponse = await fetch(ethUrl);
        const ethData = await ethResponse.json();
        const ethPrice = ethData.ethereum.usd;
        setEthPercentage(calculatePercentageChange(ethPrice, ethPercentage));
        setEthPrice(ethPrice);
        dispatch(getEthereumPrice(ethPrice))
      } catch (error) {
        console.error(error);
      }
    };

    const calculatePercentageChange = (newValue, previousValue) => {
      if (previousValue === "") {
        return "";
      }
      const change = ((newValue - previousValue) / previousValue) * 100;
      return change > 0
        ? `+${change.toFixed(2)}%`
        : `${change.toFixed(2)}%`;
    };

    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, [gasPercentage, ethPercentage]);
console.log(gasPercentage,ethPercentage,"percentage")
  return (
    <Paper 
    // sx={{width:"80%",margin:"auto",marginTop:"2em"}} 
    sx={{marginTop:"2.5em"}}
    elevation={10}>
        <Grid container spacing={2}>
<Grid item xs={6} md={6}>

      <p>
      <span style={{marginRight:"1em",marginLeft:"2em"}}>
            <BsFuelPumpFill/>
        </span>
        <span style={{fontWeight:"bold"}}>
        Gas price :{" "}

        </span>
       
        <span style={{ color: gasPercentage.startsWith("+") ? "green" : "red" }}>
          {!gasPrice?"Fetching...":gasPrice}Gwei
        </span>{" "}
        {gasPercentage}
      </p>
</Grid>
<Grid item xs={6} md={6}>

      <p>
        <span style={{marginRight:"1em"}}>
            <FaEthereum/>
        </span>
        <span style={{fontWeight:"bold"}}>
        ETH price in USD:{" "}

        </span>
        <span style={{ color: ethPercentage.startsWith("+") ? "green" : "red" }}>
          ${ethPrice}
        </span>{" "}
        {ethPercentage}
      </p>
</Grid>
        </Grid>
    </Paper>
  );
}

export default GasAndEthPrice;
