import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CartContext } from "./CartContext";

const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  const { token } = useContext(CartContext);
  const headers = { token: localStorage.getItem("userToken") };
  const [wishlistData, setWishlistData] = useState({ items: [], count: 0 });

  function getLoggedUserToWishList() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers,
    });
  }

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getLoggedUserToWishList", token],
    queryFn: getLoggedUserToWishList,
    enabled: !!token,
    select: (res) => ({
      items: res.data.data,
      count: res.data.count,
    }),
  });

  useEffect(() => {
    if (data) {
      // console.log(data);
      setWishlistData(data);
    }
  }, [data]);

  async function DeleteFromWishList(productId) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers }
      );
      toast.success(data.message, { duration: 2000, position: "bottom-right" });
      refetch();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  async function AddToWishList(productId) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers }
      );
      toast.success(data.message, { duration: 2000, position: "bottom-right" });
      refetch();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistData,
        isLoading,
        AddToWishList,
        DeleteFromWishList,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export { WishlistContext };
