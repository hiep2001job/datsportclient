import React from "react";
import Ex from "../../assets/images/banner.avif";
import Button from "../../share/button/Button";
const DetailProduct = () => {
  return (
    <div
      id="detail-product"
      className="flex items-start justify-center w-4/5 m-auto py-10"
    >
      <div className="w-60% mr-12 relative">
        <header className="text-black text-15 pb-4 font-semibold">
          Trang chu / Ao nam
        </header>
        <img className="h-500" src={Ex} alt="alt" />
        <div className="thumb-preview absolute top-14 left-4">
          <img
            className="w-40 h-50 mb-2 rounded-md object-cover opacity-80 cursor-pointer border-slate-200 border-1"
            src={Ex}
            alt="exx"
          />
          <img
            className="w-40 h-50 mb-2 rounded-md object-cover opacity-80 cursor-pointer  border-slate-200 border"
            src={Ex}
            alt="exx"
          />
          <img
            className="w-40 h-50 mb-2 rounded-md object-cover opacity-80 cursor-pointer  border-slate-200 border"
            src={Ex}
            alt="exx"
          />
        </div>
      </div>
      <div className="w-40%">
        <div className="detail-right-header pt-4">
          <h3 className="text-35 font-semibold text-black">
            Ao Polo the thao nam moi nhat 2023
          </h3>
          <div className="flex items-center mt-10">
            <p className="text-25 font-semibold mr-2">230.000d</p>
            <div className="produt-sold  bg-color_yellow rounded-sm  w-fit border-b-2 border-color_black border-r-2 -mt-4">
              <p className="px-2  text-sm">
                Da ban <span className="font-semibold">2341</span>
              </p>
            </div>
          </div>
        </div>
        <div className="detail-choose-color mt-4">
          <p className="font-15 mb-2">
            Mau ao: <span className="font-bold">Den</span>
          </p>
          <div className="btn-group flex items-center">
            <span className="inline-block cursor-pointer rounded-md mr-2 px-4 py-2 bg-slate-400">
              Den
            </span>
            <span className="inline-block cursor-pointer rounded-md mr-2 px-4 py-2 bg-slate-400">
              Den
            </span>
            <span className="inline-block cursor-pointer rounded-md mr-2 px-4 py-2 bg-slate-400">
              Den
            </span>
          </div>
        </div>
        <div className="detail-choose-size mt-10 mb-8">
          <p className="mb-2">
            Kích thước: <span className="font-bold">S</span>
          </p>
          <div className="flex items-center">
            <span className="w-14 h-9 mr-2 flex items-center justify-center rounded-md bg-slate-200 cursor-pointer">
              S
            </span>
            <span className="w-14 h-9 mr-2 flex items-center justify-center rounded-md bg-slate-200 cursor-pointer">
              M
            </span>
            <span className="w-14 h-9 mr-2 flex items-center justify-center rounded-md bg-slate-200 cursor-pointer">
              L
            </span>
            <span className="w-14 h-9 mr-2 flex items-center justify-center rounded-md bg-slate-200 cursor-pointer">
              XL
            </span>
            <span className="w-14 h-9 mr-2 flex items-center justify-center rounded-md bg-slate-200 cursor-pointer">
              2XL
            </span>
            <span className="w-14 h-9 mr-2 flex items-center justify-center rounded-md bg-slate-200 cursor-pointer">
              3XL
            </span>
          </div>
        </div>

        <div className="flex">
          <div className="detail-qty flex items-center justify-between border w-110 rounded-md border-black px-2 py-1 mr-4">
            <button className="text-20 font-semibold cursor-pointer">-</button>
            <input
              type="number"
              disabled
              value={1}
              className="w-3 text-20 font-semibold bg-transparent"
            />
            <button className="text-20 font-semibold cursor-pointer">+</button>
          </div>
          <Button text="Thêm vào giỏ hàng" />
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
