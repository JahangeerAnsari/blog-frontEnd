import React, { useState } from 'react'
import Logo  from '../../../img/logo.png'
import './adminNavbar.css'
import { Link,useNavigate  } from 'react-router-dom'
import {MenuItem, Menu, Avatar } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useDispatch, useSelector } from "react-redux";
import { reset, userLogoutAction } from "../../../redux/slices/users/authSlices";
const AdminRoutes = ({userData}) => {
  console.log("userData104",userData)
  const [open, setOpen] = useState(null);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectIndex, setSelectedIndex] = useState(null);
 const menuList = [
  {name:"your profile",link:"/profile"}, 
  {name:"Change Password",link:"/update-password"},
  {name:"Logout",link:""}, 
];

const handleOpen = (e) => { 
  setOpen(e.currentTarget);
}
const handleClose = () => setOpen(false)
const handleSelect = (index,item) => {
  setSelectedIndex(index);
  if (item.name === "Logout") {
    dispatch(userLogoutAction());
  dispatch(reset());
  }
  handleClose();
  const selectedMenu = menuList[index];
  
  navigate(`${selectedMenu.link}`)
}
  return (
    <div className='navbar'>
    
     <img src={Logo} alt="instagram logo"/>

     
     <ul className='nav-menu'>
      <li><Link to="/">Home</Link> </li>
      <li><Link to="/create-post">Create Post M</Link></li>
      <li> <Link to="/posts">Posts</Link></li>
      <li> <Link to="/users">Authors(user)</Link></li>
      <li> <Link to="/add-category">Add Category</Link></li>
      <li> <Link to="/category-list">Category List</Link></li>
      <li><span>Admin,{userData?.name}</span></li>
      <button>Logout</button>
      <Avatar src="https://pixabay.com/illustrations/tiktok-avatar-icon-placeholder-1968236/" onClick={handleOpen}/>
     </ul>
     <Menu open={Boolean(open)} anchorEl={open} onClose={handleClose}>
        {
          menuList.map((item, index) => (
            <MenuItem  onClick={() => handleSelect(index,item)} >{item.name}</MenuItem>
          ))
        }
      </Menu>
    </div>
  )
}

export default AdminRoutes;