import { useEffect } from "react";
import "./App.css";
import { Button } from "antd";
import { ethers } from "ethers";
import abi from './TTVToken.json'

function App() {
  useEffect(() => {
    isLogin();
  }, []);

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

  const handleChange = async () => {
    const params = [
      {
        chainId: `0x${Number(97).toString(16)}`,
        chainName: "BNB TestNet",
        nativeCurrency: {
          name: "BNB",
          symbol: "BNB",
          decimal: 18,
        },
        rpcUrls: ["https://bsc-dataseed.binance.org/"],
        blockExplorerUrls: ["https://bscscan.com"],
      },
    ];
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: params,
    });
  };

  const handleClaim = async () => {
    const ADDRESS_CONTRACT = "0x50FE8A546037986C281Aa03451E2eB3B555A7141";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const singer = provider.getSigner();
    const usdtContract = new ethers.Contract(ADDRESS_CONTRACT, abi.abi, singer);
    await usdtContract.claim(10000);
  };

  return (
    <div className="App">
      <Button type="primary" onClick={handleConnent}>
        Connect MetaMask
      </Button>
      <Button type="primary" onClick={handleChange}>
        Change Testnet
      </Button>
      <Button type="primary" onClick={handleClaim}>
        Claim token
      </Button>
    </div>
  );
}

export default App;
