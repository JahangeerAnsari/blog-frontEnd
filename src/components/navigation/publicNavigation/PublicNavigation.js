import React from 'react'
import Logo  from '../../../img/logo.png'
import './publicNavbar.css'
import { Link } from 'react-router-dom'
const PublicNavbar = () => {
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

export default PublicNavbar