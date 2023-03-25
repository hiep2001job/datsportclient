import React from "react";
import { Link } from "react-router-dom";
import Button from "../../share/button/Button";
const UserPassword = () => {
  return (
    <div className="w-full h-full">
      <p className="ml-5 mb-5 text-15 text-blue-600">
        For account security, please do not share your password with others
      </p>
      <Link
        className="font-semibold ml-5 inline-block py-2 px-4 bg-yellow-400 rounded-sm hover:opacity-75 transition-opacity duration-150"
        to="/global/user/profile/forgotpassword"
      >
        Forgot password?
      </Link>
      <form className="mt-8 ml-5 flex flex-col justify-start items-end w-50%">
        <div className="text-right mb-5">
          <label className="text-right mr-3 text-15 font-semibold" htmlFor="">
            Curent password:
          </label>
          <input
            type="password"
            className="pl-2 border  border-slate-400 outline-none w-250 h-9"
          />
        </div>
        <div className="text-right mb-5">
          <label className="text-right mr-3 text-15 font-semibold" htmlFor="">
            New password:
          </label>
          <input
            type="pasword"
            className="pl-2 border border-slate-400 outline-none w-250 h-9"
          />
        </div>
        <div className="text-right mb-5">
          <label className="text-right text-15 mr-3 font-semibold" htmlFor="">
            Retype new password:
          </label>
          <input
            type="password"
            className="pl-2 border  border-slate-400 outline-none w-250 h-9"
          />
        </div>
        <div className="mr-24">
          <Button text="save" height="h-8" fontsize="text-15" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default UserPassword;
