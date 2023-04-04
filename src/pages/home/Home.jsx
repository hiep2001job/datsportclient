import React from 'react';

import { BiUpArrow } from 'react-icons/bi';
import ScrollToTop from 'react-scroll-to-top';

import ProductSection from '../../component/product_section/ProductSection';
import WhoChooseProduct
  from '../../component/who_choose_product/WhoChooseProduct';
import Banner from '../../share/banner/Banner';

const Home = () => {
  return (
    <>
      <div id="home">
        <Banner />
        <ProductSection sectionName="Hot Product"/>
        <ProductSection sectionName="New Product"/>
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
