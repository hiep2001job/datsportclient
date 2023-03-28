import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/home/Home";
import Example from "../pages/example/Example";
import Example1 from "../pages/example1/Example1";
import Login from "../pages/login/Login";
import SignUp from "../pages/sign_up/SignUp";
import Admin from "../admin/Admin";
import { useSelector } from "react-redux";
import DetailProduct from "../pages/detail_product/DetailProduct";
import GlobalNavigation from "../pages/global_navigation/GlobalNavigation";
import Dashboard from "../admin/dashboard/Dashboard";
import Customer from "../admin/customer/Customer";
import User from "../admin/user/User";
import Product from "../admin/product/Product";
import UserProfile from "../pages/user_profile/UserProfile";
import UserPassword from "../pages/user_password/UserPassword";
import InfoProfile from "../pages/info_profile/InfoProfile";
import UserBill from "../pages/user_bill/UserBill";
import ProductListing from "../pages/product_listing/ProductListing";
import About from "../pages/about/About";

const Router = () => {
  const authToken = useSelector((state) => state.auth.authToken);
  const userRole = useSelector((state) => state.auth.data?.role);
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
        </Route>
        <Route path="/*" element={<Navigate to="/admin" replace />} />
      </Routes>
    );
  };
  const publicRoutes = () => {
    return (
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route path="/" element={<GlobalNavigation />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="user/profile" element={<UserProfile />}>
            <Route index element={<InfoProfile />} />
            <Route path="info" element={<InfoProfile />} />
            <Route path="password" element={<UserPassword />} />
            <Route path="bill" element={<UserBill />} />
          </Route>
          <Route path="detail-product/:id" element={<DetailProduct />} />
          <Route path="product-listing/:id" element={<ProductListing />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/example" element={<Example />} />
        <Route path="/example1" element={<Example1 />} />
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
