import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BiShow } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import loginLogo from "../../assets/images/loginLogo.avif";
import { registerUser } from "../../redux/authActions";
const Login = () => {
  const navigate = useNavigate();
  const [typePassword, setTypePassword] = useState("password");
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const handleClickBtnSubmit = (data) => {
    dispatch(registerUser(data));
    reset();
  };

  const handleClickRedirectLogin = () => {
    navigate("/login");
  };

  const handleClickToggleShowPassword = () =>
    typePassword === "password"
      ? setTypePassword("text")
      : setTypePassword("password");
  const handleErrors = (errors) => {};

  const loginOptions = {
    email: {
      required: "Email cannot be empty!",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    },
    username: {
      required: "Username cannot be empty!",
      minLength: {
        value: 5,
        message: "Username must be at least 5 characters",
      },
    },
    userfullname: {
      required: "Username cannot be empty!",
      minLength: {
        value: 5,
        message: "Username must be at least 5 characters",
      },
    },
    password: {
      required: "Password cannot be empty! ",
      minLength: {
        value: 5,
        message: "Password must be at least 5 characters",
      },
    },
    retypepassword: {
      required: "RetypePassword cannot be empty!",
    },
    gender: {
      required: "Let's choose gender!",
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

  return (
    <React.Fragment>
      <div className="login-wrapper">
        <section className="vh-100" style={{ backgroundColor: "##eeeeee" }}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-xl-10">
                <div className="card" style={{ borderRadius: "1rem" }}>
                  <div className="row g-0">
                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                      <img
                        src={loginLogo}
                        alt="login form"
                        className="img-fluid"
                        style={{ borderRadius: "1rem 0 0 1rem" }}
                      />
                    </div>
                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                      <div className="card-body p-4 p-lg-5 text-black">
                        <form
                          onSubmit={handleSubmit(
                            handleClickBtnSubmit,
                            handleErrors
                          )}
                        >
                          <div className="d-flex align-items-center mb-3 pb-1">
                            <i
                              className="fas fa-cubes fa-2x me-3"
                              style={{ color: "#ff6219" }}
                            ></i>
                            <span className="h1 fw-bold mb-0">Datsport</span>
                          </div>

                          <h5
                            className="fw-normal mb-3 pb-3"
                            style={{ letterSpacing: "1px" }}
                          >
                            Sign up your account
                          </h5>

                          <div className="form-outline mb-4">
                            <input
                              id="form2Example17"
                              className="form-control form-control-lg"
                              type="text"
                              placeholder="Username"
                              name="username"
                              {...register("username", loginOptions.username)}
                            />
                            <label
                              className="form-label"
                              htmlFor="form2Example17"
                            >
                              Username
                            </label>
                            <small className="text-red-500 ml-5">
                              {errors?.username && errors.username.message}
                            </small>
                          </div>

                          <div className="form-outline mb-4">
                            <input
                              type={typePassword}
                              placeholder="Password"
                              className="form-control form-control-lg"
                              {...register("password", loginOptions.password)}
                            />
                            <span
                              onClick={handleClickToggleShowPassword}
                              className="show-password"
                            >
                              <BiShow size={15} />
                            </span>
                            <label
                              className="form-label"
                              htmlFor="form2Example27"
                            >
                              Password
                            </label>
                            <small className="text-red-500">
                              {errors?.password && errors.password.message}
                            </small>
                          </div>

                          <div className="form-outline mb-4">
                            <input
                              type={typePassword}
                              id="form2Example27"
                              className="form-control form-control-lg"
                              placeholder="Retype Password"
                              name="retypepassword"
                              {...register(
                                "retypepassword",
                                loginOptions.retypepassword
                              )}
                            />
                            <span
                              onClick={handleClickToggleShowPassword}
                              className="show-password"
                            >
                              <BiShow size={15} />
                            </span>
                            <label
                              className="form-label"
                              htmlFor="form2Example27"
                            >
                              Retype password
                            </label>
                            <small className="text-red-500 ml-5">
                              {errors?.retypepassword &&
                                errors.retypepassword.message}
                            </small>
                          </div>

                          <div className="form-outline mb-4">
                            <input
                              id="form2Example17"
                              className="form-control form-control-lg"
                              type="text"
                              placeholder="Fullname"
                              name="userfullname"
                              {...register(
                                "userfullname",
                                loginOptions.userfullname
                              )}
                            />
                            <label
                              className="form-label"
                              htmlFor="form2Example17"
                            >
                              Full name
                            </label>
                            <small className="text-red-500 ml-5">
                              {errors?.userfullname &&
                                errors.userfullname.message}
                            </small>
                          </div>

                          <div className="form-outline mb-4">
                            <input
                              id="form2Example17"
                              className="form-control form-control-lg"
                              type="email"
                              placeholder="Email"
                              name="email"
                              {...register("email", loginOptions.email)}
                            />
                            <label
                              className="form-label"
                              htmlFor="form2Example17"
                            >
                              Email
                            </label>
                            <small className="text-red-500 ml-5">
                              {errors?.email && errors.email.message}
                            </small>
                          </div>

                          <div className="form-outline mb-4">
                            <div className="flex items-center">
                              <div className="flex items-center mr-2 text-sm [&>*]:cursor-pointer">
                                <input
                                  id="men"
                                  name="gender"
                                  {...register("gender", loginOptions.gender)}
                                  type="radio"
                                  value="0"
                                  className="mr-1"
                                />
                                <label class htmlFor="men">
                                  Men
                                </label>
                              </div>
                              <div className="flex items-center mr-2 text-sm [&>*]:cursor-pointer">
                                <input
                                  type="radio"
                                  id="women"
                                  value="1"
                                  className="mr-1"
                                  name="gender"
                                  {...register("gender", loginOptions.gender)}
                                />
                                <label htmlFor="women">Women</label>
                              </div>
                              <div className="flex items-center mr-2 text-sm [&>*]:cursor-pointer">
                                <input
                                  type="radio"
                                  id="other"
                                  value="2"
                                  className="mr-1"
                                  name="gender"
                                  {...register("gender", loginOptions.gender)}
                                />
                                <label htmlFor="other">Other</label>
                              </div>
                            </div>
                            <label
                              className="form-label"
                              htmlFor="form2Example17"
                            >
                              Gender
                            </label>
                          </div>
                          <div className="form-outline mb-4">
                            <small className="text-red-500">
                              {errors?.gender && errors.gender.message}
                            </small>
                          </div>

                          <div className="form-outline mb-4">
                            <input
                              type="number"
                              id="form2Example27"
                              className="form-control form-control-lg"
                              placeholder="Phone"
                              name="phone"
                              {...register("phone", loginOptions.phone)}
                            />

                            <label
                              className="form-label"
                              htmlFor="form2Example27"
                            >
                              Phone
                            </label>
                            <small className="text-red-500">
                              {errors?.phone && errors.phone.message}
                            </small>
                          </div>

                          <div className="form-outline mb-4">
                            <input
                              className="form-control form-control-lg"
                              type="text"
                              placeholder="Address"
                              name="address"
                              {...register("address", loginOptions.address)}
                            />
                            <label
                              className="form-label"
                              htmlFor="form2Example17"
                            >
                              Address
                            </label>
                            <small className="text-red-500">
                              {errors?.address && errors.address.message}
                            </small>
                          </div>

                          <div className="pt-1 mb-4">
                            <button
                              className="btn btn-dark btn-lg btn-block"
                              type="submit"
                            >
                              Sign up
                            </button>
                          </div>

                          <a className="small text-muted" href="#!">
                            Forgot password?
                          </a>
                          <p
                            className="mb-5 pb-lg-2"
                            style={{ color: "#393f81" }}
                          >
                            Don't have an account?{" "}
                            <a
                              onClick={handleClickRedirectLogin}
                              style={{ color: "#393f81" }}
                            >
                              Sign in here
                            </a>
                          </p>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default Login;
