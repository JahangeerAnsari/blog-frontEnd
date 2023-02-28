import React from 'react'
import Logo  from '../../img/logo.png'
import './navbar.css'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='navbar'>
    
     <img src={Logo} alt="instagram logo"/>
     
     <ul className='nav-menu'>
      <li><Link to="/signup">SignUp</Link> </li>
      <li><Link to="/signin">SignIn</Link></li>
      <li> <Link to="/profile">Profile</Link></li>
      <li> <Link to="/createPost">Create Post</Link></li>
     </ul>
    </div>
  )
}

export default Navbar