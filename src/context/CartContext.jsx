import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const headers = {
    token: localStorage.getItem("userToken"),
  };

  // Fetch cart data
  async function getProductsCart() {
    try {
      setIsLoading(true); // Set loading to true while fetching
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers,
        }
      );
      setCart(data);
      setIsLoading(false); // Set loading to false after fetching
    } catch (err) {
      console.log(err);
      setIsLoading(false); // Set loading to false on error
    }
  }

  // Update product count in cart
  async function updateProductCounttoCart(productId, count) {
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        {
          headers,
        }
      );
      setCart(data);
      toast.success(data.status, { duration: 1000, position: "bottom-right" });
    } catch (err) {
      console.log(err);
    }
  }

  // Delete a product from the cart
  async function deleteProductCart(productId) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers,
        }
      );
      setCart(data);
      toast.success(data.status, { duration: 2000, position: "bottom-right" });
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
        {
          headers,
        }
      );
      getProductsCart(); // Refresh cart data
      toast.success(data.message, { duration: 2000, position: "bottom-right" });
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
        {
          headers,
        }
      );
      getProductsCart();
      toast.success(data.message, { duration: 2000, position: "bottom-right" });
    } catch (err) {
      console.log(err);
      toast.error("Failed to clear the cart. Please try again.");
    }
  }

  // Fetch cart data on component mount
  useEffect(() => {
    getProductsCart();
  }, []); // Empty dependency array to run only once on mount

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        cart,
        updateProductCounttoCart,
        deleteProductCart,
        setCart,
        clearCart,
        isLoading,
        getProductsCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext };
