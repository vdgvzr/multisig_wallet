import React, { useState } from "react";
import Web3 from "web3";
import { Outlet, ScrollRestoration } from "react-router-dom";
import MainNav from "../components/global/MainNav";
import MultisigWallet from "../abis/MultisigWallet.json";

export const RootContext = React.createContext(null);

export default function RootLayout() {
  const siteName = import.meta.env.VITE_SITE_NAME;

  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState([]);
  const [loadEthError, setLoadEthError] = useState("");
  const [loadContractError, setLoadContractError] = useState("");

  useState(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      setLoadEthError(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async function loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const networkData = MultisigWallet.networks[networkId];

    if (networkData) {
      const multisigWallet = new web3.eth.Contract(
        MultisigWallet.abi,
        networkData.address
      );
      setContract(multisigWallet);
    } else {
      setLoadContractError("Contract not deployed to detected network");
    }

    setLoading(false);
    setAccount(accounts[0]);
  }

  return (
    <RootContext.Provider
      value={{
        siteName,
        account,
        loading,
        contract,
        loadEthError,
        loadContractError,
      }}
    >
      <MainNav />
      <ScrollRestoration />
      <div className="container">
        <Outlet />
      </div>
    </RootContext.Provider>
  );
}
