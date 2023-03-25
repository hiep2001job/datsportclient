import React from "react";
import Header from "../../share/header/Header";
import Footer from "../footer/Footer";
import Home from "../home/Home";
import { Outlet } from "react-router-dom";

const GlobalNavigation = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default GlobalNavigation;
