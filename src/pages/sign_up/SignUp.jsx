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
  const handleClickBtnSubmit = (data) => {
    dispatch(registerUser(data));
    navigate("/login");
  };

  const handleClickRedirectLogin = () => {
    navigate("/login");
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
      <div className="w-full h-screen flex justify-center items-center bg-white">
        <div className="flex justify-center items-center h-90% w-2/3 rounded-sm shadow-md lg:w-full md:w-full lg:shadow-none  sm:w-full sm:shadow-none">
          <div className="h-full w-2/3 lg:w-2/3 md:w-2/3 sm:hidden">
            <img
              className="h-full w-full pl-8"
              src={loginLogo}
              alt="background left"
            />
          </div>
          <div className="h-full w-1/3 px-6 pt-4 rounded-sm sm:w-full items-center justify-center flex-col mt-auto mb-auto">
            <h2
              className="text-black
           font-bold text-40 uppercase text-center mb-4"
            >
              Sign up
            </h2>
            <form
              onSubmit={handleSubmit(handleClickBtnSubmit, handleErrors)}
              className="w-full"
            >
              {/* email  */}
              <div className="w-full">
                <input
                  className="input-primary-signup w-full text-15"
                  type="email"
                  placeholder="Email"
                  name="email"
                  {...register("email", loginOptions.email)}
                />
              </div>
              <small className="text-red-500">
                {errors?.email && errors.email.message}
              </small>
              {/* username */}
              <div className="w-full">
                <input
                  className="input-primary-signup w-full text-15 mt-4 mb-1"
                  type="text"
                  placeholder="Username"
                  name="username"
                  {...register("username", loginOptions.username)}
                />
              </div>
              <small className="text-red-500">
                {errors?.username && errors.username.message}
              </small>
              {/* password */}
              <div className="w-full relative">
                <input
                  type={typePassword}
                  className="input-primary-signup mt-4 mb-1 text-15 w-full"
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
              {/* retypepassword */}
              <div className="w-full relative">
                <input
                  type={typePassword}
                  className="input-primary-signup mt-4 mb-1 text-15 w-full"
                  placeholder="Retype Password"
                  name="retypepassword"
                  {...register("password", loginOptions.retypepassword)}
                />
                <span
                  onClick={handleClickToggleShowPassword}
                  className=" cursor-pointer absolute right-2 top-1/2"
                >
                  <BiShow size={15} />
                </span>
              </div>
              <small className="text-red-500">
                {errors?.retypepassword && errors.retypepassword.message}
              </small>
              {/* gender */}
              <div className="w-full relative">
                <h4 className="text-15 mt-3">Gender:</h4>
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
              </div>
              <small className="text-red-500">
                {errors?.gender && errors.gender.message}
              </small>
              {/* phone  */}
              <div className="w-full relative">
                <input
                  type="number"
                  className="input-primary-signup mt-4 mb-1 text-15 w-full"
                  placeholder="Phone"
                  name="phone"
                  {...register("phone", loginOptions.phone)}
                />
              </div>
              <small className="text-red-500">
                {errors?.phone && errors.phone.message}
              </small>
              {/* address  */}
              <div className="w-full relative">
                <input
                  type="text"
                  className="input-primary-signup mt-4 mb-1 text-15 w-full"
                  placeholder="Address"
                  name="address"
                  {...register("address", loginOptions.address)}
                />
              </div>
              <small className="text-red-500">
                {errors?.address && errors.address.message}
              </small>
              <div
                className="flex justify-end mb-4 w-full"
                onClick={handleClickRedirectLogin}
              >
                <p className="text-15 text-text cursor-pointer underline hover:text-color_date">
                  You have account?
                </p>
              </div>
              <div className="w-full">
                <div className="flex">
                  <button
                    type="submit"
                    className="btn-primary w-full text-15 uppercase font-bold"
                  >
                    Sign up
                  </button>
                </div>
                {/* <div className="w-full mt-4">
                  <div className="w-full flex items-center justify-center border border-text_desc p-1 rounded-sm hover:border-text cursor-pointer">
                    <img className="mr-2" src={googleLogo} alt="logo google" />
                    <p className="text-text text-sm">Login with Google?</p>
                  </div>
                </div> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
