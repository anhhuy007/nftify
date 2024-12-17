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
  // Parse user from localStorage with error handling
  const getStoredUser = () => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing stored user:", error);
      return null;
    }
  };

  const [user, setUser] = useState(getStoredUser());
  const [token, setToken] = useState(localStorage.getItem("jwtToken") || "");
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("jwtRefreshToken") || ""
  );
  const [isAuth, setIsAuth] = useState(!!token);
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress") || ""
  );

  // Update localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Update fetchUserData
  const fetchUserData = async () => {
    console.log("----- Fetching User Data -----");
    if (user) {
      console.log("User data already fetched:", user);
      return;
    }

    if (!isAuth) {
      console.log("User not authenticated");
      return;
    }

    try {
      const response = await fetch(getUserApiEndpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (result.success === false) {
        throw new Error(result.message);
      }

      setUser(result.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
    }
  };

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

      if (result.success === true) {
        const data = result.data;

        setUser(data.account);
        setToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        setIsAuth(true);
        localStorage.setItem("jwtToken", data.accessToken);
        localStorage.setItem("jwtRefreshToken", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.account));

        return data;
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
      if (result.success === true) {
        const data = result.data;
        setToken(data);
        localStorage.setItem("jwtToken", data);

        return data;
      }
      throw new Error("Token refresh failed:", result.message);
    } catch (error) {
      logoutAction();
      return { error: error.message };
    }
  };

  const logoutAction = async () => {
    const cleanup = () => {
      // Clear all local storage
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("jwtRefreshToken");
      localStorage.removeItem("walletAddress");
      localStorage.removeItem("user");

      // Reset all auth states
      setIsAuth(false);
      setUser(null);
      setToken("");
      setRefreshToken("");
      setWalletAddress("");
    };

    try {
      const response = await fetch(logoutApiEndpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });

      // Handle both success and token expired cases
      if (response.status === 401) {
        cleanup();
        return { success: true, message: "Logged out successfully" };
      }

      const result = await response.json();
      cleanup();
      return result;
    } catch (error) {
      console.error("Logout error:", error);
      cleanup(); // Ensure cleanup even on network errors
      return {
        success: true,
        message: "Logged out successfully",
        error: error.message,
      };
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
      return address;
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Error connecting wallet");
    }
  };

  if (!user) {
    fetchUserData();
  }

  // useEffect(() => {
  //   console.log("------ Auth State ------");
  //   console.log("User:", user);
  //   console.log("isAuth:", isAuth);
  //   console.log("Wallet Address:", walletAddress);
  //   console.log("Token:", token);
  //   console.log("Refresh Token:", refreshToken);
  //   console.log("------------------------");
  // }, [user, isAuth, walletAddress, token, refreshToken]);

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
