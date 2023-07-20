import React, { useEffect, useState } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { Outlet, ScrollRestoration, useLoaderData } from "react-router-dom";
import MainNav from "../../components/global/MainNav/MainNav";
import MultisigWallet from "/abis/MultisigWallet.json";
import LoadingPage from "../../pages/staticPages/LoadingPage/LoadingPage";
import WelcomePage from "../../pages/staticPages/WelcomePage/WelcomePage";
import AccessDeniedPage from "../../pages/staticPages/AccessDeniedPage/AccessDeniedPage";
import ContractBanner from "../../components/content/mainContent/ContractBanner/ContractBanner";
import { getApi } from "../../api/api";
import Footer from "../../components/global/Footer/Footer";
import Toasts from "../../components/content/mainContent/Toasts/Toasts";

export const RootContext = React.createContext(null);

function RootLayout() {
  const siteName = import.meta.env.VITE_SITE_NAME;
  const { getEth } = useLoaderData();
  const [accountLoading, setAccountLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState("0");
  const [connectedBalance, setConnectedBalance] = useState("0");
  const [contract, setContract] = useState([]);
  const [owner, setOwner] = useState("0x0");
  const [owners, setOwners] = useState([]);
  const [addressLimit, setAddressLimit] = useState("0");
  const [signaturesRequired, setSignaturesRequired] = useState("0");
  const [transferRequests, setTransferRequests] = useState([]);
  const [approvals, setApprovals] = useState(false);
  const [loadContractError, setLoadContractError] = useState("");
  const [messages, setMessages] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  const isOwner = account === owner;
  const isSignatory = owners.includes(account);

  useEffect(() => {
    async function load() {
      if ((await window.ethereum.request({ method: "eth_accounts" })).length) {
        loadWeb3();
      } else {
        console.log("Please connect your wallet");
        setAccountLoading(false);
        setLoading(false);
      }
    }
    load();
  });

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      getAccount();
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
      window.location.reload();
    } else if (accounts[0] !== account) {
      setAccount(accounts[0]);
      loadBlockchainData(accounts);
    }
  }

  async function loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0]);
    const networkId = await window.web3.eth.net.getId();
    const networkData = MultisigWallet.networks[networkId];

    if (networkData) {
      const multisigWallet = new window.web3.eth.Contract(
        MultisigWallet.abi,
        networkData.address
      );

      // Contract variable methods
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

      // Set state
      setContract(multisigWallet);
      setOwner(contractOwner);
      setOwners(contractOwners);
      setBalance(
        window.web3.utils.fromWei(contractBalance.toString(), "ether")
      );
      setConnectedBalance(balance);
      setAddressLimit(contractAddressLimit.toString());
      setSignaturesRequired(contractSignaturesRequired.toString());
      setTransferRequests(contractTransferRequests);
      setApprovals(contractApprovals);
      setLoading(false);
    } else {
      setLoadContractError("Contract not deployed to detected network");
    }
  }

  // Invoke contract methods
  /* function depositToContract(from, value) {
    contract.methods
      .depositToContract()
      .send({ from, value })
      .once("receipt", (receipt) => {
        console.log(receipt);
        toastMessage({
          variant: "success",
          message: "Deposited to contract!",
        });
        loadBlockchainData();
      });
  } */

  function depositToContract(from, value) {
    contract.methods
      .depositToContract()
      .send({ from, value })
      .once("receipt", () => {
        loadBlockchainData();
      });

    contract.events.depositComplete().on("data", function (e) {
      const bigNumber = window.web3.utils.toNumber(e.returnValues.amount);
      const amount = window.web3.utils.fromWei(bigNumber, "ether");
      toastMessage({
        variant: "success",
        message: `Deposited ${amount} ETH to contract!`,
      });
    });
  }

  function addOwner(from, newOwner) {
    contract.methods
      .addOwner(newOwner)
      .send({ from })
      .once("receipt", () => {
        loadBlockchainData();
      });

    contract.events.addOwnerComplete().on("data", function (e) {
      toastMessage({
        variant: "success",
        message: `Added ${e.returnValues.owner} to contract!`,
      });
    });
  }

  function deleteOwner(from, index) {
    contract.methods
      .deleteOwner(index)
      .send({ from })
      .once("receipt", () => {
        loadBlockchainData();
      });

    /* contract.events.addOwnerComplete().on("data", function (e) {
        toastMessage({
          variant: "success",
          message: `Added ${e.returnValues.owner} to contract!`,
        });
      }); */
  }

  function changeContractOwner(from, newOwner) {
    contract.methods
      .changeOwner(newOwner)
      .send({ from })
      .once("receipt", () => {
        loadBlockchainData();
      });
  }

  function requestTransfer(from, to, value) {
    contract.methods
      .requestTransfer(to, value)
      .send({ from })
      .once("receipt", () => {
        loadBlockchainData();
      });

    contract.events.transferRequestComplete().on("data", function (e) {
      toastMessage({
        variant: "success",
        message: `Request transfer of ${e.returnValues.amount} to ${e.returnValues.to}!`,
      });
    });
  }

  function approveRequest(from, id, approved) {
    contract.methods
      .approveRequest(id, approved)
      .send({ from })
      .once("receipt", (receipt) => {
        // Logging for now, will change
        console.log(receipt);
        loadBlockchainData();
      });

    contract.events.requestApproved().on("data", function (e) {
      toastMessage({
        variant: "success",
        message: `Transfer request #${e.returnValues.transferID} approved!`,
      });
    });

    contract.events.transferComplete().on("data", function (e) {
      toastMessage({
        variant: "success",
        message: `Transfer of ${e.returnValues.amount} to ${e.returnValues.to} from ${e.returnValues.from} complete!`,
      });
    });
  }

  function toastMessage(message) {
    setMessages((prev) => [...prev, message]);
    setShowMessage(true);
  }

  return (
    <RootContext.Provider
      value={{
        getEth,
        siteName,
        isSignatory,
        isOwner,
        account,
        balance,
        connectedBalance,
        owner,
        owners,
        addressLimit,
        signaturesRequired,
        accountLoading,
        contract,
        transferRequests,
        approvals,
        loadContractError,
        loadWeb3,
        depositToContract,
        addOwner,
        deleteOwner,
        changeContractOwner,
        requestTransfer,
        approveRequest,
        toastMessage,
      }}
    >
      <main className="main-content">
        <MainNav />
        {/* <div className="line"></div> */}
        <ContractBanner />
        <ScrollRestoration />
        <div className="container">
          {loading ? (
            <LoadingPage />
          ) : isSignatory ? (
            <>
              <Toasts
                messages={messages}
                showMessage={showMessage}
                setShowMessage={setShowMessage}
                setMessages={setMessages}
              />
              <Outlet />
            </>
          ) : !account ? (
            <WelcomePage />
          ) : (
            <AccessDeniedPage />
          )}
        </div>
      </main>
      <Footer />
    </RootContext.Provider>
  );
}

async function loader({ request: { signal } }) {
  const getEth = await getApi({
    url: "tickers/eth-ethereum/",
    options: { signal },
  });

  return { getEth };
}

export const rootRoute = {
  loader,
  element: <RootLayout />,
};
