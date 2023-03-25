import React from "react";
// <<<<<<< HEAD
// import { GrNext, GrPrevious } from "react-icons/gr";
// import { Autoplay, Navigation, Pagination } from "swiper";
// import { SwiperSlide, Swiper as SwiperBanner } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper as SwiperBanner, SwiperSlide } from "swiper/react";
import ImgBanner from "../../assets/images/banner.avif";
import ImgBanner2 from "../../assets/images/banner2.avif";
import ImgBanner3 from "../../assets/images/banner3.avif";
const Banner = () => {
  const data = [
    { id: 1, src: ImgBanner },
    { id: 2, src: ImgBanner2 },
    { id: 3, src: ImgBanner3 },
  ];
  return (
    <div id="banner" className="h-600 w-full">
      <div className="w-full h-full relative">
        <div className="w-full h-full flex items-center justify-start">
          <div className="wrapper-slide px-0">
            <SwiperBanner
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
            </SwiperBanner>
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
  );
};

export default Banner;
