import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import {Outlet,Navigate} from 'react-router-dom'


const AdminProtectedRoute = () => {
  
  // const { userAuth } = user;
  // const user = useSelector(state => state?.users);
  const state = useSelector((store) => store?.users?.userAuth);
  console.log("state124",state)
    const isAdmin = state?.user?.role;
    console.log("isAdmin12333333",isAdmin)
  return (
   <>
   <>
      {(isAdmin==="admin" && state?.token) ? (
        <Outlet  />
      ) : !state ? (
        <Navigate to="/signin"/>
      ) :null
      
      }
    </>
   </>
  )
}

export default AdminProtectedRoute