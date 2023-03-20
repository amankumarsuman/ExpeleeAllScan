import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./TransactionDetail.css";

function TransactionDetail({ txHash }) {
  const [txDetails, setTxDetails] = useState(null);

  useEffect(() => {
    const web3 = new Web3(
      "https://mainnet.infura.io/v3/320147bac521449188ac7347ba389fb5"
    );
    // Replace <YOUR_INFURA_PROJECT_ID> with your Infura project ID

    const fetchTxDetails = async () => {
      try {
        const result = await web3.eth.getTransaction(txHash);
        setTxDetails(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTxDetails();
  }, [txHash]);

  if (!txDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tx-detail">
      <h2>Transaction Details</h2>
      <table>
        <tbody>
          <tr>
            <td>Hash:</td>
            <td>{txDetails.hash}</td>
          </tr>
          <tr>
            <td>Block Number:</td>
            <td>{txDetails.blockNumber}</td>
          </tr>
          <tr>
            <td>From:</td>
            <td>{txDetails.from}</td>
          </tr>
          <tr>
            <td>To:</td>
            <td>{txDetails.to}</td>
          </tr>
          <tr>
            <td>Value:</td>
            <td>{web3.utils.fromWei(txDetails.value, "ether")} ETH</td>
          </tr>
          <tr>
            <td>Gas Price:</td>
            <td>{web3.utils.fromWei(txDetails.gasPrice, "gwei")} GWEI</td>
          </tr>
          <tr>
            <td>Gas Limit:</td>
            <td>{txDetails.gas}</td>
          </tr>
          <tr>
            <td>Nonce:</td>
            <td>{txDetails.nonce}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TransactionDetail;

// To use this component, simply pass in the transaction hash as a prop:

// <TransactionDetail txHash="0x123..." />
