import React from "react";

// import { GrNext, GrPrevious } from "react-icons/gr";
// import { Autoplay, Navigation, Pagination } from "swiper";
// import { SwiperSlide, Swiper as SwiperBanner } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper , SwiperSlide } from "swiper/react";
import ImgBanner from "../../assets/images/banner.avif";
import ImgBanner2 from "../../assets/images/banner2.avif";
import ImgBanner3 from "../../assets/images/banner3.avif";
import "./Banner.scss";
const Banner = () => {
  const data = [
    { id: 1, src: ImgBanner },
    { id: 2, src: ImgBanner2 },
    { id: 3, src: ImgBanner3 },
  ];
  return (
    <div id="banner" className="banner">
      <div className="banner-wrapper">
        <div className="slider-wrapper">
          <div className="wrapper-slide px-0">
            <Swiper
              cssMode={true}
              pagination={true}
              mousewheel={true}
              slidesPerView={1}
              spaceBetween={15}
              keyboard={true}
              autoplay={{
                delay: 2500,
              }}
              loop
              speed={200}
              modules={[Autoplay, Navigation, Pagination]}
              className="bannerSwiper"
              style={{ paddingTop: "0", paddingLeft: 0, paddingRight: 0 }}
            >
              {data.map((slide, idx) => {
                return (
                  <SwiperSlide key={idx}>
                    <img src={slide.src} alt="image_alt" />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
        <div className="absolute top-40 left-20">
          <h1 className="text-55 uppercase font-semibold text-color_white">
            Nơi đây
            <p className="ml-12 mt-1">có thứ bạn cần...</p>
          </h1>
        </div>
      </div>
    </div>
    // <Swiper
    //   pagination={{ clickable: true, dynamicBullets: true }}
    //   modules={[Pagination, Autoplay]}
    //   loop={true}
    //   autoplay={{ delay: 2500, disableOnInteraction: false }}
    //   className="mySwiper swiper pagination-dynamic-swiper rounded"
    // >
    //   <div className="swiper-wrapper">
    //     <SwiperSlide>
    //       <img src={ImgBanner} alt="" className="img-fluid" />
    //     </SwiperSlide>
    //     <SwiperSlide>
    //       <img src={ImgBanner2} alt="" className="img-fluid" />
    //     </SwiperSlide>
    //     <SwiperSlide>
    //       <img src={ImgBanner3} alt="" className="img-fluid" />
    //     </SwiperSlide>
    //   </div>
    // </Swiper>
  );
};

export default Banner;
