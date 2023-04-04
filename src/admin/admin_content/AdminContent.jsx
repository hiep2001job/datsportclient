// import { Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { MdSettings, MdNotificationsActive } from "react-icons/md";
import { TfiSearch } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { Outlet } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import Header from '../admin_header/Header';

const AdminContent = () => {
  const {
    data: { username },
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClickLogout = () => {
    dispatch(logout());
  };
  return (
      <div>
      <Header/>
      <Outlet />
    </div>
  );
};

export default AdminContent;
