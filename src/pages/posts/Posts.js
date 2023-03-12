import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MoodIcon from "@material-ui/icons/Mood";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {
  fetchAllPosts,
  addToggleLikeToPost,
  addToggleToDislikePost,
} from "../../redux/slices/posts/postSlices";
import DateFormatter from "../../utils/DateFormatter";
import { fetchedCategories } from "../../redux/slices/category/categorySlices";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

const Posts = () => {
  const dispatch = useDispatch();
  const { postList, isLoading, likes, disLikes } = useSelector(
    (store) => store?.post
  );
  console.log("postList", postList);
  const { categoryList } = useSelector((store) => store?.category);
  console.log("categoryList", categoryList);

  useEffect(() => {
    dispatch(fetchAllPosts(""));
  }, [dispatch, likes, disLikes]);

  // fetched all categories
  useEffect(() => {
    dispatch(fetchedCategories());
  }, [dispatch]);

  return (
    <div className="main">
      <div className="box">
        <h3>CATEGORIES</h3>
        {categoryList?.categories.map((category, index) => {
          return (
            <ul key={index}>
              <li onClick={() => dispatch(fetchAllPosts(category?.title))}>
                {category?.title}
              </li>
            </ul>
          );
        })}
      </div>
      <div className="home">
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            {postList?.posts.map((post) => {
              return (
                <div className="card">
                  {/* card header */}
                  <div className="card-header">
                    <div className="card-pic">
                      <img
                        src={post?.user?.profilePhoto}
                        alt="profile-pic"
                        className=""
                      />
                      <p>{post?.title}</p>
                      <span>
                        {" "}
                        <DateFormatter date={post?.createdAt} />
                      </span>
                    </div>
                    <h5>{post?.user.name}</h5>
                  </div>
                  {/* card image */}
                  <div className="card-image">
                    <img src={post?.image} alt="profile-pic" className="" />
                  </div>
                  {/* card content */} 
                  <p>{post?.description}
                  <Link to={`/posts/${post?._id}`}>Read more..</Link>
                  </p>
                  <div className="card-content">
                    <span>
                      <ThumbUpIcon
                        onClick={() => dispatch(addToggleLikeToPost(post?._id))}
                      />
                      <p>
                        {post?.likes.length ? post?.likes.length : 0} 
                      </p>
                    </span>
                    <span>
                      <ThumbDownIcon
                        onClick={() =>
                          dispatch(addToggleToDislikePost(post._id))
                        }
                      />
                      <p>
                        {" "}
                        {post?.disLikes.length ? post?.disLikes.length : 0}{" "}
                        
                      </p>
                    </span>
                    <span>
                      <VisibilityIcon />
                      <p> {post?.numViews} views</p>
                    </span>
                  </div>
                  {/* card comment */}
                  <div className="add-comment">
                    <span>
                      <MoodIcon />
                    </span>
                    <input type="text" placeholder="enter comment" />
                    <button className="comment">post</button>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Posts;
