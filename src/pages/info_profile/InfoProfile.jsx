import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../share/button/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import Flatpickr from "react-flatpickr";
import imageApi from "../../api/img";

//import images
import progileBg from "../../assets/images/profile-bg.jpg";
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import { useDispatch, useSelector } from "react-redux";

import { selectUserDetail } from "../../redux/authSlice";
import useUserDetail from "../../hooks/useUserDetail";
import { updateProfile } from "../../redux/authActions";
import { useEffect } from "react";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email cannot be empty!")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Invalid email address"
    ),
  userfullname: yup.string().required("Fullname cannot be empty!"),
  gender: yup
    .string()
    .required("Let's choose gender!")
    .notOneOf(["Select your gender"], "Let's choose gender!"),
  phone: yup
    .string()
    .required("Phone cannot be empty!")
    .min(10, "Phone number be at least 10 characters")
    .max(11, "Phone number maximum of 11 characters"),
  address: yup.string().required("Address cannot be empty!"),
});

const InfoProfile = () => {
  const dispatch = useDispatch();
  const userDetail = useUserDetail();
  const userDetailInfor = useSelector(selectUserDetail);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: { ...userDetail },
  });

  const onSubmit = (data) => {
    const newData = { ...data, id: userDetail.id };
    dispatch(updateProfile(newData));
  };

  useEffect(() => {
    // Set  defaulValue
    setValue("email", userDetail.email);
    setValue("userfullname", userDetail.userfullname);
    setValue("gender", userDetail.gender);
    setValue("address", userDetail.address);
    setValue("phone", userDetail.phone);
  }, [userDetail]);

  const [activeTab, setActiveTab] = useState("1");

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    console.log("userDetailInfor: ", userDetailInfor);
  }, [userDetailInfor]);

  // handle change event of input file
  const onChangeFile = async (event) => {
    const imageUrl = event.target.files[0];
    await imageApi
      .uploadImage(imageUrl)
      .then((res) => {
        console.log("upload anh thành công!: ", res);
      })
      .catch((error) => {
        console.error(error);
        // const snackBarPayload = {
        //   type: "error",
        //   message: "Tải hình ảnh không thành công!",
        // };
        // dispatch(openSnackbar(snackBarPayload));
      });
  };

  return (
    <React.Fragment>
      <div className="page-content mt-3">
        <Container fluid>
          <Row>
            <Col xxl={3}>
              <Card className="mt-n5">
                <CardBody className="p-4">
                  <div className="text-center">
                    <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                      <img
                        src={userDetail.image}
                        className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                        alt="user-profile"
                      />
                      <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                        <input
                          id="profile-img-file-input"
                          type="file"
                          className="profile-img-file-input"
                          accept="image/*" onChange={onChangeFile} 
                          name="image"
                        />
                        <Label
                          htmlFor="profile-img-file-input"
                          className="profile-photo-edit avatar-xs"
                        >
                          <span className="avatar-title rounded-circle bg-light text-body">
                            <i className="ri-camera-fill"></i>
                          </span>
                        </Label>
                      </div>
                    </div>
                    <h5 className="fs-16 mb-1">{userDetail.userfullname}</h5>
                    <p className="text-muted mb-0">{userDetail.email}</p>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xxl={9}>
              <Card className="mt-xxl-n5">
                <CardHeader>
                  <Nav
                    className="nav-tabs-custom rounded card-header-tabs border-bottom-0"
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "1" })}
                        onClick={() => {
                          tabChange("1");
                        }}
                      >
                        <i className="fas fa-home"></i>
                        Personal Details
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to="#"
                        className={classnames({ active: activeTab === "2" })}
                        onClick={() => {
                          tabChange("2");
                        }}
                        type="button"
                      >
                        <i className="far fa-user"></i>
                        Change Password
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody className="p-4">
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="emailInput"
                                className="form-label"
                              >
                                Email
                              </Label>
                              <input
                                type="text"
                                className="form-control"
                                id="emailInput"
                                placeholder="Enter your email"
                                name="email"
                                {...register("email")}
                              />
                              <p>{errors?.email?.message}</p>
                            </div>
                          </Col>

                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="fullnameInput"
                                className="form-label"
                              >
                                Full name
                              </Label>
                              <input
                                type="text"
                                className="form-control"
                                id="fullnameInput"
                                placeholder="Enter your full name"
                                name="userfullname"
                                {...register("userfullname")}
                              />
                              <p>{errors?.userfullname?.message}</p>
                            </div>
                          </Col>

                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="skillsInput"
                                className="form-label"
                              >
                                Gender
                              </Label>
                              <select
                                className="form-select mb-3"
                                name="gender"
                                {...register("gender")}
                              >
                                <option>Select your gender </option>
                                <option value="1">Male</option>
                                <option value="2">Female</option>
                                <option value="3">Others</option>
                              </select>
                              <small className="text-red-500">
                                {errors?.gender && errors.gender.message}
                              </small>
                            </div>
                          </Col>

                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="phoneInput"
                                className="form-label"
                              >
                                Phone Number
                              </Label>
                              <input
                                type="text"
                                className="form-control"
                                id="phoneInput"
                                placeholder="Enter your phone number"
                                name="phone"
                                {...register("phone")}
                              />
                              <p>{errors?.phone?.message}</p>
                            </div>
                          </Col>

                          <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="addressInput"
                                className="form-label"
                              >
                                Address
                              </Label>
                              <input
                                type="text"
                                className="form-control"
                                id="addressInput"
                                placeholder="Enter your address"
                                name="address"
                                {...register("address")}
                              />
                              <p>{errors?.address?.message}</p>
                            </div>
                          </Col>

                          <Col lg={12}>
                            <div className="hstack gap-2 justify-content-end">
                              <button type="submit" className="btn btn-primary">
                                Update
                              </button>
                              <button
                                type="button"
                                className="btn btn-soft-success"
                              >
                                Cancel
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </form>
                    </TabPane>

                    <TabPane tabId="2">
                      <Form>
                        <Row className="g-2">
                          <Col lg={4}>
                            <div>
                              <Label
                                htmlFor="oldpasswordInput"
                                className="form-label"
                              >
                                Old Password*
                              </Label>
                              <Input
                                type="password"
                                className="form-control"
                                id="oldpasswordInput"
                                placeholder="Enter current password"
                              />
                            </div>
                          </Col>

                          <Col lg={4}>
                            <div>
                              <Label
                                htmlFor="newpasswordInput"
                                className="form-label"
                              >
                                New Password*
                              </Label>
                              <Input
                                type="password"
                                className="form-control"
                                id="newpasswordInput"
                                placeholder="Enter new password"
                              />
                            </div>
                          </Col>

                          <Col lg={4}>
                            <div>
                              <Label
                                htmlFor="confirmpasswordInput"
                                className="form-label"
                              >
                                Confirm Password*
                              </Label>
                              <Input
                                type="password"
                                className="form-control"
                                id="confirmpasswordInput"
                                placeholder="Confirm password"
                              />
                            </div>
                          </Col>

                          <Col lg={12}>
                            <div className="mb-3">
                              <Link
                                to="#"
                                className="link-primary text-decoration-underline"
                              >
                                Forgot Password ?
                              </Link>
                            </div>
                          </Col>

                          <Col lg={12}>
                            <div className="text-end">
                              <button type="button" className="btn btn-success">
                                Change Password
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                      <div className="mt-4 mb-3 border-bottom pb-2">
                        <div className="float-end">
                          <Link to="#" className="link-primary">
                            All Logout
                          </Link>
                        </div>
                        <h5 className="card-title">Login History</h5>
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <div className="flex-shrink-0 avatar-sm">
                          <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                            <i className="ri-smartphone-line"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6>iPhone 12 Pro</h6>
                          <p className="text-muted mb-0">
                            Los Angeles, United States - March 16 at 2:47PM
                          </p>
                        </div>
                        <div>
                          <Link to="#">Logout</Link>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <div className="flex-shrink-0 avatar-sm">
                          <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                            <i className="ri-tablet-line"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6>Apple iPad Pro</h6>
                          <p className="text-muted mb-0">
                            Washington, United States - November 06 at 10:43AM
                          </p>
                        </div>
                        <div>
                          <Link to="#">Logout</Link>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <div className="flex-shrink-0 avatar-sm">
                          <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                            <i className="ri-smartphone-line"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6>Galaxy S21 Ultra 5G</h6>
                          <p className="text-muted mb-0">
                            Conneticut, United States - June 12 at 3:24PM
                          </p>
                        </div>
                        <div>
                          <Link to="#">Logout</Link>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0 avatar-sm">
                          <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                            <i className="ri-macbook-line"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6>Dell Inspiron 14</h6>
                          <p className="text-muted mb-0">
                            Phoenix, United States - July 26 at 8:10AM
                          </p>
                        </div>
                        <div>
                          <Link to="#">Logout</Link>
                        </div>
                      </div>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>

    // <div className="flex justify-between">
    //   <div className="pt-12 pl-20 pb-10 border w-70%">
    //     <form>
    //       <div className="mb-2">
    //         <label className="font-semibold pr-1" htmlFor="">
    //           Username:
    //         </label>
    //         <input type="text" value="David Passenger" />
    //       </div>
    //       <div className="mb-2">
    //         <label className="font-semibold  pr-1" htmlFor="">
    //           Email:
    //         </label>
    //         <input type="text" value="hminhnhut99@gmail.com" />
    //       </div>
    //       <div className="mb-2">
    //         <label className="font-semibold  pr-1" htmlFor="">
    //           Phone:
    //         </label>
    //         <input type="text" value="038 972 8084" />
    //       </div>
    //       <div className="mb-2">
    //         <label className="font-semibold  pr-1" htmlFor="">
    //           Address:
    //         </label>
    //         <input type="text" value="Can Tho" />
    //       </div>
    //       {/* gender  */}
    //       <div className="w-full mb-2 relative">
    //         <h4 className="font-semibold">Gender:</h4>
    //         <div className="flex items-center">
    //           <div className="flex items-center mr-2 text-sm [&>*]:cursor-pointer">
    //             <input
    //               id="men"
    //               name="gender"
    //               // {...register("gender", loginOptions.gender)}
    //               type="radio"
    //               value="0"
    //               className="mr-1"
    //             />
    //             <label class htmlFor="men">
    //               Men
    //             </label>
    //           </div>
    //           <div className="flex items-center mr-2 text-sm [&>*]:cursor-pointer">
    //             <input
    //               type="radio"
    //               id="women"
    //               value="1"
    //               className="mr-1"
    //               name="gender"
    //               // {...register("gender", loginOptions.gender)}
    //             />
    //             <label htmlFor="women">Women</label>
    //           </div>
    //           <div className="flex items-center mr-2 text-sm [&>*]:cursor-pointer">
    //             <input
    //               type="radio"
    //               id="other"
    //               value="2"
    //               className="mr-1"
    //               name="gender"
    //               // {...register("gender", loginOptions.gender)}
    //             />
    //             <label htmlFor="other">Other</label>
    //           </div>
    //         </div>
    //       </div>
    //       <Button text="Save" fontsize="text-15" height="h-8" />
    //     </form>
    //   </div>
    //   {/* choose avatar  */}
    //   <div className="flex flex-col items-center mr-20">
    //     <img
    //       className="w-80 h-80 rounded-full mb-5"
    //       src="https://images.unsplash.com/photo-1678626666675-d637950a4780?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
    //       alt=""
    //     />
    //     <label className="border inline-block cursor-pointer px-2 py-1">
    //       Change
    //       <input type="file" className="hidden" />
    //     </label>
    //     <div className="mt-3">
    //       <p className="text-15">
    //         Maximum file size 1 MB <br /> Format: .JPEG, .PNG
    //       </p>
    //     </div>
    //   </div>
    // </div>
  );
};

export default InfoProfile;
