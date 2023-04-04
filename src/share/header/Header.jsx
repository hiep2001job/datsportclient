import "./Header.scss";

import React, { useEffect, useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle, Form } from 'reactstrap';
import { FiUser } from "react-icons/fi";
import { MdShoppingCart } from "react-icons/md";
import { TfiSearch } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import brandApi from "../../api/brand";
import categoryApi from "../../api/category";
import productApi from "../../api/product";
import Logo from "../../assets/images/logo.png";
import ProfileMenu from "./profile_menu/ProfileMenu";
import ProfileDropdown from "./profile_dropdown/ProfileDropdown";
import SearchOption from "./search_option/SearchOption";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(false);
  const [dataCategory, setDataCategory] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
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
  const getAllDataProduct = async () => {
    try {
      const rsData = await productApi.getAll(1);
      setDataProduct(rsData);
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
    getAllDataProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // call api
  const navigate = useNavigate();
  const { success } = useSelector((state) => state.auth);
  const authToken = useSelector((state) => state.auth.authToken);

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
              <ul className="">
                {dataCategory?.map((category, idx) => {
                  return (
                    <Link
                      to={`/product-listing/${category.categoryId}`}
                      key={idx}
                    >
                      <li className="navbar-dropdown-item hover:bg-slate-50">
                        {category?.categoryName}
                      </li>
                    </Link>
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
        <SearchOption />
        <div className="cart-icon">
          <div>
            <MdShoppingCart size={25} />
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
      {/* user & cart  */}
    </div>
    // <React.Fragment>
    //   <header id="page-topbar" className="header-wrapper" >
    //     <div className="layout-width">
    //       <div className="navbar-header">
    //         <div className="d-flex">
    //           <div className="navbar-brand-box horizontal-logo">
    //             <Link to="/" className="logo logo-dark">
    //               <span className="logo-sm">
    //                 <img src={Logo} alt="" height="22" />
    //               </span>
    //               <span className="logo-lg">
    //                 <img src={Logo} alt="" height="17" />
    //               </span>
    //             </Link>

    //             <Link to="/" className="logo logo-light">
    //               <span className="logo-sm">
    //                 <img src={Logo} alt="" height="22" />
    //               </span>
    //               <span className="logo-lg">
    //                 <img src={Logo} alt="" height="17" />
    //               </span>
    //             </Link>
    //           </div>

             

    //           <SearchOption />
    //         </div>

    //         <div className="d-flex align-items-center">
    //           <Dropdown
    //             isOpen={search}
    //             toggle={toogleSearch}
    //             className="d-md-none topbar-head-dropdown header-item"
    //           >
    //             <DropdownToggle
    //               type="button"
    //               tag="button"
    //               className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
    //             >
    //               <i className="bx bx-search fs-22"></i>
    //             </DropdownToggle>
    //             <DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0">
    //               <Form className="p-3">
    //                 <div className="form-group m-0">
    //                   <div className="input-group">
    //                     <input
    //                       type="text"
    //                       className="form-control"
    //                       placeholder="Search ..."
    //                       aria-label="Recipient's username"
    //                     />
    //                     <button className="btn btn-primary" type="submit">
    //                       <i className="mdi mdi-magnify"></i>
    //                     </button>
    //                   </div>
    //                 </div>
    //               </Form>
    //             </DropdownMenu>
    //           </Dropdown>


    //           {/* MyCartDropdwon */}
    //           {/* <MyCartDropdown /> */}

           

    //           {/* NotificationDropdown */}
    //           {/* <NotificationDropdown /> */}

    //           {/* ProfileDropdown */}
    //           <ProfileDropdown />
    //         </div>
    //       </div>
    //     </div>
    //   </header>
    // </React.Fragment>
  );
};

export default Header;
