import React, { useEffect, useState } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { Outlet, ScrollRestoration } from "react-router-dom";
import MainNav from "../components/global/MainNav/MainNav";
import MultisigWallet from "/abis/MultisigWallet.json";

export const RootContext = React.createContext(null);

export default function RootLayout() {
  const siteName = import.meta.env.VITE_SITE_NAME;
  const [accountLoading, setAccountLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState("0");
  const [contract, setContract] = useState([]);
  const [owner, setOwner] = useState("0x0");
  const [owners, setOwners] = useState([]);
  const [addressLimit, setAddressLimit] = useState("0");
  const [signaturesRequired, setSignaturesRequired] = useState("0");
  const [transferRequests, setTransferRequests] = useState([]);
  const [approvals, setApprovals] = useState(false);
  const [loadContractError, setLoadContractError] = useState("");
  const isOwner = account === owner;
  const isSignatory = owners.includes(account);

  useEffect(() => {
    loadWeb3();
  });

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      if (await window.ethereum.request({ method: "eth_accounts" })) {
        getAccount();
      }
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  detectEthereumProvider().then((provider) => {
    if (provider && provider.isMetaMask) {
      provider.on("accountsChanged", handleAccountsChanged);
      getAccount();
    } else {
      console.log("Please install MetaMask!");
    }
  });

  async function getAccount() {
    const accounts = await window.web3.eth.getAccounts();
    setAccountLoading(false);
    handleAccountsChanged(accounts);
  }

  function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      console.log("You're not connected to MetaMask");
    } else if (accounts[0] !== account) {
      setAccount(accounts[0]);
      loadBlockchainData(accounts);
    }
  }

  async function loadBlockchainData(accounts) {
    const networkId = await window.web3.eth.net.getId();
    const networkData = MultisigWallet.networks[networkId];

    if (networkData) {
      const multisigWallet = new window.web3.eth.Contract(
        MultisigWallet.abi,
        networkData.address
      );

      const contractOwner = await multisigWallet.methods.getOwner().call();
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
      const contractTransferRequests = await multisigWallet.methods
        .getTransferRequests()
        .call();

      let contractApprovals = [];
      for (let i = 0; i < contractTransferRequests.length; i++) {
        contractApprovals.push(
          await multisigWallet.methods.approvals(accounts[0], i).call()
        );
      }

      ////// Set state
      setContract(multisigWallet);
      setOwner(contractOwner);
      setOwners(contractOwners);
      setBalance(
        window.web3.utils.fromWei(contractBalance.toString(), "ether")
      );
      setAddressLimit(contractAddressLimit.toString());
      setSignaturesRequired(contractSignaturesRequired.toString());
      setTransferRequests(contractTransferRequests);
      setApprovals(contractApprovals);
      setLoading(false);
    } else {
      setLoadContractError("Contract not deployed to detected network");
    }
  }

  return (
    <RootContext.Provider
      value={{
        siteName,
        isOwner,
        account,
        balance,
        owner,
        owners,
        addressLimit,
        signaturesRequired,
        accountLoading,
        contract,
        transferRequests,
        approvals,
        loadContractError,
        getAccount,
      }}
    >
      <MainNav />
      <ScrollRestoration />
      <div className="container">
        {loading ? (
          <h1>Loading...</h1>
        ) : isSignatory ? (
          <Outlet />
        ) : (
          <h1>Access Denied</h1>
        )}
      </div>
    </RootContext.Provider>
  );
}
