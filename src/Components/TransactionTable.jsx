import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { getWalletData } from "./GetWalletData";
import { getTransactionDetails } from "./transactionDetails/Transaction-utils";
// import { getWalletData } from "./transactionDetails/Transaction-utils";

const columns = [
  { id: "TxnHash", label: "Txn Hash" },
  { id: "method", label: "Method" },
  {
    id: "Block",
    label: "Block",

    align: "left",
    // format: (value) => value.toLocaleString("en-US")
  },
  {
    id: "Age",
    label: "Age",

    align: "left",
    // format: (value) => value.toLocaleString("en-US")
  },
  {
    id: "From",
    label: "From",

    align: "left",
    // format: (value) => value.toFixed(2)
  },
  { id: "to", label: "To" },
  { id: "Value", label: "Value" },
  { id: "TxnFee", label: "Txn Fee" },
];

export default function TransactionTable({ address,network }) {
  console.log(address,network,"data")
  const[isLoading,setIsLoading]=React.useState(true)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
const [transactionData,setData]=React.useState(null)
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleGetDetails = async () => {
    try {
   
// 
        const datas = await getTransactionDetails(address, network);
        // setWalletData(data);
        console.log(datas,"transdata")
        setData(datas?.allTransaction)
        // setIsWalletAddr(true)
        // setLoading(false);

      
    } catch (error) {
      console.error(error);
    }
  };



// React.useEffect(()=>{
// if(transactionData?.length>0 && Array.isArray(transactionData)){
//   setIsLoading(true)
// }else{
//   setIsLoading(false)
// }
// },[transactionData])

React.useEffect(()=>{
  handleGetDetails()
},[])
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const formatDate = (timestamp) => {
    const date = new Date(parseInt(timestamp) * 1000);
    const currentDate = new Date();
    const diff = Math.floor((currentDate - date) / 1000); // difference in seconds

    const seconds = diff % 60;
    const minutes = Math.floor(diff / 60) % 60;
    const hours = Math.floor(diff / 3600) % 24;
    const days = Math.floor(diff / 86400);

    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    const time = date.toLocaleTimeString();

    return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds (${month} ${day}, ${year} ${time})`;
  };

  console.log(transactionData,"transsssssssssss")
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  // style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {transactionData && transactionData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    <TableCell sx={{ color: "green" }}>
                      {row?.blockHash?.slice(0, 20)}...
                    </TableCell>
                    <TableCell style={{ textAlign: "left" }}>
                      <div
                        style={{
                          border: "1px solid grey",
                          borderRadius: "7px",
                          textAlign: "center",
                          backgroundColor: "green",
                          color: "black",
                        }}
                      >
                        {"Transfer"}
                      </div>
                    </TableCell>
                    <TableCell sx={{ color: "green" }}>
                      {row?.blockNumber}
                    </TableCell>
                    <TableCell>{formatDate(row?.timeStamp)}</TableCell>
                    <TableCell sx={{ color: "green" }}>
                      {row?.from?.slice(0, 20)}...
                    </TableCell>
                    <TableCell>{row?.to?.slice(0, 20)}...</TableCell>
                    <TableCell>
                      {(row?.value / 10 ** 18)?.toFixed(5)}ETH
                    </TableCell>
                    <TableCell>
                      {(row?.gasPrice / 10 ** 18)?.toFixed(5)}ETH
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={transactionData?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  //  <></>
  );
}
