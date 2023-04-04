import React from 'react';

import { BiUpArrow } from 'react-icons/bi';
import ScrollToTop from 'react-scroll-to-top';

import ProductSection from '../../component/product_section/ProductSection';
import WhoChooseProduct from '../../component/who_choose_product/WhoChooseProduct';
import Banner from '../../share/banner/Banner';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import productActions  from "../../redux/productSlice";


const Home = () => {

  const dispatch = useDispatch();
  const newProducts = useSelector((state) => state.product.dataNewProducts);

  //Get active products
  if(newProducts.length){
    dispatch(productActions.getAll(1));
  }

  return (
    <>
      <div id="home">
        <Banner />
        <ProductSection data={[...newProducts]} sectionName="Hot Product" />
        <ProductSection data={[...newProducts]} sectionName="New Product"/>
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
