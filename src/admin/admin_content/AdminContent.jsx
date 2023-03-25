import { Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { MdSettings, MdNotificationsActive } from "react-icons/md";
import { TfiSearch } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { Outlet } from "react-router-dom";
import { MdLogout } from "react-icons/md";
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
    <div className="h-full border p-5 w-full">
      <header className="flex justify-between items-center border-b pb-2 border-slate-300">
        <div className="w-30% flex items-center ml-8">
          <div className="relative w-80%">
            <div
              className="absolute top-2 right-1
            "
            >
              <TfiSearch size={20} />
            </div>
            <input
              type="text"
              className="w-full border p-1 outline-none rounded-md border-slate-200"
              placeholder="Search..."
            />
          </div>
        </div>

        <div>
          <ul className="flex items-center">
            <li className="ml-3">
              <MdNotificationsActive size={24} />
            </li>
            <li className="ml-3">
              <MdSettings size={24} />
            </li>
            <li
              className="flex items-center ml-3"
              id="menu-admin"
              onClick={() => setIsOpenMenu(!isOpenMenu)}
            >
              <img
                className="w-40 h-40 rounded-full object-cover"
                src="https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                alt="img1"
              />
              <p className="ml-3 text-black text-15 font-semibold">
                {username}
              </p>

              {/* menu action */}

              <Menu
                className="mt-14"
                id="menu-admin"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={isOpenMenu}
                onClose={() => setIsOpenMenu(false)}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={handleClickLogout}>
                  <MdLogout size="20" />
                  Logout
                </MenuItem>
              </Menu>
            </li>
          </ul>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default AdminContent;
