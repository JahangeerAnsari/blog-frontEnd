import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AdminRoutes from "./adminNavigation/AdminRoutes";
import PrivateRoutes from "./privateNavigation/PrivateRoutes";
import PublicRoutes from "./publicNavigation/PublicRoutes";

const Navbar = () => {
  const state = useSelector((store) => store?.users?.userAuth);
console.log("state",state)
  const isAdmin = state?.user?.role;
  console.log("isAdmin: ", isAdmin)
  const userData = state?.user
  return (
    <>
      {!state?.user ? (
        <PublicRoutes  />
      ) : state?.user?.role === "user" ? (
        <PrivateRoutes userData={userData}/>
      ) : (
        isAdmin === "admin" && <AdminRoutes  userData={userData} />
      )}
    </>
  );
  
  
};

export default Navbar;
