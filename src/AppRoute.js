import React from 'react'
import Navbar from './components/navigation/Navbar'
import {BrowserRouter as Router , Routes,Route} from 'react-router-dom'
import Signup from './pages/signup/Signup'
import Signin from './pages/signin/Signin'
import Profile from './pages/profile/Profile'
import Home from './pages/home/Home'
import CreatePost from './pages/newPost/CreatePost'
import Posts from './pages/posts/Posts'
import Users from './pages/users/Users'
import ChangePassword from './pages/changePassword/ChangePassword'
import AddCategory from './pages/addCategory/AddCategory'
import CategoryList from './pages/categoryList/CategoryList'
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
        <Route path ="/posts" element={<Posts/>}/>
        <Route path ="/users" element={<Users/>}/>
        <Route path ="/update-password" element={<ChangePassword/>}/>
        {/* admin */}
        <Route path ="/add-category" element={<AddCategory/>}/>
        <Route path ="/category-list" element={<CategoryList/>}/>

      </Routes>
    </Router>
   </div>
  )
}

export default AppRoute