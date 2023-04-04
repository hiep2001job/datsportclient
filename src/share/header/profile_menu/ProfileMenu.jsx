import * as React from "react";

import "./ProfileMenu.scss";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/authSlice";
import { useNavigate } from "react-router-dom";
export default function ProfileMenu({ handleClose, anchorEl, open }) {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleClickLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };
  const handleClickProfile = () => {
    navigate("/user/profile");
  };
  return (
    <div>
      {/* <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleClickProfile}>Profile</MenuItem>
        <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
      </Menu> */}
    </div>
  );
}
