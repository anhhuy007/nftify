import { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import NFTService from "@/services/NFTService";
import NFTMarketplace from "../../contract/NFTMarketplace.json";

const WalletContext = createContext();

const WalletProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  const getBalance = async (provider, address) => {
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("Please install MetaMask to connect your wallet");
      return;
    }

    try {
      const provider = window.ethereum
        ? new ethers.BrowserProvider(window.ethereum)
        : null;
      if (!provider) {
        throw new Error("Unable to create provider");
      }

      // Validate network
      const network = await provider.getNetwork();
      const chainId = Number(network.chainId);

      // Assuming local hardhat network (chainId 31337)
      if (chainId !== 31337) {
        toast.error("Please connect to your local network");
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x7A69" }], // 31337 in hex
          });
        } catch (error) {
          toast.error("Failed to switch network");
          return;
        }
      }

      // Request account access
      await provider.send("eth_requestAccounts", []);

      // Get the signer
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balance = await getBalance(provider, address);
      const contract = new ethers.Contract(
        process.env.CONTRACT_ADDRESS,
        NFTMarketplace.abi,
        signer
      );

      NFTService.connect(contract);

      setProvider(provider);
      setSigner(signer);
      setContract(contract);
      setAddress(address);
      setBalance(balance);
      setIsConnected(true);

      toast.success("Wallet connected successfully");
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error(`Error connecting wallet: ${error.message}`);
    }
  };

  const disconnectWallet = async () => {
    try {
      // Remove MetaMask event listeners
      if (window.ethereum) {
        window.ethereum.removeAllListeners("accountsChanged");
        window.ethereum.removeAllListeners("chainChanged");
        window.ethereum.removeAllListeners("disconnect");
      }

      // Clear local storage if needed
      localStorage.removeItem("walletAddress");

      // Reset all state
      setProvider(null);
      setSigner(null);
      setAddress("");
      setBalance(0);
      setIsConnected(false);

      // Show success message
      toast.success("Wallet disconnected successfully");
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
      toast.error("Failed to disconnect wallet");
    }
  };

  console.log("WalletProvider:", {
    provider,
    signer,
    address,
    balance,
  });

  return (
    <WalletContext.Provider
      value={{
        provider,
        signer,
        address,
        balance,
        isConnected,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
export const useWallet = () => useContext(WalletContext);
