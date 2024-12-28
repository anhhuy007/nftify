import { createContext, useState, useContext, useEffect } from "react";
import { AUTH_ENDPOINTS, USER_ENDPOINTS } from "../handlers/Endpoints";

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
    if (!isAuth) {
      console.log("User not authenticated");
      return;
    }

    try {
      const response = await fetch(USER_ENDPOINTS.GET_USER, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (result.success === false) {
        throw new Error(result.message);
      }

      setUser(result.data);
      localStorage.setItem("user", JSON.stringify(result.data));
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
    }
  };

  const registerAction = async (data) => {
    try {
      const response = await fetch(AUTH_ENDPOINTS.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success === true) {
        return result;
      }

      return { error: result.message };
    } catch (error) {
      return { error: error.message };
    }
  };

  const loginAction = async (data) => {
    try {
      const response = await fetch(AUTH_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success === true) {
        const data = result.data;

        // fetch user data
        await fetchUserData();
        setToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        setIsAuth(true);
        localStorage.setItem("jwtToken", data.accessToken);
        localStorage.setItem("jwtRefreshToken", data.refreshToken);

        return data;
      }

      return { error: result.message };
    } catch (error) {
      return { error: error.message };
    }
  };

  const refreshAccessToken = async () => {
    try {
      const response = await fetch(AUTH_ENDPOINTS.REFRESH, {
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
      localStorage.removeItem("user");

      // Reset all auth states
      setIsAuth(false);
      setUser(null);
      setToken("");
      setRefreshToken("");
    };

    try {
      const response = await fetch(AUTH_ENDPOINTS.LOGOUT, {
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

  if (!user) {
    fetchUserData();
  }
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        registerAction,
        loginAction,
        logoutAction,
        refreshAccessToken,
        fetchUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
