import './Login.scss';

import React, {
  useEffect,
  useState,
} from 'react';

import { useForm } from 'react-hook-form';
import { BiShow } from 'react-icons/bi';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import googleLogo from '../../assets/images/google-logo.svg';
import loginLogo from '../../assets/images/logo.png';
import { loginUser } from '../../redux/authActions';
import LoadingSpinner from '../../share/loading_spinner/LoadingSpinner';

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
          <div className="login-form">
            <div className="login-form-logo-wrapper">
              <img
                className="login-form-logo"
                src={loginLogo}
                alt="background left"
              />
            </div>
            <div className="form-area">
              <h2
                className="title"
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
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Login;
