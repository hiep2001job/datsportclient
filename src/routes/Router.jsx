import { useSelector } from "react-redux";
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

import About from "../pages/about/About";
import ProductDetail from "../pages/detail_product/ProductDetail";

import GlobalNavigation from "../pages/global_navigation/GlobalNavigation";
import Home from "../pages/home/Home";
import PostList from "../pages/posts/PostList";
import DetailPost from "../pages/detail_post/DetailPost";
import InfoProfile from "../pages/info_profile/InfoProfile";
import Login from "../pages/login/Login";
import NotFound from "../pages/not_found/NotFound";
import ProductListing from "../pages/product_listing/ProductListing";
import SignUp from "../pages/sign_up/SignUp";
import UserBill from "../pages/user_bill/UserBill";
import Checkout from "../pages/checkout/Checkout";
import BillDetail from "../pages/bill_detail/BillDetail";
import UserPassword from "../pages/user_password/UserPassword";
import UserProfile from "../pages/user_profile/UserProfile";
import Cart from "../pages/cart/Cart";

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
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="product" element={<Product />} />
          <Route path="user" element={<User />} />
          <Route path="customer" element={<Customer />} />
          <Route path="category" element={<Category />} />
          <Route path="brand" element={<Brand />} />
          <Route path="slider" element={<Slider />} />
          <Route path="posts" element={<Posts />} />
          <Route path="order" element={<Order />} />
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
