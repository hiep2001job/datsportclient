import { useSelector } from "react-redux";
// @ts-ignore
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Admin from "../admin/Admin";
import Customer from "../admin/customer/Customer";
import Dashboard from "../admin/dashboard/Dashboard";
import Product from "../admin/product/Product";
import Category from "../admin/category/Category";
import Brand from "../admin/brand/Brand";
import Posts from "../admin/posts/Posts";

import User from "../admin/user/User";
import Slider from "../admin/slider/Slider";
import Order from "../admin/order/Order";
import ProcessOrder from "../admin/order/ProcessOrder";

import About from "../pages/About/About";
import ProductDetail from "../pages/DetailProduct/ProductDetail";

import GlobalNavigation from "../pages/GlobalNavigation/GlobalNavigation";
import Home from "../pages/Home/Home";
import PostList from "../pages/Posts/PostList";
import DetailPost from "../pages/DetailPost/DetailPost";
import InfoProfile from "../pages/InfoProfile/InfoProfile";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import ProductListing from "../pages/ProductListing/ProductListing";
import SignUp from "../pages/SignUp/SignUp";
import UserBill from "../pages/UserBill/UserBill";
import Checkout from "../pages/Checkout/Checkout";
import BillDetail from "../pages/BillDetail/BillDetail";

import UserProfile from "../pages/user_profile/UserProfile";
import Cart from "../pages/Cart/Cart";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";

const Router = () => {
  const authToken = useSelector((state) => state.auth.authToken);
  const userRole = useSelector((state) => state.auth.data?.role);
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };
  const isAuthenticated = () => {
    if (!authToken) return false;
    console.log(parseJwt(authToken));
  };
  const isAdmin = () => {
    if (authToken && userRole === 0) {
      return true;
    }
    return false;
  };
  const privateRoutes = () => {
    return (
      <Routes>
        <Route exact path="/admin" element={<Admin />}>
          <Route index element={<Product />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="product" element={<Product />} />
          <Route path="user" element={<User />} />
          <Route path="customer" element={<Customer />} />
          <Route path="category" element={<Category />} />
          <Route path="brand" element={<Brand />} />
          <Route path="slider" element={<Slider />} />
          <Route path="posts" element={<Posts />} />
          <Route path="order" element={<Order />} />
          <Route path="profile" element={<InfoProfile />} />
          <Route path="process-order/:billId" element={<ProcessOrder />} />
        </Route>
        <Route path="/*" element={<Navigate to="/admin" replace />} />
      </Routes>
    );
  };
  const publicRoutes = () => {
    return (
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/404" element={<NotFound />} />
        <Route path="/" element={<GlobalNavigation />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="home" element={<Home />} />
          <Route path="post" element={<PostList />} />
          <Route path="user/profile" element={<UserProfile />}>
            <Route index element={<InfoProfile />} />
            <Route path="info" element={<InfoProfile />} />
            <Route path="bill" element={<UserBill />} />
            <Route path="bill-detail/:billId" element={<BillDetail />} />

          </Route>
          <Route path="detail-product/:id" element={<ProductDetail />} />
          <Route path="detail-post/:id" element={<DetailPost />} />
          <Route path="product-listing/:id" element={<ProductListing />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  };
  return (
    <BrowserRouter>
      {isAdmin() ? privateRoutes() : publicRoutes()}
    </BrowserRouter>
  );
};

export default Router;
