import React from "react";
import Router from "./routes/Router";
import "swiper/swiper-bundle.css";
import SwiperCore, { Autoplay } from "swiper";

const App = () => {
  SwiperCore.use([Autoplay]);
  return <Router />;
};

export default App;
