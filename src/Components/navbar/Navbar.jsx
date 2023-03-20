import React from 'react';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#090F13',
    boxShadow: 'none',
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginRight: theme.spacing(8),
  },
  button: {
    marginLeft: theme.spacing(2),
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#1C1F21',
    },
  },
}));

export default function EtherScanNavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            EtherScan
          </Typography>
          <Button color="inherit" className={classes.button}>
            Blockchain
          </Button>
          <Button color="inherit" className={classes.button}>
            Contracts
          </Button>
          <Button color="inherit" className={classes.button}>
            Tokens
          </Button>
          <Button color="inherit" className={classes.button}>
            Charts
          </Button>
          <Button color="inherit" className={classes.button}>
            Transactions
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
