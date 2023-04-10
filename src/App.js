//import Scss
import "./assets/scss/themes.scss";
import "swiper/swiper-bundle.css";
import { ToastContainer } from "react-toastify";

import React from "react";

import SwiperCore, { Autoplay } from "swiper";

import Router from "./routes/Router";
import { useSelector } from "react-redux";

const App = () => {
  const { message, type } = useSelector((state) => state.toast);
  SwiperCore.use([Autoplay]);
  
  return (
    <>
     <Router />
     <ToastContainer />;
    </>
  );
};

export default App;
