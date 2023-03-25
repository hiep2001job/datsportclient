import React from "react";
import { BiUpArrow } from "react-icons/bi";
import ScrollToTop from "react-scroll-to-top";
import HotProduct from "../../component/hot_product/HotProduct";
import NewProduct from "../../component/new_product/NewProduct";
import WhoChooseProduct from "../../component/who_choose_product/WhoChooseProduct";
import Banner from "../../share/banner/Banner";
const Home = () => {
  return (
    <>
      <div id="home">
        <Banner />
        <HotProduct />
        <NewProduct />
        <WhoChooseProduct />
        <ScrollToTop
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "yellow",
          }}
          smooth
          viewBox="0 0 24 24"
          component={<BiUpArrow />}
        />
      </div>
    </>
  );
};

export default Home;
