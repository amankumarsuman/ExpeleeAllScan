import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TransactionTable from "./TransactionTable";
import BlockDataTable from "./BlockDataTable";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs({ data,internalTxn,blockData }) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  console.log(blockData,"internalTxn")
  return (
    <Box sx={{ bgcolor: "background.paper", width: "90%", margin: "auto" }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Transactions" {...a11yProps(0)} />
          <Tab label="Internal Transaction" {...a11yProps(1)} />
          <Tab label="Token Transfers(ERC-20)" {...a11yProps(2)} />
          <Tab label="Produced Blocks" {...a11yProps(3)} />
          <Tab label="Analytics" {...a11yProps(4)} />
          <Tab label="Comments" {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <TransactionTable
            // network={network} address={address}
            data={data}
          />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {/* <h4>Internal Transaction will come soon</h4>
          <p>We are working on it</p> */}
           <TransactionTable
            // network={network} address={address}
            data={internalTxn}
          />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <h4>Token Transfers(ERC-20) Details will come soon</h4>
          <p>We are working on it</p>
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          {/* <h4>Produced Block Details will come soon</h4>
          <p>We are working on it</p> */}
          <BlockDataTable data={blockData} />
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          <h4>Analytics Details will come soon</h4>
          <p>We are working on it</p>
        </TabPanel>
        <TabPanel value={value} index={5} dir={theme.direction}>
          <h4>Comments Details will come soon</h4>
          <p>We are working on it</p>
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
