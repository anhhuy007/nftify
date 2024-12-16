import { createContext, useState, useContext, useEffect } from "react";
import {
  getUserApiEndpoint,
  loginApiEndpoint,
  logoutApiEndpoint,
  refreshTokenApiEndpoint,
  userApiEndpoint,
} from "@/api/Endpoints";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("jwtToken") || "");
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("jwtRefreshToken") || ""
  );
  const [isAuth, setIsAuth] = useState(!!token);
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress") || ""
  );

  // Fetch user data
  const fetchUserData = async () => {
    if (!isAuth) {
      return;
    }

    try {
      const response = await fetch(getUserApiEndpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      setUser(result);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      toast.error("Failed to fetch user data. Please try again.");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const loginAction = async (data) => {
    try {
      const response = await fetch(loginApiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.message === "Login successful") {
        setUser(result.account);
        setToken(result.accessToken);
        setRefreshToken(result.refreshToken);
        setIsAuth(true);
        localStorage.setItem("jwtToken", result.accessToken);
        localStorage.setItem("jwtRefreshToken", result.refreshToken);

        console.log("Login successful:", result);

        return result;
      }

      return { error: result.message };
    } catch (error) {
      return { error: error.message };
    }
  };

  const refreshAccessToken = async () => {
    try {
      const response = await fetch(refreshTokenApiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: refreshToken }),
      });

      const result = await response.json();
      if (result.accessToken) {
        setToken(result.accessToken);
        localStorage.setItem("jwtToken", result.accessToken);

        return result.accessToken;
      }
      throw new Error("Token refresh failed:", result.message);
    } catch (error) {
      console.error("Error refreshing token:", error);
      logoutAction();
      return { error: error.message };
    }
  };

  const logoutAction = async () => {
    try {
      const result = await fetch(logoutApiEndpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });

      // clear local storage
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("jwtRefreshToken");
      localStorage.removeItem("walletAddress");
      setIsAuth(false);
      setUser(null);
      setToken("");
      setRefreshToken("");
      setWalletAddress("");

      return result;
    } catch (error) {
      console.error("Error logging out:", error);
      return { error: error.message };
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("Please install MetaMask to connect your wallet");
      return;
    }

    try {
      // For ethers v6
      const provider = window.ethereum
        ? new ethers.BrowserProvider(window.ethereum)
        : null;
      if (!provider) {
        throw new Error("Unable to create provider");
      }

      // Request account access
      await provider.send("eth_requestAccounts", []);

      // Get the signer
      const signer = await provider.getSigner();

      // Get wallet address
      const address = await signer.getAddress();

      setWalletAddress(address);
      localStorage.setItem("walletAddress", address);

      console.log("Wallet connected:", address);
      return address;
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Error connecting wallet");
    }
  };

  if (!user) {
    fetchUserData();
  }

  useEffect(() => {
    console.log("Current user:", user);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        loginAction,
        logoutAction,
        refreshAccessToken,
        connectWallet,
        walletAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
