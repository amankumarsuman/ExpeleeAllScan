import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import logo from "../assets/ExpeleeLogoDark.png";
import PinchIcon from "@mui/icons-material/Pinch";

export default function MediaCard() {
  return (
    <Card sx={{ maxWidth: 400, textAlign: "center" }}>
      <CardMedia
        sx={{ height: 140, marginTop: "2%" }}
        image={logo}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Important Notice
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <>
            <span style={{ color: "black", fontWeight: "bold" }}>Expe</span>
            <span style={{ color: "#ff7924", fontWeight: "bold" }}>
              lee
            </span>{" "}
            Team is working on Contract/Token Scanner as well.
          </>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          For Now you can search for your any network wallet data and
          transaction hash
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined">
          Enter Your wallet Address/Transaction hash Above <PinchIcon />
          <span></span>
        </Button>
      </CardActions>
    </Card>
  );
}
