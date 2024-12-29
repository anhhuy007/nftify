import { createContext, useContext, useEffect, useState } from "react";
import { useAuthHandler } from "@/handlers/AuthHandler";
import { CART_ENDPOINTS } from "../handlers/Endpoints";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { fetchWithAuth } = useAuthHandler();
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCartItems = async () => {
    try {
      setIsLoading(true);
      const response = await fetchWithAuth(CART_ENDPOINTS.CART);
      if (!response) {
        throw new Error("Invalid cart data received");
      }

      setCart(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setError(error.message);
      setCart([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const addItemToCart = async (nftId) => {
    try {
      const response = await fetchWithAuth(CART_ENDPOINTS.CART, {
        method: "POST",
        body: JSON.stringify({ itemId: nftId }),
      });

      console.log("Add to cart response:", response);

      if (!response.success) {
        throw new Error(response.message);
      }

      fetchCartItems();
      return true;
    } catch (error) {
      console.error("Add to cart error:", error);
      throw error;
    }
  };

  const removeItemFromCart = async (nftId) => {
    try {
      const response = await fetchWithAuth(`${CART_ENDPOINTS.CART}`, {
        method: "DELETE",
        body: JSON.stringify({ itemId: nftId }),
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      fetchCartItems();
      return true;
    } catch (error) {
      console.error("Remove from cart error:", error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetchWithAuth(`${CART_ENDPOINTS.CART}/clear`, {
        method: "DELETE",
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      fetchCartItems();
      return true;
    } catch (error) {
      console.error("Clear cart error:", error);
      throw error;
    }
  };

  const checkoutCart = async () => {
    try {
      const response = await fetchWithAuth(`${CART_ENDPOINTS.CART}/checkout`, {
        method: "POST",
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      clearCart();
      fetchCartItems();

      return true;
    } catch (error) {
      console.error("Checkout cart error:", error);
      throw error;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        error,
        addItemToCart,
        removeItemFromCart,
        refreshCart: fetchCartItems,
        clearCart,
        checkoutCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
