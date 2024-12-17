import { useAuth } from "@/context/AuthProvider";

const useAuthHandler = () => {
  const { isAuth, refreshAccessToken, logoutAction } = useAuth();
  
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const handleTokenRefresh = async () => {
    try {
      const newToken = await refreshAccessToken();
      if (!newToken) {
        await logoutAction();
        throw new Error("Failed to refresh token");
      }
      return newToken;
    } catch (error) {
      await logoutAction();
      throw error;
    }
  };

  const fetchWithAuth = async (url, options = {}) => {
    if (!isAuth) {
      throw new Error("User not authenticated");
    }

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      throw new Error("No token found");
    }
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await fetch(url, { ...options, headers });

      if (response.status === 401) {
        const newToken = await handleTokenRefresh();
        const newHeaders = {
          ...headers,
          Authorization: `Bearer ${newToken}`,
        };

        const newResponse = await fetch(url, {
          ...options,
          headers: newHeaders,
        });
      
        return newResponse.json();
      }

      return response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  };

  return { fetcher, fetchWithAuth };
};

export { useAuthHandler };
