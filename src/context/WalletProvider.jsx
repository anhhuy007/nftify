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

  const connectWallet = async (userAddress) => {
    if (!window.ethereum) {
      throw new Error("Please install MetaMask");
    }

    try {
      const provider = window.ethereum
        ? new ethers.BrowserProvider(window.ethereum)
        : null;
      if (!provider) {
        throw new Error("Unable to connect to MetaMask");
      }

      // Validate network
      const network = await provider.getNetwork();
      const chainId = Number(network.chainId);

      // Assuming local hardhat network (chainId 31337)
      if (chainId !== 31337) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x7A69" }], // 31337 in hex
          });
        } catch (error) {
          throw new Error("Please switch to the local network");
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

      // if user address is different from the connected address, show error
      if (userAddress && userAddress !== address) {
        throw new Error("Connected wallet address does not match user address");
      }

      NFTService.connect(contract);
      setProvider(provider);
      setSigner(signer);
      setContract(contract);
      setAddress(address);
      setBalance(balance);
      setIsConnected(true);

      return address;
    } catch (error) {
      console.error("Error connecting wallet:", error);
      throw error;
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
      return true;
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
      throw error;
    }
  };

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
