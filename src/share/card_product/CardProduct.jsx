import React from "react";
import { Link } from "react-router-dom";

const CardProduct = ({
  image,
  price,
  name,
  brand,
  category,
  group,
  state,
  alt_img,
  qty_slider,
  product_id,
}) => {
  return (
    <Link to={`detail-product/${product_id}`}>
      <div className="w-[calc(100%)] h-auto px-1 cursor-pointer rounded group">
        <div className={` relative ${qty_slider === 3 ? "h-400" : "h-72"}`}>
          <img
            className="w-full h-full object-cover rounded group-hover:scale-105 transition-all duration-75"
            src="https://images.unsplash.com/photo-1616615965190-08884c4d85c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YWRkaWRhc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt={alt_img || "default img alt"}
          />
          <div className="flex justify-end absolute right-0 -bottom-4 group-hover:-translate-y-2 duration-75">
            <p
              className={`${
                qty_slider === 3 ? "text-20 p-4" : "text-15 p-2"
              } bg-slate-200 w-fit text-color_black font-semibold text-end`}
            >
              {price}
            </p>
          </div>
        </div>
        <div className="pt-1 pb-2 border shadow-xs px-2 rounded">
          <p className=" text-color_black font-semibold text-20">{name}</p>
          <p className="text-slate-700">{group}</p>
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;
