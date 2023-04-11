import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DefaultImg from "../../assets/images/default.png";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import useUserDetail from "../../hooks/useUserDetail";

//import images
import avatar1 from "../../assets/images/users/avatar-1.jpg";

const AdminProfileDropdown = () => {
  const user = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickLogout = async () => {
    navigate("/");
    await dispatch(logout());
  };
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };
  return (
    <React.Fragment>
      <Dropdown
        isOpen={isProfileDropdown}
        toggle={toggleProfileDropdown}
        className="ms-sm-3 header-item topbar-user"
      >
        <DropdownToggle tag="button" type="button" className="btn shadow-none">
          <span className="d-flex align-items-center">
            <img
              className="rounded-circle header-profile-user"
              src={user.image||DefaultImg}
              alt="Header Avatar"
            />
            <span className="text-start ms-xl-2">
              <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                {user.userfullname}
              </span>
              <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">
                {user.email}
              </span>
            </span>
          </span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <h6 className="dropdown-header">Welcome {user.userfullname}!</h6>
          <DropdownItem href={process.env.PUBLIC_URL + "/admin/profile"}>
            <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
            <span className="align-middle">Profile</span>
          </DropdownItem>
        
          <div className="dropdown-divider"></div>
          <DropdownItem onClick={handleClickLogout}>
            <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle" data-key="t-logout">
              Logout
            </span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default AdminProfileDropdown;
