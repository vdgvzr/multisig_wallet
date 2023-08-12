import {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";

import detectEthereumProvider from "@metamask/detect-provider";
import { formatBalance } from "../utils/index";
import MultisigWallet from "/abis/MultisigWallet.json";
import Web3 from "web3";
import Message from "../assets/js/customClasses/messageClasses";

const disconnectedState = {
  accounts: [],
  balance: "",
  chainId: "",
};

export const MetaMaskContext = createContext(null);

export const MetaMaskContextProvider = ({ children }) => {
  const siteName = import.meta.env.VITE_SITE_NAME;
  // Global state
  const [hasProvider, setHasProvider] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const [balance, setBalance] = useState("0");
  const [contract, setContract] = useState([]);
  const [owner, setOwner] = useState("0x0");
  const [owners, setOwners] = useState([]);
  const [addressLimit, setAddressLimit] = useState("0");
  const [signaturesRequired, setSignaturesRequired] = useState("0");
  const [transferRequests, setTransferRequests] = useState([]);
  const [approvals, setApprovals] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isSignatory, setIsSignatory] = useState(false);

  function clearError(id) {
    setErrorMessage(errorMessage.filter((message) => message.id !== id));
  }

  const [wallet, setWallet] = useState(disconnectedState);

  useEffect(() => {
    if (wallet.accounts[0] !== undefined && owner !== "0x0") {
      setIsOwner(
        window.web3.utils.toChecksumAddress(wallet.accounts[0]) ===
          window.web3.utils.toChecksumAddress(owner)
      );
      setIsSignatory(
        owners?.includes(
          window.web3.utils.toChecksumAddress(wallet.accounts[0])
        )
      );
    }
  }, [wallet.accounts, owner, owners]);

  const _loadWeb3 = useCallback(async () => {
    window.web3 = new Web3(window.ethereum);
    const accounts = await window.web3.eth.getAccounts();
    const networkId = await window.web3.eth.net.getId();
    const networkData = MultisigWallet.networks[networkId];

    if (networkData) {
      setLoading(true);
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
        if (accounts[0]) {
          contractApprovals.push(
            await multisigWallet.methods.approvals(accounts[0], i).call()
          );
        }
      }

      // Set state
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
      toastMessage(
        new Message("error", "Contract not deployed to detected network")
      );
    }

    setLoading(false);
  }, []);

  const loadWeb3 = useCallback(() => _loadWeb3(), [_loadWeb3]);

  // useCallback ensures that you don't uselessly recreate the _updateWallet function on every render
  const _updateWallet = useCallback(async (providedAccounts) => {
    const accounts =
      providedAccounts ||
      (await window.ethereum.request({ method: "eth_accounts" }));

    if (accounts.length === 0) {
      // If there are no accounts, then the user is disconnected
      setWallet(disconnectedState);
      return;
    }

    const balance = formatBalance(
      await window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      })
    );
    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    setWallet({ accounts, balance, chainId });
  }, []);

  const updateWalletAndAccounts = useCallback(
    () => _updateWallet(),
    [_updateWallet]
  );
  const updateWallet = useCallback(
    (accounts) => _updateWallet(accounts),
    [_updateWallet]
  );

  /**
   * This logic checks if MetaMask is installed. If it is, some event handlers are set up
   * to update the wallet state when MetaMask changes. The function returned by useEffect
   * is used as a "cleanup": it removes the event handlers whenever the MetaMaskProvider
   * is unmounted.
   */
  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));

      if (provider) {
        updateWalletAndAccounts();
        loadWeb3();
        window.ethereum.on("accountsChanged", updateWallet);
        window.ethereum.on("accountsChanged", loadWeb3);
        window.ethereum.on("chainChanged", updateWalletAndAccounts);
        window.ethereum.on("chainChanged", loadWeb3);
      }
    };

    getProvider();

    return () => {
      window.ethereum?.removeListener("accountsChanged", updateWallet);
      window.ethereum?.removeListener("accountsChanged", loadWeb3);
      window.ethereum?.removeListener("chainChanged", updateWalletAndAccounts);
      window.ethereum?.removeListener("chainChanged", loadWeb3);
    };
  }, [updateWallet, updateWalletAndAccounts, loadWeb3]);

  const connectMetaMask = async () => {
    setIsConnecting(true);

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      clearError();
      updateWallet(accounts);
    } catch (err) {
      setErrorMessage((prev) => [...prev, err.message]);
    }
    setIsConnecting(false);
  };

  function toastMessage(message) {
    setErrorMessage((prev) => [...prev, message]);
  }

  return (
    <MetaMaskContext.Provider
      value={{
        wallet,
        hasProvider,
        error: !!errorMessage,
        errorMessage,
        isConnecting,
        balance,
        contract,
        owner,
        owners,
        addressLimit,
        signaturesRequired,
        transferRequests,
        approvals,
        loading,
        isOwner,
        isSignatory,
        siteName,
        connectMetaMask,
        clearError,
        loadWeb3,
        toastMessage,
      }}
    >
      {children}
    </MetaMaskContext.Provider>
  );
};

export const useMetaMask = () => {
  const context = useContext(MetaMaskContext);
  if (context === undefined) {
    throw new Error(
      'useMetaMask must be used within a "MetaMaskContextProvider"'
    );
  }
  return context;
};
