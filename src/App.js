//import Scss
import './assets/scss/themes.scss';
import 'swiper/swiper-bundle.css';

import React from 'react';

import SwiperCore, { Autoplay } from 'swiper';

import Router from './routes/Router';

const App = () => {
  SwiperCore.use([Autoplay]);
  return <Router />;
};

export default App;
