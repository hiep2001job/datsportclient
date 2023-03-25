import React from "react";
import { Outlet } from "react-router-dom";
// email
// password
// gender
// phone
// address
const Content = () => {
  return (
    <div className="w-full">
      <h2 className="text-20 p-3">User Profile Manager</h2>
      {/* form info  */}
      <Outlet />
    </div>
  );
};

export default Content;
