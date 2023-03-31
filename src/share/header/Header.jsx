import './Header.scss';

import React, {
  useEffect,
  useState,
} from 'react';

import { FiUser } from 'react-icons/fi';
import { MdShoppingCart } from 'react-icons/md';
import { TfiSearch } from 'react-icons/tfi';
import { useSelector } from 'react-redux';
import {
  Link,
  useNavigate,
} from 'react-router-dom';

import brandApi from '../../api/brand';
import categoryApi from '../../api/category';
import productApi from '../../api/product';
import Logo from '../../assets/images/logo.png';
import ProfileMenu from './profile_menu/ProfileMenu';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(false);
  const [dataCategory, setDataCategory] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [dataBrands, setDataBrands] = useState([]);

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
  return (
    <div
      id="header"
      className="header-wrapper"
    >
      <div
        className="logo-wrapper"
        onClick={() => navigate("/home")}
      >
        <img
          className="logo"
          src={Logo}
          alt="logo web app"
        />
      </div>
      {/* menu list  */}
      <ul className="navbar">
        <Link to="/home">
          <li className="navbar-item">
            <p className="navbar-item-text">
              Home
            </p>
          </li>
        </Link>
        <Link to={`/product-listing/1`}>
          <li className="navbar-item">
            <p className="navbar-item-text">
              Category
            </p>
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
        </Link>
        <Link to="">
          <li className="navbar-item ">
            <p className="navbar-item-text">
              Brand
            </p>
            <div className="navbar-dropdown">
              <ul className="">
                {dataBrands?.map((brand) => {
                  return (
                    <Link path="" key={brand?.brand_id}>
                      <li className="py-1 px-2 pr-3 text-15 border-b hover:bg-slate-50">
                        {brand?.brand_name}
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          </li>
        </Link>
        <Link to="">
          <li className="navbar-item">
            <p className="navbar-item-text ">
              Post
            </p>
          </li>
        </Link>
        <Link to="about">
          <li className="navbar-item">
            <p className="navbar-item-text ">
              About
            </p>
          </li>
        </Link>
      </ul>

      {/* search engine  */}
      <div className="search-box">
        <input
          type="text"
          className="search-box-input"
        />
        <div className="search-icon">
          <TfiSearch size={20} />
        </div>
        <div className="cart-icon">
          <div>
            <MdShoppingCart size={25} />
          </div>
          <div className="user-group">
            {!success ? (
              <ul className="user-group-menu">
                <Link to="/login">
                  <li className="user-group-menu-item">Login</li>
                </Link>
                <Link to="/signup">
                  <li className="user-group-menu-item">Signup</li>
                </Link>
              </ul>
            ) : (
              <>
                <button onClick={handleClickProfile}>
                  <FiUser size={25} />
                </button>
                <ProfileMenu
                  open={open}
                  handleClick={handleClickProfile}
                  handleClose={handleCloseProfile}
                  anchorEl={anchorEl}
                />
              </>
            )}
          </div>
        </div>
      </div>
      {/* user & cart  */}
    </div>
  );
};

export default Header;
