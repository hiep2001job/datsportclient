import "./Header.scss";

import React, { useEffect, useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle, Form } from "reactstrap";
import { FiUser } from "react-icons/fi";
import { MdShoppingCart } from "react-icons/md";
import { TfiSearch } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import brandApi from "../../api/brand";
import categoryApi from "../../api/category";
import Logo from "../../assets/images/logo.png";

import ProfileDropdown from "./profile_dropdown/ProfileDropdown";
import CartDropdown from "./cart_dropdown/CartDropdown";
import SearchOption from "./search_option/SearchOption";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(false);
  const [dataCategory, setDataCategory] = useState([]);

  const [dataBrands, setDataBrands] = useState([]);
  const [search, setSearch] = useState(false);

  const toogleSearch = () => {
    setSearch(!search);
  };
  const open = Boolean(anchorEl);
  const handleClickProfile = () => {
    setAnchorEl(!anchorEl);
  };
  const handleCloseProfile = () => {
    setAnchorEl(null);
  };
  const getAllDataCategory = async () => {
    try {
      const rsData = await categoryApi.getAll(1);
      setDataCategory(rsData);
    } catch (error) {
      return error;
    }
  };

  const getAllDataBrand = async () => {
    try {
      const rsData = await brandApi.getAll(1);
      setDataBrands(rsData);
    } catch (error) {
      return error;
    }
  };
  useEffect(() => {
    getAllDataCategory();
    getAllDataBrand();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // call api
  const navigate = useNavigate();
  const { success, authToken } = useSelector((state) => state.auth);

  return (
    <div id="header" className="header-wrapper">
      <div className="logo-wrapper" onClick={() => navigate("/home")}>
        <img className="logo" src={Logo} alt="logo web app" />
      </div>
      {/* menu list  */}
      <ul className="navbar">
        <Link to="/home">
          <li className="navbar-item">
            <p className="navbar-item-text">Home</p>
          </li>
        </Link>

        <li className="navbar-item">
          <p className="navbar-item-text">Category</p>
          <div className="navbar-dropdown">
            <ul className="navbar-dropdown-list">
              {dataCategory?.map((category, idx) => {
                return (
                  <li key={idx} className="navbar-dropdown-item hover:bg-slate-50">
                    <Link
                      to={`/product-listing/${category.categoryId}`}>
                      {category?.categoryName} </Link>
                  </li>

                );
              })}
            </ul>
          </div>
        </li>

        <li className="navbar-item ">
          <p className="navbar-item-text">Brand</p>
          <div className="navbar-dropdown">
            <ul className="">
              {dataBrands?.map((brand, idx) => {
                return (
                  <Link path="" key={idx}>
                    <li className="py-1 px-2 pr-3 text-15 border-b hover:bg-slate-50">
                      {brand?.brand_name}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        </li>

        <Link to="/post">
          <li className="navbar-item">
            <p className="navbar-item-text ">Post</p>
          </li>
        </Link>
        <Link to="about">
          <li className="navbar-item">
            <p className="navbar-item-text ">About</p>
          </li>
        </Link>
      </ul>

      {/* search area  */}
      <div className="search-box">
        <div className="cart-icon">
          <div><SearchOption /></div>

          <div>
            <CartDropdown />
          </div>
          <div className="user-group">
            {!authToken ? (
              <ul className="user-group-menu">
                <Link to="/login">
                  <li className="user-group-menu-item">Login</li>
                </Link>
                <Link to="/signup">
                  <li className="user-group-menu-item">Signup</li>
                </Link>
              </ul>
            ) : (
              <ProfileDropdown />
            )}
          </div>
        </div>
      </div>
    </div>

  );
};

export default Header;
