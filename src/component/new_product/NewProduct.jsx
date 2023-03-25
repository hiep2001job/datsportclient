import React from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import CardProduct from "../../share/card_product/CardProduct";
import Title from "../../share/Title/Title";

const NewProduct = () => {
  const data = [
    {
      alt_img: "hello image",
      price: "2.300.000",
      name: "addidas",
      group: "Nu auth",
    },
    {
      alt_img: "hello image",
      price: "2.300.000",
      name: "addidas",
      group: "Nu auth",
    },
    {
      alt_img: "hello image",
      price: "2.300.000",
      name: "addidas",
      group: "Nu auth",
    },
    {
      alt_img: "hello image",
      price: "2.300.000",
      name: "addidas",
      group: "Nu auth",
    },
    {
      alt_img: "hello image",
      price: "2.300.000",
      name: "addidas",
      group: "Nu auth",
    },
    {
      alt_img: "hello image",
      price: "2.300.000",
      name: "addidas",
      group: "Nu auth",
    },
    {
      alt_img: "hello image",
      price: "2.300.000",
      name: "addidas",
      group: "Nu auth",
    },
    {
      alt_img: "hello image",
      price: "2.300.000",
      name: "addidas",
      group: "Nu auth",
    },
    {
      alt_img: "hello image",
      price: "2.300.000",
      name: "addidas",
      group: "Nu auth",
    },
  ];
  return (
    <div className="w-full px-3">
      <Title isIon title="new product" />
      <div className="w-full h-auto flex items-center justify-start">
        <div className="wrapper-slide">
          <Swiper
            cssMode={true}
            pagination={true}
            mousewheel={true}
            slidesPerView={5}
            spaceBetween={15}
            keyboard={true}
            loop
            speed={200}
            modules={[Navigation, Pagination]}
            className="mySwiper"
            navigation={{
              nextEl: ".button-next-slide",
              prevEl: ".button-prev-slide",
            }}
          >
            {data.map((slide, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <CardProduct
                    alt_img={slide.alt_img}
                    price={slide.price}
                    name={slide.name}
                    group={slide.group}
                    qty_slider={5}
                  />
                </SwiperSlide>
              );
            })}
            <div className="group-btn-slide">
              <div className="button-prev-slide">
                <GrPrevious size={22} className="icon" />
              </div>
              <div className="button-next-slide">
                <GrNext size={22} className="icon" />
              </div>
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
