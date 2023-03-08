import React, { useEffect, useState,useRef } from "react";
import Select from "react-select";
import "./createPost.css";
import { createPostAction,reset } from "../../redux/slices/posts/postSlices";
import { useDispatch, useSelector } from "react-redux";
import CategoryDropDown from "../category/CategoryDropDown";
import CircularProgress from "@material-ui/core/CircularProgress";
import { fetchedCategories } from "../../redux/slices/category/categorySlices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef();
  const notifyS = (msg) => toast.success(msg);
  const notifyE = (msg) => toast.error(msg);
  useEffect(() => {
    dispatch(fetchedCategories());
  }, [dispatch]);
  const { categoryList } = useSelector((store) => store?.category);
  const allCategories = categoryList?.categories.map((category) => {
    return {
      label: category?.title,
      value: category?._id,
    };
  });

  const [selectCat, setSelectCat] = useState({});
  const [image,setImage] = useState("");
  console.log("image",image?.name)

  const handleCatChnage = (e) => {
    setSelectCat(e.target.value);
  };

  console.log("selectCat",selectCat);
  console.log("allCategories", allCategories);

  const [postInputValue, setPostInputValue] = useState({
    pTitle: "",
    postDescription: "",
  });

  const { isError, isLoading, isSuccess, message, postCreate } = useSelector(
    (store) => store?.post
  );
  console.log("postInputValue", postInputValue, selectCat);
  console.log("postCreate", postCreate);
  useEffect(() => {
    if (isError) {
      console.log("is error", isError);
      notifyE(message);
    }
    if (isSuccess) {
      console.log("isSuccess", isSuccess);
      notifyS(message);
      navigate("/posts")
    }
    dispatch(reset())
  }, [isError, isSuccess, message, dispatch, navigate]);

  const handlePostChange = (e) => {
    const { name, value } = e.target;
    setPostInputValue((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e) =>{
    console.log("files",e.target.files[0])
setImage(e.target.files[0]);
  }
  const handlePostFormSubmit = (e) => {
    e.preventDefault();
    
    if (
      postInputValue?.pTitle === "" ||
      postInputValue?.postDescription === "" || image ===""
    ) {
      const errorMsg = "Please select the required fields";
      notifyE(errorMsg);
    } else {
      console.log("else calling===================*+++");
     dispatch(createPostAction({ ...postInputValue,selectCat,image  }));
    
      setPostInputValue({ pTitle: "", postDescription: "" });
      ref.current.value = null;
      setSelectCat({});
      // if()
     
    }
  };

  return (
    <div className="createPost">
      {/* //header */}
      <div className="post-header">
        <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
      </div>
      <div className="post-main">
        <form onSubmit={handlePostFormSubmit}>
          <div>
            <input
              type="text"
              name="pTitle"
              value={postInputValue?.pTitle}
              placeholder="enter post title"
              onChange={handlePostChange}
            />
          </div>
          <div className="category-dropdown">
            <select onChange={handleCatChnage} >
              <option value={""}>select category...</option>
              {allCategories?.map((cat, index) => {
                return (
                  <option value={cat.label} key={cat._id}>
                    {cat?.label}
                  </option>
                );
              })}
            </select>
            {/* <select onChange={handleCatSelct}>
              {allCategories?.map((cat, index) => {
                return (
                  <option value={} key={cat._id}>
                    {cat?.label}
                  </option>
                );
              })}
            </select> */}
          </div>
          <div>
            <input
              type="text"
              name="postDescription"
              value={postInputValue?.postDescription}
              placeholder="enter postDescription"
              onChange={handlePostChange}
            />
          </div>
          <div>
            <input type="file" ref={ref} name="file" onChange={handleFileChange}/>
          </div>
          <div className="createPost-btn">
            <button type="submit">create new Post</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
