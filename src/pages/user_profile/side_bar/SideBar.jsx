import React from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="w-20% border-r">
      <ul className="pl-5 pt-14">
        <NavLink
          to="/user/profile/info"
          style={({ isActive, isPending }) => {
            return {
              // color: isActive ? "red" : "black",
              opacity: isActive ? "0.5" : "1",
            };
          }}
        >
          <li className="border-b py-2">Edit Profile</li>
        </NavLink>
        <NavLink
          to="/user/profile/password"
          style={({ isActive, isPending }) => {
            return {
              // color: isActive ? "red" : "black",
              opacity: isActive ? "0.5" : "1",
            };
          }}
        >
          <li className="border-b py-2"> Change Password</li>
        </NavLink>
        <NavLink
          to="/user/profile/bill"
          style={({ isActive, isPending }) => {
            return {
              // color: isActive ? "red" : "black",
              opacity: isActive ? "0.5" : "1",
            };
          }}
        >
          <li className="border-b py-2">Bill</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default SideBar;
