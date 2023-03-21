import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchedCategories } from "../../redux/slices/category/categorySlices";
import {
  fetchSinglePostAction,
  updatePostAction,
} from "../../redux/slices/posts/postSlices";

const UpdatePost = () => {
  const { id: postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifyS = (msg) => toast.success(msg);
  const notifyE = (msg) => toast.error(msg);
  const {
    postDetail,
    isLoading,
    isError,
    isSuccess,
    updatePost,
    message,
  } = useSelector((store) => store?.post);
  const post = postDetail?.post;
  const [postInputField, setPostInputField] = useState({});
  const [selectCat, setSelectCat] = useState({});

  useEffect(() => {
    dispatch(fetchedCategories());
  }, [dispatch]);

  useEffect(() => {
    setPostInputField(post);
  }, [post]);

  const { categoryList } = useSelector((store) => store?.category);
  const allCategories = categoryList?.categories.map((category) => {
    return {
      label: category?.title,
      value: category?._id,
    };
  });

  useEffect(() => {
    dispatch(fetchSinglePostAction(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (isError) {
      console.log("is error", isError);
      notifyE(message);
    }
    if (isSuccess) {
      console.log("isSuccess", isSuccess);
      notifyS(message);
    }
    // dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);
  const handlePostChange = (e) => {
    const { name, value } = e.target;
    setPostInputField((prev) => ({ ...prev, [name]: value }));
  };

  const handleCatChnage = (e) => {
    setSelectCat(e.target.value);
  };
  const handlePostUpdateFormSubmit = (e) => {
    e.preventDefault();
    const payload = {
      postInputField,
      postId,
    };
    if (postInputField?.title === "" || postInputField?.description === "") {
      const errorMsg = "Please fill the required field";
      notifyE(errorMsg);
    } else {
      dispatch(updatePostAction(payload));
      if (isSuccess) {
        setTimeout(() => {
          navigate("/posts");
        }, 1000);
      }
    }
  };

  return (
    <div className="add-category">
     { isLoading ? ( <CircularProgress/>): (
      <>
      <h5>Update Post</h5>
      <div>
        <form onSubmit={handlePostUpdateFormSubmit}>
          <div>
            <input
              type="text"
              name="title"
              value={postInputField?.title || ""}
              placeholder="enter post title"
              onChange={handlePostChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="description"
              value={postInputField?.description || ""}
              placeholder="enter description"
              onChange={handlePostChange}
            />
          </div>
         

          <div className="add-category">
            <button type="submit">Update Post</button>
          </div>
        </form>
      </div>
      </>
     )}
    </div>
  );
};

export default UpdatePost;
