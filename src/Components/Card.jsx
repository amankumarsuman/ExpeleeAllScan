import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FullWidthTabs from "./Tabs";
import { useSelector } from "react-redux";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function BasicCard(props) {
  const ethereumPrice=useSelector((state)=>state?.allscan?.ethereumPrice)
  console.log(props, "props");
  return (
    <>
      <Card sx={{ marginTop: "2em", minHeight: 280, marginBottom: "2em" }}>
        <CardContent sx={{ textAlign: "left" }}>
          <Typography
            sx={{ fontSize: 14, textAlign: "left" }}
            color="text.secondary"
            gutterBottom
          >
            <span style={{ fontWeight: "bold" }}>
              {props?.balance
                ? "Overview"
                : props?.lastTxn
                ? "More Info"
                : "Multi Chain"}
            </span>
          </Typography>
          <Typography component="div">
            {props?.network === "Ethereum"
              ? "ETH BALANCE"
              : props?.network === "polygon"
              ? "MATIC BALANCE"
              : props?.network === "bsc"
              ? "BNB BALANCE"
              : props?.network === "arbitrum"
              ? "ETH BALANCE"
              : props?.lastTxn
              ? "PRIVATE NAME TAGS"
              : "MULTICHAIN ADDRESS"}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props?.balance ? (
              `${props.balanceInEther} ${
                props?.network === "Ethereum"
                  ? "ETH"
                  : props?.network === "polygon"
                  ? "MATIC"
                  : props?.network === "bsc"
                  ? "BNB"
                  : props?.network === "arbitrum"
                  ? "ETH"
                  : "ETH"
              }`
            ) : props?.lastTxn ? (
              <div
                style={{
                  border: "1px dotted grey",
                  borderRadius: "20px",
                  width: "60px",
                  textAlign: "center",
                }}
              >
                Add
              </div>
            ) : (
              <div>
                2 Addresses found via Allscan{" "}
                <span style={{ color: "green" }}>(Powered By Expelee)</span>
              </div>
            )}
          </Typography>
          <Typography variant="body2">
            {/* well meaning and kindly.
          <br />
          {'"a benevolent smile"'} */}
            {props?.balance && props?.network === "Ethereum"
              ? "ETH VALUE"
              : props?.network === "polygon"
              ? "MATIC VALUE"
              : props?.network === "bsc"
              ? "BNB VALUE"
              : props?.network === "arbitrum"
              ? "ETH VALUE"
              : props?.lastTxn
              ? "LAST TXN SENT"
              : null}
          </Typography>
          <Typography variant="body2">
            {props?.network === "Ethereum" ? (
              `${ethereumPrice*props?.balanceInEther} $ (@ ${ethereumPrice}/ETH)`
            ) : props?.network === "polygon" ? (
              "$12,839.53 (@ $1.12/MATIC)"
            ) : props?.network === "bsc" ? (
              "$53.99 (@ $335.12/BNB)"
            ) : props.lastTxn ? (
              <>
                <span style={{ color: "green" }}>
                  {props?.lastTxn.slice(0, 10)}...
                </span>{" "}
                <span>From {props.lastTxnTime}</span>
              </>
            ) : (
              ""
            )}
          </Typography>
          <Typography sx={{ marginTop: "20px" }} variant="body2">
            {/* well meaning and kindly.
          <br />
          {'"a benevolent smile"'} */}
            {props?.balance ? "" : "props.firstTxn" ? "FIRST TXN SENT" : ""}
          </Typography>
          <Typography variant="body2">
            {props?.balance ? (
              ""
            ) : props.firstTxn ? (
              <>
                <span style={{ color: "green" }}>
                  {props?.firstTxn.slice(0, 10)}...
                </span>{" "}
                <span>From {props.firstTxnTime}</span>
              </>
            ) : (
              ""
            )}
          </Typography>
        </CardContent>
        <CardActions>
          {/* <Button size="small">Learn More</Button> */}
        </CardActions>
      </Card>
      {/* <FullWidthTabs data={props?.allTransaction} /> */}
    </>
  );
}
