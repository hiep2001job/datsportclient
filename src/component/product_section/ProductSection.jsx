import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import './ProductSection.scss';

import React from 'react';

import {
  GrNext,
  GrPrevious,
} from 'react-icons/gr';
import {
  Container,
  Row,
} from 'reactstrap';
import {
  Navigation,
  Pagination,
} from 'swiper';
import {
  Swiper,
  SwiperSlide,
} from 'swiper/react';

import CardProduct from '../../share/card_product/CardProduct';
import Title from '../../share/Title/Title';

const ProductSection = ({ sectionName, productList }) => {
  const data = [
    {
      productId: 1,
      productImage:
        "https://down-vn.img.susercontent.com/file/sg-11134201-22090-m8j2dwol22hvc0",
      productPrice: 150000,
      productName:
        "Áo khoác cadigan nam nữ chất cotton tổ ong cao cấp, dễ mặc dễ phối đồ, hợp mọi thời đại",
      productDescription:
        "Áo khoác cadigan nam nữ chất cotton tổ ong cao cấp, dễ mặc dễ phối đồ, hợp mọi thời đại",
    },
    {
      productId: 1,
      productImage:
        "https://down-vn.img.susercontent.com/file/sg-11134201-22090-m8j2dwol22hvc0",
      productPrice: 150000,
      productName:
        "Áo khoác cadigan nam nữ chất cotton tổ ong cao cấp, dễ mặc dễ phối đồ, hợp mọi thời đại",
      productDescription:
        "Áo khoác cadigan nam nữ chất cotton tổ ong cao cấp, dễ mặc dễ phối đồ, hợp mọi thời đại",
    },
    {
      productId: 1,
      productImage:
        "https://down-vn.img.susercontent.com/file/sg-11134201-22090-m8j2dwol22hvc0",
      productPrice: 150000,
      productName:
        "Áo khoác cadigan nam nữ chất cotton tổ ong cao cấp, dễ mặc dễ phối đồ, hợp mọi thời đại",
      productDescription:
        "Áo khoác cadigan nam nữ chất cotton tổ ong cao cấp, dễ mặc dễ phối đồ, hợp mọi thời đại",
    },
    {
      productId: 1,
      productImage:
        "https://down-vn.img.susercontent.com/file/sg-11134201-22090-m8j2dwol22hvc0",
      productPrice: 150000,
      productName:
        "Áo khoác cadigan nam nữ chất cotton tổ ong cao cấp, dễ mặc dễ phối đồ, hợp mọi thời đại",
      productDescription:
        "Áo khoác cadigan nam nữ chất cotton tổ ong cao cấp, dễ mặc dễ phối đồ, hợp mọi thời đại",
    },
  ];
  return (
    <Container>
      <Row>
        <Title isIon title={sectionName} />
        <div className="slide-area">
          <div className="wrapper-slide">
            <Swiper
              cssMode={true}
              pagination={true}
              mousewheel={true}
              slidesPerView={3}
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
              <Row>
                {data.map((product, idx) => {
                  return (
                    <SwiperSlide key={idx}>
                      <CardProduct {...product} />
                    </SwiperSlide>
                  );
                })}
              </Row>
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
      </Row>
    </Container>
  );
};

export default ProductSection;
