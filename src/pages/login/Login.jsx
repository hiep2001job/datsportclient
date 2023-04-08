import "./Login.scss";

import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { BiShow } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import googleLogo from "../../assets/images/google-logo.svg";
import loginLogo from "../../assets/images/logo.png";
import { loginUser } from "../../redux/authActions";
import LoadingSpinner from "../../share/loading_spinner/LoadingSpinner";

const Login = () => {
  // ==== hook ====
  const navigate = useNavigate();
  const [typePassword, setTypePassword] = useState("password");
  const { success, loading, authToken, userRole } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [navigate, success]);

  // ==== handleFunciton ====

  const handleClickBtnSubmit = async (data) => {
    await dispatch(loginUser(data));
  };

  const handleClickRedirectSignUp = () => {
    navigate("/signup");
  };
  const handleClickForgotPassword = () => {
    navigate("/global/user/profile/forgotpassword");
  };
  const handleClickToggleShowPassword = () =>
    typePassword === "password"
      ? setTypePassword("text")
      : setTypePassword("password");
  const handleErrors = (errors) => {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  const loginOptions = {
    username: {
      required: "Username cannot be empty!",
      minLength: {
        value: 5,
        message: "Username must be at least 6 characters",
      },
    },
    password: {
      required: "Password cannot be empty! ",
      minLength: {
        value: 5,
        message: "Password must be at least 6 characters",
      },
    },
  };
  // if (success) {
  //   return <Navigate to="/home" />;
  // }
  return (
    <React.Fragment>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="login-wrapper">
          {/* <div className="login-form">
            <div className="login-form-logo-wrapper">
              <img
                className="login-form-logo"
                src={loginLogo}
                alt="background left"
              />
            </div>
            <div className="form-area">
              <h2 className="title">Login</h2>
              <form
                onSubmit={handleSubmit(handleClickBtnSubmit, handleErrors)}
                className="w-full"
              >
                <div className="w-full">
                  <input
                    className="input-primary w-full text-15"
                    type="text"
                    placeholder="Username"
                    name="username"
                    {...register("username", loginOptions.username)}
                  />
                </div>
                <small className="text-red-500">
                  {errors?.username && errors.username.message}
                </small>
                <div className="w-full relative">
                  <input
                    type={typePassword}
                    className="input-primary mt-4 mb-1 text-15 w-full"
                    placeholder="Password"
                    name="password"
                    {...register("password", loginOptions.password)}
                  />

                  <span
                    onClick={handleClickToggleShowPassword}
                    className="show-password"
                  >
                    <BiShow size={15} />
                  </span>
                </div>
                <small className="text-red-500">
                  {errors?.password && errors.password.message}
                </small>
                <div className="login-option">
                  <small
                    onClick={handleClickForgotPassword}
                    className="login-option-item"
                  >
                    Forgot password?
                  </small>
                  <small
                    onClick={handleClickRedirectSignUp}
                    className="login-option-item"
                  >
                    Sign up?
                  </small>
                </div>
                <div className="w-full">
                  <div className="flex">
                    <button
                      type="submit"
                      className="btn-primary w-full login-button"
                    >
                      Login
                    </button>
                  </div>
                  <div className="w-full mt-4">
                    <div className="w-full login-option-orther">
                      <img
                        className="mr-2"
                        src={googleLogo}
                        alt="logo google"
                      />
                      <p className="text-text text-sm">Login with Google?</p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div> */}

          <section className="vh-100" style={{ backgroundColor: "##eeeeee" }}>
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-xl-10">
                  <div className="card" style={{ borderRadius: "1rem" }}>
                    <div className="row g-0">
                      <div className="col-md-6 col-lg-5 d-none d-md-block">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
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
                              <span className="h1 fw-bold mb-0">Logo</span>
                            </div>

                            <h5
                              className="fw-normal mb-3 pb-3"
                              style={{ letterSpacing: "1px" }}
                            >
                              Sign into your account
                            </h5>

                            <div className="form-outline mb-4">
                              <input
                               
                                id="form2Example17"
                                className="form-control form-control-lg"
                                {...register("username", loginOptions.username)}
                              />
                              <label
                                className="form-label"
                                htmlFor="form2Example17"
                              >
                                Email address
                              </label>
                              <small className="text-red-500">
                                {errors?.username && errors.username.message}
                              </small>
                            </div>

                            <div className="form-outline mb-4">
                              <input
                                type={typePassword}
                                id="form2Example27"
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
                            </div>

                            <div className="pt-1 mb-4">
                              <button
                                className="btn btn-dark btn-lg btn-block"
                                type="submit"
                              >
                                Login
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
                                onClick={handleClickRedirectSignUp}
                                style={{ color: "#393f81" }}
                              >
                                Register here
                              </a>
                            </p>
                            <a href="#!" className="small text-muted">
                              Terms of use.
                            </a>
                            <a href="#!" className="small text-muted">
                              Privacy policy
                            </a>
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
      )}
    </React.Fragment>
  );
};

export default Login;
