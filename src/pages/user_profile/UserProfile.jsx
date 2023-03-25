import React from "react";
import Content from "./content/Content";
import SideBar from "./side_bar/SideBar";
const UserProfile = () => {
  return (
    <div className="flex">
      <SideBar />
      <Content />
    </div>
  );
};

export default UserProfile;
