import React from "react";
import AccordionItem from "../../share/accordion_item/AccordionItem";
import LoadingSpinner from "../../share/loading_spinner/LoadingSpinner";
import SwiperSlider from "../../share/swiper_slider/SwiperSlider";
import DetailProduct from "../detail_product/DetailProduct";

const Example1 = () => {
  return (
    <>
      <AccordionItem />
      <LoadingSpinner />
      <SwiperSlider />
      <DetailProduct />
    </>
  );
};

export default Example1;
