import React from "react";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MoodIcon from '@material-ui/icons/Mood';
import './home.css'
const Home = () => {
  return (
    <div className="home">
      <div className="card">
        {/* card header */}
        <div className="card-header">
          <div className="card-pic">
            <img
              src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              alt="profile-pic"
              className=""
            />
          </div>
          <h5>Jain Babu</h5>
        </div>
        {/* card image */}
        <div className="card-image">
        <img
              src="https://images.unsplash.com/photo-1556819793-5acee9fb0a99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
              alt="profile-pic"
              className=""
            />
        </div>
        {/* card content */}
        <div className="card-content">
         <span>
         <FavoriteBorderIcon/>
         </span>
         <p>1 like</p>
         <p>this is amazing</p>
        </div>
        {/* card comment */}
        <div className="add-comment">
        <span>
         <MoodIcon/>
        </span>
        <input type="text" placeholder="enter comment"/>
        <button  className="comment">post</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
