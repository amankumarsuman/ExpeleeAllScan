import logo from "./logo.svg";
import "./App.css";
import WalletDataWithTime from "./Components/WalletDetailsWithTime";
import { AllWalletDetails } from "./Components/AllWalletData";
import ResponsiveAppBar from "./Components/navbars/Navbar";

function App() {
  return (
    <div className="App">
      {/* <WalletDataWithTime /> */}
      <ResponsiveAppBar />
      <AllWalletDetails />
    </div>
  );
}

export default App;
