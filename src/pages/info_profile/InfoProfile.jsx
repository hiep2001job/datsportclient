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
import { updateProfile, getProfile } from "../../redux/authActions";
import { useEffect, useLayoutEffect } from "react";
import DefaultImg from "../../assets/images/default.png";

const InfoProfile = () => {
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [activeTab, setActiveTab] = useState("1");
  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const dispatch = useDispatch();
  const userDetail = useUserDetail();
  const userProfile = useSelector((state) => state.auth.userProfile);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  useLayoutEffect(() => {
    setSelectedImageUrl(userDetail.image);
    if (userDetail) {
      reset({
        email: userDetail.email,
        address: userDetail.address,
        phone: userDetail.phone,
        image: userDetail.image,
        gender: userDetail.gender,
        userfullname: userDetail.userfullname,
      });
    }
  }, [dispatch, userDetail]);

  const profileOptions = {
    email: {
      required: "Email cannot be empty!",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    },

    gender: {
      required: "Let's choose gender!",
    },
    userfullname: {
      required: "User fullname cannot be empty!",
    },

    phone: {
      required: "Phone cannot be empty!",

      minLength: {
        value: 10,
        message: "Phone number be at least 10 characters",
      },
      maxLength: {
        value: 11,
        message: "Phone number maximum of 11 characters",
      },
    },
    address: {
      required: "Address cannot be empty!",
    },
  };
  const handleErrors = () => {};
  const onSubmit = (data) => {
    const newData = { ...data, id: userDetail.id, image: selectedImageUrl };
    console.log(newData);
    dispatch(updateProfile(newData));
  };

  // handle change event of input file
  const onChangeFile = async (event) => {
    const imageUrl = event.target.files[0];
    await imageApi
      .uploadImage(imageUrl)
      .then((res) => {
        setSelectedImageUrl(res.data.data.url);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <React.Fragment>
      <div className="page-content mt-3">
        <Container fluid>
          <Row>
            <Col xxl={12}>
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
                    {/* <NavItem>
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
                    </NavItem> */}
                  </Nav>
                </CardHeader>
                <CardBody className="p-4">
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <form onSubmit={handleSubmit(onSubmit, handleErrors)}>
                        <Row>
                          <Col lg={6}>
                            <div className="text-center">
                              <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                                <img
                                  src={selectedImageUrl || DefaultImg}
                                  className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                                  alt="user-profile"
                                />
                                <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                                  <input
                                    id="profile-img-file-input"
                                    type="file"
                                    className="profile-img-file-input"
                                    accept="image/*"
                                    onChange={onChangeFile}
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
                              <h5 className="fs-16 mb-1">
                                {userProfile?.userfullname}
                              </h5>
                              <p className="text-muted mb-0">
                                {userProfile?.email}
                              </p>
                            </div>
                          </Col>
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
                                {...register("email", profileOptions.email)}
                              />
                              <p class="text-red-500">
                                {errors?.email?.message}
                              </p>
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
                                {...register(
                                  "userfullname",
                                  profileOptions.userfullname
                                )}
                              />

                              <p className="text-red-500">
                                {errors?.userfullname?.message}
                              </p>
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
                                {...register("gender", profileOptions.gender)}
                              >
                                <option>Select your gender </option>
                                <option
                                  selected={userDetail.gender == 1}
                                  value="1"
                                >
                                  Male
                                </option>
                                <option
                                  selected={userDetail.gender == 2}
                                  value="2"
                                >
                                  Female
                                </option>
                                <option
                                  selected={userDetail.gender == 3}
                                  value="3"
                                >
                                  Others
                                </option>
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
                                {...register("phone", profileOptions.phone)}
                              />
                              <p className="text-red-500">
                                {errors?.phone?.message}
                              </p>
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
                                {...register("address", profileOptions.address)}
                              />
                              <p className="text-red-500">
                                {errors?.address?.message}
                              </p>
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

                    {/* <TabPane tabId="2">
                      <form>
                        <Row className="g-2">
                          <Col lg={4}>
                            <div>
                              <Label
                                htmlFor="oldpasswordInput"
                                className="form-label"
                              >
                                Old Password*
                              </Label>
                              <input
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
                              <input
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
                              <input
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
                      </form>
                     
                    </TabPane> */}
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default InfoProfile;
