import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("userToken") || "");

  const headers = {
    token,
  };

  // Fetch cart data only when token exists
  const { data, refetch, isFetching } = useQuery({
    queryKey: ["cart", token],
    queryFn: async () => {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers }
      );
      return response.data;
    },
    enabled: !!token,
  });

  useEffect(() => {
    if (data) {
      setCart(data);
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    const handleTokenChange = () => {
      const newToken = localStorage.getItem("userToken") || "";
      if (newToken !== token) {
        setToken(newToken);
        refetch();
      }
    };

    window.addEventListener("storage", handleTokenChange);
    return () => {
      window.removeEventListener("storage", handleTokenChange);
    };
  }, [token, refetch]);

  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [token]);

  // Update product count in cart
  async function updateProductCounttoCart(productId, count) {
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers }
      );
      setCart(data);
      toast.success(data.status, { duration: 1000, position: "bottom-right" });
      refetch();
    } catch (err) {
      console.log(err);
    }
  }

  // Delete a product from the cart
  async function deleteProductCart(productId) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers }
      );
      setCart(data);
      toast.success(data.status, { duration: 2000, position: "bottom-right" });
      refetch();
    } catch (err) {
      console.log(err);
    }
  }

  // Add a product to the cart
  async function addProductToCart(productId) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers }
      );
      toast.success(data.message, { duration: 2000, position: "bottom-right" });
      refetch();
    } catch (err) {
      console.log(err);
      toast.error("Failed to add product to cart. Please try again.");
    }
  }

  // Clear the entire cart
  async function clearCart() {
    try {
      const { data } = await axios.delete(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers }
      );
      toast.success(data.message, { duration: 2000, position: "bottom-right" });
      refetch();
    } catch (err) {
      console.log(err);
      toast.error("Failed to clear the cart. Please try again.");
    }
  }

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        cart,
        updateProductCounttoCart,
        deleteProductCart,
        setCart,
        clearCart,
        isLoading: isLoading || isFetching,
        getProductsCart: refetch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext };
