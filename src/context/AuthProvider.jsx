import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('jwtToken') || "");

  useEffect(() => {
    if (token) {
      fetchUserData(token);
    }
  }, [token]);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch('/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setUser(data.user);
    }
    catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  const loginAction = async (data) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      if (result.token) {
        setUser(result.user);
        setToken(result.token);
        localStorage.setItem('jwtToken', result.token);
  
        return result;
      }
      throw new Error('Login failed:', result.message);
    } catch (error) {
      console.error('Error logging in:', error);
      return { error: error.message };
    }
  };
  
  const logoutAction = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('jwtToken');
  };

  return (
    <AuthContext.Provider value={{ user, loginAction, logoutAction }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

