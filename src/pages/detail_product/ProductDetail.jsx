// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import React, { useState } from 'react';

import classnames from 'classnames';
import { Markup } from 'react-render-markup';
import {
  Link,
  useParams,
} from 'react-router-dom';
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Tooltip,
} from 'reactstrap';
import SwiperCore, {
  FreeMode,
  Navigation,
  Thumbs,
} from 'swiper';
import {
  Swiper,
  SwiperSlide,
} from 'swiper/react';

import product1 from '../../assets/images/products/img-1.png';
import product6 from '../../assets/images/products/img-6.png';
import product8 from '../../assets/images/products/img-8.png';
import BreadCrumb from '../../component/common/BreadCrumb';
import useProductDetail from '../../hooks/useProductDetail';
import { formatVnd } from '../../utils/common.js';

SwiperCore.use([FreeMode, Navigation, Thumbs]);


function ProductDetail(props) {
  const { id } = useParams();
  const { product, loading } = useProductDetail(id);

  const [thumbsSwiper, setThumbsSwiper] = useState([]);
  const [ttop, setttop] = useState(false);

  const [xssize, setxssize] = useState(false);
  const [ssize, setssize] = useState(false);
  const [msize, setmsize] = useState(false);
  const [lsize, setlsize] = useState(false);
  const [xlsize, setxlsize] = useState(false);
  const [customActiveTab, setcustomActiveTab] = useState("1");
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Product Details" pageTitle="Ecommerce" />

        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <Row className="gx-lg-5">
                  <Col xl={4} md={8} className="mx-auto">
                    <div className="product-img-slider sticky-side-div">
                      <Swiper
                        navigation={true}
                        // thumbs={{ swiper: thumbsSwiper }}
                        className="swiper product-thumbnail-slider p-2 rounded bg-light"
                      >
                        <div className="swiper-wrapper">
                          <SwiperSlide>
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Spiderman.JPG/375px-Spiderman.JPG"
                              alt=""
                              className="img-fluid d-block"
                            />
                          </SwiperSlide>
                          <SwiperSlide>
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Spiderman.JPG/375px-Spiderman.JPG"
                              alt=""
                              className="img-fluid d-block"
                            />
                          </SwiperSlide>
                          <SwiperSlide>
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Spiderman.JPG/375px-Spiderman.JPG"
                              alt=""
                              className="img-fluid d-block"
                            />
                          </SwiperSlide>
                          <SwiperSlide>
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Spiderman.JPG/375px-Spiderman.JPG"
                              alt=""
                              className="img-fluid d-block"
                            />
                          </SwiperSlide>
                        </div>
                      </Swiper>

                      <div className="product-nav-slider mt-2">
                        <Swiper
                          onSwiper={setThumbsSwiper}
                          slidesPerView={4}
                          freeMode={true}
                          watchSlidesProgress={true}
                          spaceBetween={10}
                          className="swiper product-nav-slider mt-2 overflow-hidden"
                        >
                          <div className="swiper-wrapper">
                            <SwiperSlide className="rounded">
                              <div className="nav-slide-item">
                                <img
                                  src={product8}
                                  alt=""
                                  className="img-fluid d-block rounded"
                                />
                              </div>
                            </SwiperSlide>
                            <SwiperSlide>
                              <div className="nav-slide-item">
                                <img
                                  src={product6}
                                  alt=""
                                  className="img-fluid d-block rounded"
                                />
                              </div>
                            </SwiperSlide>
                            <SwiperSlide>
                              <div className="nav-slide-item">
                                <img
                                  src={product1}
                                  alt=""
                                  className="img-fluid d-block rounded"
                                />
                              </div>
                            </SwiperSlide>
                            <SwiperSlide>
                              <div className="nav-slide-item">
                                <img
                                  src={product8}
                                  alt=""
                                  className="img-fluid d-block rounded"
                                />
                              </div>
                            </SwiperSlide>
                          </div>
                        </Swiper>
                      </div>
                    </div>
                  </Col>

                  <Col xl={8}>
                    <div className="mt-xl-0 mt-5">
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <h4>{product.productName}</h4>
                          <div className="hstack gap-3 flex-wrap">
                            {product.productHot&&<div>
                              <span class="badge badge-label bg-danger"><i class="mdi mdi-circle-medium"></i> Hot</span>
                            </div>}
                            
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <div>
                            <Tooltip
                              placement="top"
                              isOpen={ttop}
                              target="TooltipTop"
                              toggle={() => {
                                setttop(!ttop);
                              }}
                            >
                              Edit
                            </Tooltip>
                            <a
                              href="apps-ecommerce-add-product"
                              id="TooltipTop"
                              className="btn btn-light"
                            >
                              <i className="ri-pencil-fill align-bottom"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Row className="mt-4">
                        <Col lg={3} sm={6}>
                          <div className="p-2 border border-dashed rounded">
                            <div className="d-flex align-items-center">
                              <div className="avatar-sm me-2">
                                <div className="avatar-title rounded bg-transparent text-success fs-24">
                                  <i className="ri-money-dollar-circle-fill"></i>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <p className="text-muted mb-1">
                                  Price :
                                </p>
                                <h5 className="mb-0">
                                  {formatVnd(product.productPrice)}
                                </h5>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col lg={3} sm={6}>
                          <div className="p-2 border border-dashed rounded">
                            <div className="d-flex align-items-center">
                              <div className="avatar-sm me-2">
                                <div className="avatar-title rounded bg-transparent text-success fs-24">
                                  <i className="ri-stack-fill"></i>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <p className="text-muted mb-1">
                                  Available stocks :
                                </p>
                                <h5 className="mb-0">
                                  {product.productQuantity}
                                </h5>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col xl={6}>
                          <div className=" mt-4">
                            <h5 className="fs-14">Sizes :</h5>
                            <div className="d-flex flex-wrap gap-2">
                              <Tooltip
                                placement="top"
                                isOpen={xssize}
                                target="TooltipXSSize"
                                toggle={() => {
                                  setssize(!ssize);
                                }}
                              ></Tooltip>
                              <Tooltip
                                placement="top"
                                isOpen={ssize}
                                target="TooltipSSize"
                                toggle={() => {
                                  setssize(!ssize);
                                }}
                              >
                                Out of Stock
                              </Tooltip>
                              <Tooltip
                                placement="top"
                                isOpen={msize}
                                target="TooltipMSize"
                                toggle={() => {
                                  setmsize(!msize);
                                }}
                              >
                                04 Items Available
                              </Tooltip>
                              <Tooltip
                                placement="top"
                                isOpen={lsize}
                                target="TooltipLSize"
                                toggle={() => {
                                  setlsize(!lsize);
                                }}
                              >
                                06 Items Available
                              </Tooltip>
                              <Tooltip
                                placement="top"
                                isOpen={xlsize}
                                target="TooltipXlSize"
                                toggle={() => {
                                  setxlsize(!xlsize);
                                }}
                              >
                                Out of Stock
                              </Tooltip>
                              <Input
                                type="radio"
                                className="btn-check"
                                name="productsize-radio"
                              />
                              <Label
                                className="btn btn-soft-primary avatar-xs rounded-circle p-0 d-flex justify-content-center align-items-center"
                                id="TooltipXSSize"
                              >
                                XS
                              </Label>

                              <Input
                                type="radio"
                                className="btn-check"
                                name="productsize-radio"
                              />
                              <Label
                                className="btn btn-soft-primary avatar-xs rounded-circle p-0 d-flex justify-content-center align-items-center"
                                id="TooltipSSize"
                              >
                                S
                              </Label>

                              <Input
                                type="radio"
                                className="btn-check"
                                name="productsize-radio"
                              />
                              <Label
                                className="btn btn-soft-primary avatar-xs rounded-circle p-0 d-flex justify-content-center align-items-center"
                                id="TooltipMSize"
                              >
                                M
                              </Label>

                              <Input
                                type="radio"
                                className="btn-check"
                                name="productsize-radio"
                              />
                              <Label
                                className="btn btn-soft-primary avatar-xs rounded-circle p-0 d-flex justify-content-center align-items-center"
                                id="TooltipLSize"
                              >
                                L
                              </Label>

                              <Input
                                type="radio"
                                className="btn-check"
                                name="productsize-radio"
                              />
                              <Label
                                className="btn btn-soft-primary avatar-xs rounded-circle p-0 d-flex justify-content-center align-items-center"
                                id="TooltipXlSize"
                              >
                                XL
                              </Label>
                            </div>
                          </div>
                        </Col>
                      </Row>                     

                      <div className="product-content mt-5">
                        <h5 className="fs-14 mb-3">Product Description :</h5>
                        <Nav tabs className="nav-tabs-custom nav-success">
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: customActiveTab === "1",
                              })}
                              onClick={() => {
                                toggleCustom("1");
                              }}
                            >
                              Specification
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: customActiveTab === "2",
                              })}
                              onClick={() => {
                                toggleCustom("2");
                              }}
                            >
                              Details
                            </NavLink>
                          </NavItem>
                        </Nav>

                        <TabContent
                          activeTab={customActiveTab}
                          className="border border-top-0 p-4"
                          id="nav-tabContent"
                        >
                          <TabPane id="nav-speci" tabId="1">
                            <div className="table-responsive">
                              <table className="table mb-0">
                                <tbody>
                                  <tr>
                                    <th scope="row" style={{ width: "200px" }}>
                                      Category
                                    </th>
                                    <td>T-Shirt</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Brand</th>
                                    <td>Tommy Hilfiger</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Color</th>
                                    <td>Blue</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Material</th>
                                    <td>Cotton</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Weight</th>
                                    <td>140 Gram</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </TabPane>
                          <TabPane id="nav-detail" tabId="2">
                           <Markup markup={product.productDescription} />
                          </TabPane>
                        </TabContent>
                      </div>

                      
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProductDetail;
