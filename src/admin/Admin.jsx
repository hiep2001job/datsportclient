import React from "react";
import AdminContent from "./admin_content/AdminContent";
import SideBar from "./sidebar/SideBar";

const Admin = () => {
  return (
    <div className="w-full h-screen flex overflow-y-hidden">
      <SideBar />
      <AdminContent />
    </div>
  );
};

export default Admin;
