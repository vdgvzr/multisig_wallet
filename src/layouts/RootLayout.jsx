import React, { useState } from "react";
import Web3 from "web3";
import { Outlet, ScrollRestoration } from "react-router-dom";
import MainNav from "../components/global/MainNav/MainNav";
import MultisigWallet from "../abis/MultisigWallet.json";

export const RootContext = React.createContext(null);

export default function RootLayout() {
  const siteName = import.meta.env.VITE_SITE_NAME;

  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("0");
  const [contract, setContract] = useState([]);
  const [owners, setOwners] = useState([]);
  const [addressLimit, setAddressLimit] = useState("0");
  const [signaturesRequired, setSignaturesRequired] = useState("0");
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
      const contractOwners = await multisigWallet.methods.getOwners().call();
      const contractBalance = await multisigWallet.methods
        .contractBalance()
        .call();
      const contractAddressLimit = await multisigWallet.methods
        .addressLimit()
        .call();
      const contractSignaturesRequired = await multisigWallet.methods
        .signaturesRequired()
        .call();
      setContract(multisigWallet);
      setOwners(contractOwners);
      setBalance(
        window.web3.utils.fromWei(contractBalance.toString(), "ether")
      );
      setAddressLimit(contractAddressLimit.toString());
      setSignaturesRequired(contractSignaturesRequired.toString());
    } else {
      setLoadContractError("Contract not deployed to detected network");
    }

    setLoading(false);
    setAccount(accounts[0]);
  }

  function depositToContract(from, value) {
    contract.methods
      .depositToContract()
      .send({ from, value })
      .once("receipt", (receipt) => {
        // Logging for now, will change
        console.log(receipt);
      });
  }

  function addOwner(from, newOwner) {
    contract.methods
      .addOwner(newOwner)
      .send({ from })
      .once("receipt", (receipt) => {
        // Logging for now, will change
        console.log(receipt);
      });
  }

  return (
    <RootContext.Provider
      value={{
        siteName,
        account,
        balance,
        owners,
        addressLimit,
        signaturesRequired,
        loading,
        contract,
        loadEthError,
        loadContractError,
        depositToContract,
        addOwner,
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
