import Navbar from "../Navbar/Navbar";
// import style from "./Layout.module.css";
import Footer from "./../Footer/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="container py-12 mt-6 min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
