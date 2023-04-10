//import Scss
import "./assets/scss/themes.scss";
import "swiper/swiper-bundle.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React from "react";

import SwiperCore, { Autoplay } from "swiper";

import Router from "./routes/Router";

const App = () => {
  SwiperCore.use([Autoplay]);
  
  return (
    <>
     <Router />
    <ToastContainer />;
    </>
  );
};

export default App;
