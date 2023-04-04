import React from 'react'

import { Link } from 'react-router-dom';
import { Dropdown, DropdownMenu, DropdownToggle, Form } from 'reactstrap';
import ProfileDropdown from "../../share/header/profile_dropdown/ProfileDropdown";
import Logo from "../../assets/images/logo.png";

const Header = () => {
  return (
    <React.Fragment>
    <header id="page-topbar">
        <div className="layout-width">
            <div className="navbar-header">
                <div className="d-flex">

                    <div className="navbar-brand-box horizontal-logo">
                       
                        <Link to="/" className="logo logo-light">
                            <span className="logo-sm">
                                <img src={Logo} alt="" height="22" />
                            </span>
                            <span className="logo-lg">
                                <img src={Logo} alt="" height="17" />
                            </span>
                        </Link>
                    </div>

                    {/* <button
                        onClick={toogleMenuBtn}
                        type="button"
                        className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger shadow-none"
                        id="topnav-hamburger-icon">
                        <span className="hamburger-icon">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </button> */}


             
                </div>

                <div className="d-flex align-items-center"> 
                    {/* ProfileDropdown */}
                    <ProfileDropdown />
                </div>
            </div>
        </div>
    </header>
</React.Fragment>
  )
}

export default Header