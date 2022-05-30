import { useEffect } from "react";
import "./App.css";
import { Button, Select } from "antd";
const { Option } = Select;

function App() {
  useEffect(() => {
    isLogin();
  }, []);

  const setupChain = async () => {
    const bscTest = await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: `${Number("97")}`,
          chainName: "Smart Chain - Testnet",
          nativeCrrency: {
            name: "BNB",
            symbol: "BNB",
            deciamal: 18,
          },
          rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
          blockExplorerUrls: [" https://testnet.bscscan.com"],
        },
      ],
    });
    return bscTest;
  };

  const handleChange = (value) => {
    if (Number(window.ethereum.networkVersion) !== value) {
      window.ethereum.on("networkId", (networkId) => {
        console.log("networkId", networkId);
      });
    } else {
      console.log(`ban dang su dung chainId ${value}`);
    }
  };

  const isLogin = async () => {
    const currentAccount = await window.ethereum.request({
      method: "eth_accounts",
    });
    if (currentAccount.length > 0) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts;
    } else {
      alert("Đã đăng nhập metaMask");
    }
  };

  const handleConnent = async () => {
    const permissions = await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
  };

  return (
    <div className="App">
      <Button type="primary" onClick={handleConnent}>
        Connect MetaMask
      </Button>
      <div>
        <Select
          defaultValue={"title"}
          style={{
            width: 120,
          }}
          onChange={handleChange}
        >
          <Option value="title">Đổi mạng</Option>
          <Option value={1}>BSC testnet</Option>
          <Option value={97}>BSC SmartChain</Option>
        </Select>
      </div>
    </div>
  );
}

export default App;
