import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

export default function ProtectedRoute({ children }) {
  const { setToken } = useContext(CartContext);
  const userToken = localStorage.getItem("userToken");

  useEffect(() => {
    if (userToken) {
      setToken(true);
    }
  }, [userToken, setToken]); // Ensure `useEffect` runs when userToken changes

  if (!userToken) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
