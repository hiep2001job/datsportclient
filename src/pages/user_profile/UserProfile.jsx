import React from "react";
import Content from "./content/Content";
import SideBar from "./side_bar/SideBar";
const UserProfile = () => {
  return (
    // <div className="d-flex">
    //   <SideBar />
    //   <Content />
    // </div>
    <React.Fragment>
      <SideBar />
      <Content />
    </React.Fragment>
  );
};

export default UserProfile;
