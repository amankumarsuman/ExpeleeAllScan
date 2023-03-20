import logo from "./logo.svg";
import "./App.css";
import WalletDataWithTime from "./Components/WalletDetailsWithTime";
import { AllWalletDetails } from "./Components/AllWalletData";

function App() {
  return (
    <div className="App">
      {/* <WalletDataWithTime /> */}
      <AllWalletDetails />
    </div>
  );
}

export default App;
