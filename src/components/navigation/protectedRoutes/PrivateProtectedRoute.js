import React from 'react'
import {  useSelector } from "react-redux";
import {Outlet,Navigate} from 'react-router-dom'


const PrivateProtectedRoute = () => {
  
  const state = useSelector((store) => store?.users?.userAuth);

  return (
    state?.user?.role === "user" ? <Outlet/>: <Navigate to="/signin"/>

    
  )
}

export default PrivateProtectedRoute