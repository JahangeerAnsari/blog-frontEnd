import React, { useEffect, useState } from "react";
import Logo from "../../../img/logo.png";
import "./privateNavbar.css";
import { Link, useNavigate } from "react-router-dom";
import { MenuItem, Menu } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
const PrivateNavbar = () => {
  const [open, setOpen] = useState(null);
  let navigate = useNavigate();
  const [selectIndex, setSelectedIndex] = useState(null);
  const menuList = [
    { name: "your profile", link: "/profile" },
    { name: "Change Password", link: "/update-password" },
    { name: "Logout", link: "/signin" },
  ];

  const handleOpen = (e) => {
    setOpen(e.currentTarget);
  };
  const handleClose = () => setOpen(false);
 
  
  const handleSelect = (index, item) => {
    console.log("index, item", index, item);

    setSelectedIndex(index);
    if (item.name === "Logout") {
     localStorage.clear()
    }
    handleClose();
    const selectedMenu = menuList[index];

    navigate(`${selectedMenu.link}`);
  };
  return (
    <div className="navbar">
      <img src={Logo} alt="instagram logo" />

      <ul className="nav-menu">
        <li>
          <Link to="/">Home</Link>{" "}
        </li>
        <li>
          <Link to="/create">Create Post</Link>
        </li>
        <li>
          {" "}
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          {" "}
          <Link to="/users">Authors(user)</Link>
        </li>
        <AccountCircleIcon onClick={handleOpen} />
      </ul>
      <Menu open={Boolean(open)} anchorEl={open} onClose={handleClose}>
        {menuList.map((item, index) => (
          <MenuItem onClick={() => handleSelect(index, item)}>
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default PrivateNavbar;
