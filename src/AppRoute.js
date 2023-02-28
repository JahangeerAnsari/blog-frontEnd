import React from 'react'
import Navbar from './components/navbar/Navbar'
import {BrowserRouter as Router , Routes,Route} from 'react-router-dom'
import Signup from './pages/signup/Signup'
import Signin from './pages/signin/Signin'
import Profile from './pages/profile/Profile'
import Home from './pages/home/Home'
import CreatePost from './pages/newPost/CreatePost'
const AppRoute = () => {
  return (
   <div>
   
    <Router>
    <Navbar/>
      <Routes>
        <Route path ="/" element={<Home/>}/>
        <Route path ="/signup" element={<Signup/>}/>
        <Route path ="/signin" element={<Signin/>}/>
        <Route path ="/profile" element={<Profile/>}/>
        <Route path ="/createPost" element={<CreatePost/>}/>
      </Routes>
    </Router>
   </div>
  )
}

export default AppRoute