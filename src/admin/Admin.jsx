import React from "react";
import AdminContent from "./admin_content/AdminContent";
import SideBar from "./sidebar/SideBar";
import "./Admin.scss";

const Admin = () => {
  return (
    <div
      style={{
        padding: "50px 0px 0px 370px",
      }}
    >
      <SideBar />
      <AdminContent />
    </div>
  );
};

export default Admin;
