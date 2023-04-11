import React, { useState,useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  CardHeader,
  Collapse
} from "reactstrap";

import classnames from "classnames";
import { Link, useParams } from "react-router-dom";
import { formatVnd } from "../../utils/common.js";

import BreadCrumb from "../../component/common/BreadCrumb";
import { productDetails } from "../../common/data/ecommerce";
import ProductDetails from "./ProductDetails";
import avatar3 from "../../assets/images/users/avatar-3.jpg";

import { useDispatch, useSelector } from "react-redux";
import {fetchOrderById} from '../../redux/orderSlice'

const BillDetail = (props) => {
  const { billId } = useParams();
  const dispatch = useDispatch();

  const {selectedOrder,billDetails}=useSelector((state=>state.order));
  
  useEffect(() => {
    if(selectedOrder==null||selectedOrder.billId!==billId){
      dispatch(fetchOrderById({billId}));
      
    }
   
  }, [dispatch,billId]);

  const handleCancelOrder=()=>{
    
  }

  const [col1, setcol1] = useState(true);
  const [col2, setcol2] = useState(true);
  const [col3, setcol3] = useState(true);

  function togglecol1() {
    setcol1(!col1);
  }

  function togglecol2() {
    setcol2(!col2);
  }

  function togglecol3() {
    setcol3(!col3);
  }

document.title ="Order Details | Velzon - React Admin & Dashboard Template";
  return (
    <div className="page-content">
      <Container fluid>        
        <BreadCrumb title="Order Details" pageTitle="Ecommerce" />

        <Row>
          <Col xl={9}>
            <Card>
              <CardHeader>
                <div className="d-flex align-items-center">
                  <h5 className="card-title flex-grow-1 mb-0">Bill #{selectedOrder?.billId}</h5>
                  <div className="flex-shrink-0 mt-2 mt-sm-0">
                    
                    <button
                      to="#"
                      onclick={handleCancelOrder}
                      className="btn btn-soft-danger btn-sm mt-2 mt-sm-0"
                    >
                      <i className="mdi mdi-archive-remove-outline align-middle me-1"></i>{" "}
                      Cancel Order
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="table-responsive table-card">
                  <table className="table table-nowrap align-middle table-borderless mb-0">
                    <thead className="table-light text-muted">
                      <tr>
                        <th scope="col">Product Details</th>
                        <th scope="col">Item Price</th>
                        <th scope="col">Quantity</th>
                       
                        <th scope="col" className="text-end">
                          Total Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {billDetails.map((item, key) => (
                        <ProductDetails item={item} key={key} />
                      ))}
                      <tr className="border-top border-top-dashed">
                        <td colSpan="3"></td>
                        <td colSpan="2" className="fw-medium p-0">
                          <table className="table table-borderless mb-0">
                            <tbody>
                              <tr>
                                <td>Sub Total :</td>
                                <td className="text-end">{formatVnd(billDetails[0]?.bill?.billTotal)}</td>
                              </tr>
                          
                              <tr className="border-top border-top-dashed">
                                <th scope="row">Total (VND) :</th>
                                <th className="text-end">{formatVnd(billDetails[0]?.bill?.billTotal)}</th>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>

          
          </Col>

          <Col xl={3}>
           

            <Card>
              <CardHeader>
                <div className="d-flex">
                  <h5 className="card-title flex-grow-1 mb-0">
                    Customer Details
                  </h5>
                  <div className="flex-shrink-0">
                    <Link to="/user/profile/info" className="link-secondary">
                      View Profile
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <ul className="list-unstyled mb-0 vstack gap-3">
                  <li>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <img
                          src={selectedOrder?.account?.userImage}
                          alt=""
                          className="avatar-sm rounded"
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6 className="fs-14 mb-1">{selectedOrder?.account?.userFullname}</h6>
                        <p className="text-muted mb-0">{selectedOrder?.account?.userEmail}</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <i className="ri-mail-line me-2 align-middle text-muted fs-16"></i>
                    {selectedOrder?.account?.userEmail}
                  </li>
                  <li>
                    <i className="ri-phone-line me-2 align-middle text-muted fs-16"></i>
                    {selectedOrder?.account?.userPhone}
                  </li>
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">
                  <i className="ri-map-pin-line align-middle me-1 text-muted"></i>{" "}
                  Billing Address
                </h5>
              </CardHeader>
              <CardBody>
                <ul className="list-unstyled vstack gap-2 fs-13 mb-0">
                  <li className="fw-medium fs-14">{selectedOrder?.account?.userFullname}</li>
                  <li>{selectedOrder?.account?.userPhone}</li>
                  <li>{selectedOrder?.userAddress}</li>
                 
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">
                  <i className="ri-map-pin-line align-middle me-1 text-muted"></i>{" "}
                  Shipping Address
                </h5>
              </CardHeader>
              <CardBody>
                <ul className="list-unstyled vstack gap-2 fs-13 mb-0">
                  <li className="fw-medium fs-14">{selectedOrder?.account?.userFullname}</li>
                  <li>{selectedOrder?.account?.userEmail}</li>
                  <li>{selectedOrder?.billAddressShip}</li>
                  
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">
                  <i className="ri-secure-payment-line align-bottom me-1 text-muted"></i>{" "}
                  Payment Details
                </h5>
              </CardHeader>
              <CardBody>
                {/* <div className="d-flex align-items-center mb-2">
                  <div className="flex-shrink-0">
                    <p className="text-muted mb-0">Transactions:</p>
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <h6 className="mb-0">#VLZ124561278124</h6>
                  </div>
                </div> */}
                <div className="d-flex align-items-center mb-2">
                  <div className="flex-shrink-0">
                    <p className="text-muted mb-0">Payment Method:</p>
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <h6 className="mb-0">{selectedOrder?.billPayment}</h6>
                  </div>
                </div>
                {/* <div className="d-flex align-items-center mb-2">
                  <div className="flex-shrink-0">
                    <p className="text-muted mb-0">Card Holder Name:</p>
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <h6 className="mb-0">Joseph Parker</h6>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <div className="flex-shrink-0">
                    <p className="text-muted mb-0">Card Number:</p>
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <h6 className="mb-0">xxxx xxxx xxxx 2456</h6>
                  </div>
                </div> */}
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <p className="text-muted mb-0">Total Amount:</p>
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <h6 className="mb-0">{formatVnd(selectedOrder?.billTotal)}</h6>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BillDetail;