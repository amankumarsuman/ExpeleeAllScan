// import { Grid, Paper } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import {BsFuelPumpFill} from "react-icons/bs"
// import { FaEthereum } from "react-icons/fa";
// import { SiBinance } from "react-icons/si";
// import { AiOutlineThunderbolt } from "react-icons/ai";
// import { useDispatch } from "react-redux";
// import { getEthereumPrice } from "../redux/action";

// function GasAndEthPrice() {
//   const [gasPrice, setGasPrice] = useState(0);
//   const [ethPrice, setEthPrice] = useState(0);
//   const [bscPrice, setBscPrice] = useState(0);
//   const [arbPrice, setArbPrice] = useState(0);
//   const [gasPercentage, setGasPercentage] = useState("");
//   const [ethPercentage, setEthPercentage] = useState("");
//   const [bscPercentage, setBscPercentage] = useState("");
//   const [arbPercentage, setArbPercentage] = useState("");
//   const dispatch=useDispatch()

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch gas prices for Ethereum
//         const ethGasUrl =
//           "https://api.etherscan.io/api?module=gastracker&action=gasoracle";
//         const ethGasResponse = await fetch(ethGasUrl);
//         const ethGasData = await ethGasResponse.json();
//         const ethGasPrice = parseInt(ethGasData.result.SafeGasPrice);
//         setGasPercentage(calculatePercentageChange(ethGasPrice, gasPrice));
//         setGasPrice(ethGasPrice);

//         // Fetch price of Ethereum
//         const ethUrl =
//           "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";
//         const ethResponse = await fetch(ethUrl);
//         const ethData = await ethResponse.json();
//         const ethPrice = ethData.ethereum.usd;
//         setEthPercentage(calculatePercentageChange(ethPrice, ethPrice));
//         setEthPrice(ethPrice);
//         dispatch(getEthereumPrice(ethPrice));

//         // Fetch gas prices for Binance Smart Chain
//         const bscGasUrl =
//           "https://bscscan.com/api/gasoracle?module=gastracker&action=gasoracle";
//         const bscGasResponse = await fetch(bscGasUrl);
//         const bscGasData = await bscGasResponse.json();
//         const bscGasPrice = parseInt(bscGasData.SafeGasPrice);
//         setBscPercentage(calculatePercentageChange(bscGasPrice, bscPrice));
//         setBscPrice(bscGasPrice);

//         // Fetch price of Binance Smart Chain
//         const bscUrl =
//           "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd";
//         const bscResponse = await fetch(bscUrl);
//         const bscData = await bscResponse.json();
//         const bscPrice = bscData.binancecoin.usd;

//         // Fetch gas prices for Arbitrum
//         const arbGasUrl =
//           "https://api.thegraph.com/index-node/graphql";
//         const arbGasQuery = `{
//             _meta {
//               block {
//                 number
//               }
//             }
//             gasPriceOracle {
//               id
//               standardGasPrice
//             }
//           }`;
//         const arbGasResponse = await fetch(arbGasUrl, {
//           method:


import { Grid, Paper } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { BsFuelPumpFill } from "react-icons/bs"
import { FaEthereum } from "react-icons/fa";
// import { SiPolygon } from "react-icons/si";
import { useDispatch } from "react-redux";
// import { getArbitrumPrice, getBscPrice, getEthereumPrice } from "../redux/action";
// import "./allnetworkprice.css"
import "./allNetworkPriceAnimated.css"
function GasAndEthPriceOfAllNetwork() {
    const [gasPrice, setGasPrice] = useState(0);
    const [ethPrice, setEthPrice] = useState(0);
    const [bscPrice, setBscPrice] = useState(0);
    const [arbitrumPrice, setArbitrumPrice] = useState(0);
    const [maticPrice, setMaticPrice] = useState(0);
    const [gasPercentage, setGasPercentage] = useState("");
    const [ethPercentage, setEthPercentage] = useState("");
    const [bscPercentage, setBscPercentage] = useState("");
    const [arbitrumPercentage, setArbitrumPercentage] = useState("");
    
    const [maticPercentage, setMaticPercentage] = useState("");
    const dispatch = useDispatch()

    useEffect(() => {

/*

        async function fetchData() {
            const tokens = {
              ETH: 'ethereum',
              BSC: 'binancecoin',
              ARB: 'arbitrum',
              MATIC: 'matic-network',
              SOL: 'solana'
            };
            
            const api_key = '82b5a6de-fcc3-409a-8c3d-6a6f0d00cc6d'; // Replace with your API key
            
            try {
              // Fetch ETH price data
              const ethResponse = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=ETH&convert=USD&CMC_PRO_API_KEY=${api_key}`);
              const ethData = await ethResponse.json();
              const ethPrice = ethData.data.ETH.quote.USD.price.toFixed(2);
              setEthPercentage(calculatePercentageChange(ethPrice, ethPercentage));
                              setEthPrice(ethPrice);
              // Fetch BSC price data
              const bscResponse = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${tokens.BSC}&convert=USD&CMC_PRO_API_KEY=${api_key}`);
              const bscData = await bscResponse.json();
              const bscPrice = bscData.data[tokens.BSC].quote.USD.price.toFixed(2);
            
        
              setBscPercentage(calculatePercentageChange(bscPrice, bscPercentage));
                        setBscPrice(bscPrice);
              // Fetch ARB price data
              const arbResponse = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${tokens.ARB}&convert=USD&CMC_PRO_API_KEY=${api_key}`);
              const arbData = await arbResponse.json();
              const arbPrice = arbData.data[tokens.ARB].quote.USD.price.toFixed(2);
          
               setArbitrumPrice(arbitrumPrice);
                          setArbitrumPercentage(
                             calculatePercentageChange(arbitrumPrice, arbitrumPercentage)
                           );
        
              // Fetch MATIC price data
              const maticResponse = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${tokens.MATIC}&convert=USD&CMC_PRO_API_KEY=${api_key}`);
              const maticData = await maticResponse.json();
              const maticPrice = maticData.data[tokens.MATIC].quote.USD.price.toFixed(2);
            
        
              setMaticPercentage(calculatePercentageChange(maticPrice, maticPercentage));
              setMaticPrice(maticPrice);
              // Fetch SOL price data
              const solResponse = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${tokens.SOL}&convert=USD&CMC_PRO_API_KEY=${api_key}`);
              const solData = await solResponse.json();
              const solPrice = solData.data[tokens.SOL].quote.USD.price.toFixed(2);
            setSolanaPrice(solPrice);
              // Update price elements in DOM
           
            } catch (error) {
              console.log(error);
            }
          }
          

*/




        const fetchData = async () => {
            try {
                const gasUrl =
                    "https://api.etherscan.io/api?module=gastracker&action=gasoracle";
                const gasResponse = await fetch(gasUrl);
                const gasData = await gasResponse.json();
                const gasPrice = parseInt(gasData.result.SafeGasPrice);
                setGasPercentage(calculatePercentageChange(gasPrice, gasPercentage));
                setGasPrice(gasPrice);

                const ethUrl =
                    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";
                const ethResponse = await fetch(ethUrl);
                const ethData = await ethResponse.json();
                const ethPrice = ethData.ethereum.usd;
                setEthPercentage(calculatePercentageChange(ethPrice, ethPercentage));
                setEthPrice(ethPrice);
                // dispatch(getEthereumPrice(ethPrice));

                const bscUrl =
                    "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd";
                const bscResponse = await fetch(bscUrl);
                const bscData = await bscResponse.json();
                const bscPrice = bscData.binancecoin.usd;
                setBscPercentage(calculatePercentageChange(bscPrice, bscPercentage));
                setBscPrice(bscPrice);
                // dispatch(getBscPrice(bscPrice));

                // const arbitrumUrl =
                //     "https://api.coingecko.com/api/v3/simple/price?ids=arbitrum&vs_currencies=usd";
                // const arbitrumResponse = await fetch(arbitrumUrl);
                // const arbitrumData = await arbitrumResponse.json();
                // console.log(arbitrumData,"arbidata")
                // // const arbitrumPrice = arbitrumData.arbitrum.usd;

                // const arbitrumPrice = arbitrumData.arbitrum && arbitrumData.arbitrum.usd;
                // if (isNaN(arbitrumPrice)) {
                //   setArbitrumPrice(0);
                // } else {
                //   setArbitrumPrice(arbitrumPrice);
                //   setArbitrumPercentage(
                //     calculatePercentageChange(arbitrumPrice, arbitrumPercentage)
                //   );
                // }
                
                const maticUrl =
                "https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd";
              const maticResponse = await fetch(maticUrl);
              const maticData = await maticResponse.json();
              const maticPrice = maticData["matic-network"].usd;
              setMaticPercentage(calculatePercentageChange(maticPrice, maticPercentage));
              setMaticPrice(maticPrice);



              
const ARBITRUM_API_KEY = 'C2IEDITCYBW6YPG5CX32P8MGE8UKU48PVA';
const ARBITRUM_API_URL = 'https://api.arbiscan.io/api';

// async function getArbitrumValue() {
//   try {
    const response = await axios.get(`${ARBITRUM_API_URL}/stats?apikey=${ARBITRUM_API_KEY}`);
    const arbitrumValue = response.data.data.price;
    console.log(arbitrumValue,"arbitrumValue")
    setArbitrumPrice(arbitrumValue);
    setArbitrumPercentage(
      calculatePercentageChange(arbitrumPrice, arbitrumPercentage))
//   } catch (error) {
//     console.error(error);
//   }
// }
                // setArbitrumPercentage(
                //     calculatePercentageChange(arbitrumPrice, arbitrumPercentage)
                // );
                // setArbitrumPrice(arbitrumPrice);
                // dispatch(getArbitrumPrice(arbitrumPrice));
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
                : `${change.toFixed(2
                )}%`;
        };
        fetchData();
        const interval = setInterval(() => {
            fetchData();
        }, 60000);

        return () => clearInterval(interval);
    }, [dispatch, gasPercentage, ethPercentage, bscPercentage, arbitrumPercentage]);

    return (

    <>
    <div className="gas-and-eth-price">
  <Grid container spacing={2}>
    {/* <Grid item xs={12} sm={6} md={3}>
      <Paper elevation={2} className="gas-price">
        <div className="gas-price-header">
          <BsFuelPumpFill className="gas-icon" />
          <span>Gas Price</span>
        </div>
        <div className="gas-price-body">
          <div className="price">
         {gasPrice !== 0 ? `${gasPrice / 10} Gwei` : "-"}          
          </div>
          <div className={`percentage ${gasPercentage?.includes("+") ? "positive" : "negative"}`}>
            {gasPercentage}
          </div>
        </div>
      </Paper>
    </Grid> */}
    <Grid item xs={12} sm={6} md={3}>
      <Paper elevation={2} className="eth-price">
        <div className="eth-price-header">
          <FaEthereum className="eth-icon" />
          <span>Ethereum Price</span>
        </div>
        <div className="eth-price-body">
          <div className="price">
          {ethPrice !== 0 ? `$${Number(ethPrice).toFixed(2)}` : "$1813.54"}

          </div>
          <div className={`percentage ${ethPercentage?.includes("+") ? "positive" : "negative"}`}>
            {ethPercentage}
          </div>
        </div>
      </Paper>
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <Paper elevation={2} className="bsc-price">
        <div className="bsc-price-header">
          <FaEthereum className="bsc-icon" />
          <span>BSC Price</span>
        </div>
        <div className="bsc-price-body">
          <div className="price">
          {bscPrice !== 0 ? `$${Number(bscPrice).toFixed(2)}` : "$337.82"}

          </div>
          <div className={`percentage ${bscPercentage?.includes("+") ? "positive" : "negative"}`}>
            {bscPercentage}
          </div>
        </div>
      </Paper>
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <Paper elevation={2} className="arbitrum-price">
        <div className="arbitrum-price-header">
          <FaEthereum className="arbitrum-icon" />
          <span>Arbitrum Price</span>
        </div>
        <div className="arbitrum-price-body">
          <div className="price">
          {arbitrumPrice !== 0 ? `$${Number(arbitrumPrice).toFixed(2)}` : "Fetching Latest Price..."}

          </div>
          <div className={`percentage ${arbitrumPercentage?.includes("+") ? "positive" : "negative"}`}>
            {arbitrumPercentage}
          </div>
        </div>
      </Paper>
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <Paper elevation={2} className="arbitrum-price">
        <div className="arbitrum-price-header">
          <FaEthereum className="arbitrum-icon" />
          <span>Matic Price</span>
        </div>
        <div className="arbitrum-price-body">
          <div className="price">
          {maticPrice !== 0 ? `$${Number(maticPrice).toFixed(2)}` : "$1.16"}

          </div>
          <div className={`percentage ${maticPercentage?.includes("+") ? "positive" : "negative"}`}>
            {maticPercentage}
          </div>
        </div>
      </Paper>
    </Grid>
  </Grid>
</div>


</>
);
}

export default GasAndEthPriceOfAllNetwork;





