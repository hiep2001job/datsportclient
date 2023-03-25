import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/authActions";
import googleLogo from "../../assets/images/google-logo.svg";
import loginLogo from "../../assets/images/logo.png";
import { BiShow } from "react-icons/bi";
import LoadingSpinner from "../../share/loading_spinner/LoadingSpinner";
const Login = () => {
  // ==== hook ====
  const navigate = useNavigate();
  const [typePassword, setTypePassword] = useState("password");
  const { success, loading, authToken, userRole } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (success) {
  //     navigate("/");
  //   }
  // }, [navigate, success]);

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
        <div className="w-full h-screen flex justify-center items-center bg-white">
          <div className="flex justify-center items-center h-3/4 w-2/3 rounded-sm shadow-md lg:w-full md:w-full lg:shadow-none  sm:w-full sm:shadow-none">
            <div className="h-4/5 w-2/3 lg:w-2/3 md:w-2/3 sm:hidden">
              <img
                className="h-full w-full pl-8 object-contain"
                src={loginLogo}
                alt="background left"
              />
            </div>
            <div className="h-4/5 w-1/3 px-6 py-8 rounded-sm sm:w-full items-center justify-center flex-col mt-auto mb-auto">
              <h2
                className="text-black
                 font-bold text-40 uppercase text-center mb-4"
              >
                Login
              </h2>
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
                    className=" cursor-pointer absolute right-2 top-1/2"
                  >
                    <BiShow size={15} />
                  </span>
                </div>
                <small className="text-red-500">
                  {errors?.password && errors.password.message}
                </small>
                <div className="flex justify-between mt-2 mb-1 w-full">
                  <small
                    onClick={handleClickForgotPassword}
                    className="text-text cursor-pointer underline hover:text-color_date"
                  >
                    Forgot password?
                  </small>
                  <small
                    onClick={handleClickRedirectSignUp}
                    className="text-text cursor-pointer underline hover:text-color_date"
                  >
                    Sign up?
                  </small>
                </div>
                <div className="w-full">
                  <div className="flex">
                    <button
                      type="submit"
                      className="btn-primary w-full text-15 uppercase font-bold"
                    >
                      Login
                    </button>
                  </div>
                  <div className="w-full mt-4">
                    <div className="w-full flex items-center justify-center border border-text_desc p-1 rounded-sm hover:border-text cursor-pointer">
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
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Login;
