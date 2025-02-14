import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./components/Home/Home.jsx";
import Categories from "./components/Categories/Categories.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Brands from "./components/Brands/Brands.jsx";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import Products from "./components/Products/Products.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import UserContextProvider from "./context/UserContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import CartContextProvider from "./context/CartContext.jsx";
import { Toaster } from "react-hot-toast";
import CheckOut from "./components/CheckOut/CheckOut.jsx";
import AllOrders from "./components/AllOrders/AllOrders.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import WishList from "./components/WishList/WishList.jsx";
import WishlistContextProvider from "./context/WishlistContext.jsx";
import ForgetPassword from "./components/forgetPassword/forgetPassword.jsx";
import VerifyCode from "./components/VerifyCode/VerifyCode.jsx";
import ResetPassword from "./components/ResetPassword/ResetPassword.jsx";
import SubCategory from "./components/SubCategorey/SubCategorey.jsx";
const routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "forgetpassword", element: <ForgetPassword /> },
      { path: "verifycode", element: <VerifyCode /> },
      { path: "resetpassword", element: <ResetPassword /> },
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "subcategory/:id",
        element: (
          <ProtectedRoute>
            <SubCategory />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const query = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={query}>
      <CartContextProvider>
        <WishlistContextProvider>
          <UserContextProvider>
            <RouterProvider router={routers} />
            <ReactQueryDevtools />
            <Toaster />
          </UserContextProvider>
        </WishlistContextProvider>
      </CartContextProvider>
    </QueryClientProvider>
  );
}

export default App;
