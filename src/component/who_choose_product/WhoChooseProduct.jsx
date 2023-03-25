import React from "react";
import Title from "../../share/Title/Title";
import Img from "../../assets/images/banner.avif";
const WhoChooseProduct = () => {
  return (
    <div className="mt-10">
      <Title title="WHO ARE YOU SHOPPING FOR?" />
      <div className="flex items-center justify-center">
        <div className="w-25% h-400 mr-5 cursor-pointer hover:scale-95 transition-all duration-100">
          <img src={Img} className="h-full w-full" alt="" />
          <h3 className="mt-5 ml-2 text-25 font-semibold uppercase">MEN</h3>
        </div>
        <div className="w-25% h-400 mr-5 cursor-pointer hover:scale-95 transition-all duration-100">
          <img src={Img} className="h-full w-full" alt="" />
          <h3 className="mt-5 ml-2 text-25 font-semibold uppercase">WOMEN</h3>
        </div>
        <div className="w-25% h-400 mr-5 cursor-pointer hover:scale-95 transition-all duration-100">
          <img src={Img} className="h-full w-full" alt="" />
          <h3 className="mt-5 ml-2 text-25 font-semibold uppercase">KIDS</h3>
        </div>
      </div>
    </div>
  );
};

export default WhoChooseProduct;
