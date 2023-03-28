import React, { useEffect, useState } from "react";
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
      className="fixed z-50 bg-slate-50 shadow-sm flex items-baseline justify-between w-full h-auto border-b pb-2"
    >
      <div
        className="h-full w-36 cursor-pointer ml-9 flex pt-2"
        onClick={() => navigate("/home")}
      >
        <img
          className="w-full h-12 mt-1 object-contain"
          src={Logo}
          alt="logo web app"
        />
      </div>
      {/* menu list  */}
      <ul className="mr-auto ml-20">
        <Link to="/home">
          <li className="group mr-5 relative text-lg inline-block">
            <p className="uppercase font-semibold hover:opacity-60 transition-all duration-100">
              Home
            </p>
          </li>
        </Link>
        <Link to={`/product-listing/1`}>
          <li className="group mr-5 relative text-lg inline-block">
            <p className="uppercase font-semibold  hover:opacity-60 transition-all duration-100 ">
              Category
            </p>
            <div className="absolute w-44 h-auto top-full left-0 invisible opacity-0 pb-10 z-50 bg-white group-hover:visible group-hover:opacity-100 transition-all duration-300">
              <ul className="">
                {dataCategory?.map((category, idx) => {
                  return (
                    <Link
                      to={`/product-listing/${category.categoryId}`}
                      key={idx}
                    >
                      <li className="py-1 px-2 pr-3 text-15 border-b hover:bg-slate-50">
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
          <li className="group mr-5 relative text-lg inline-block ">
            <p className="uppercase font-semibold   hover:opacity-60 transition-all duration-100">
              Brand
            </p>
            <div className="absolute w-44 h-auto top-full left-0 invisible opacity-0 pb-10 z-50 bg-white  group-hover:visible group-hover:opacity-100 transition-all duration-300">
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
          <li className="group mr-5 relative text-lg inline-block">
            <p className="uppercase font-semibold hover:opacity-60 transition-all duration-100 ">
              Post
            </p>
          </li>
        </Link>
        <Link to="about">
          <li className="group mr-5  relative text-lg inline-block ">
            <p className="uppercase font-semibold hover:opacity-60 transition-all duration-100 ">
              About
            </p>
          </li>
        </Link>
      </ul>

      {/* search engine  */}
      <div className="flex items-center w-56 h-8 ml-auto mr-48 relative">
        <input
          type="text"
          className="h-full pl-3 outline-none border px-1 rounded"
        />
        <div className="absolute top-1/4 right-6">
          <TfiSearch size={20} />
        </div>
        <div className="flex justify-center items-stretch ml-4">
          <div>
            <MdShoppingCart size={25} />
          </div>
          <div className="flex relative group">
            {!success ? (
              <ul className="flex justify-center items-center">
                <Link to="/login">
                  <li className="mr-1 border-b border-text">Login</li>
                </Link>
                <Link to="/signup">
                  <li className="border-b  border-text">Signup</li>
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
