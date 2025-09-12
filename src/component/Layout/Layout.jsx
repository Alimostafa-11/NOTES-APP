import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-200 min-h-screen pb-20">
        <div className="pt-2">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
