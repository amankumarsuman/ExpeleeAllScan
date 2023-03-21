import logo from "./logo.svg";
import "./App.css";
import WalletDataWithTime from "./Components/WalletDetailsWithTime";
import { AllWalletDetails } from "./Components/AllWalletData";
import ResponsiveAppBar from "./Components/navbars/Navbar";
import Body from "./Components/body/Body";

function App() {
  return (
    <div className="App">
      {/* <WalletDataWithTime /> */}
      <ResponsiveAppBar />
      {/* <Body /> */}
      <AllWalletDetails />
    </div>
  );
}

export default App;
