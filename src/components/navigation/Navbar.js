import React, { useEffect } from "react";
import AdminNavigation from "./adminNavigation/AdminNavigation";
import PrivateNavigation from "./privateNavigation/PrivateNavigation";
import PublicNavigation from "./publicNavigation/PublicNavigation";

const Navbar = () => {
  const userAuth = JSON.parse(localStorage.getItem("userInfomation"));
  console.log("");
  console.log("userAuth", userAuth?.user);
  const userData = userAuth?.user;

  return (
    <>
      {!userAuth ? (
        <PublicNavigation />
      ) : userAuth?.user?.role === "user" ? (
        <PrivateNavigation user={userData} />
      ) : (
        userAuth.user?.role === "admin" && <AdminNavigation user={userData} />
      )}
      <h1>hello</h1>
    </>
  );
};

export default Navbar;
