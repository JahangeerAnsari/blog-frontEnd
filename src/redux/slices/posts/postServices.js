import axios from "axios";
const jsonConfig = require("../../../Config.json");

const addNewPost = async (formData, headers) => {
  try {
    const response = await axios.post(
      jsonConfig.apiUrl + "post/add-new-post",
      formData,

      headers
    );
    console.log("post new add", response);

    return Promise.resolve(response?.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
// get all posts

const getAllPost = async (headers, category) => {
  try {
    const response = await axios.get(
      jsonConfig.apiUrl + `post/all-post?category=${category}`,
      headers
    );
    console.log("post new add", response);

    return Promise.resolve(response?.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
const addLikeToPost = async (headers, postId) => {
  try {
    const response = await axios.put(
      jsonConfig.apiUrl + "post/likes",
      {
        postId: postId,
      },
      headers
    );
    console.log("like to post", response);

    return Promise.resolve(response?.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
const disLikePost = async (headers, postId) => {
  try {
    const response = await axios.put(
      jsonConfig.apiUrl + "post/dislikes",
      {
        postId: postId,
      },
      headers
    );
    console.log("dislike to post", response);

    return Promise.resolve(response?.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
const getSinglePost = async (headers, postId) => {
  try {
    const response = await axios.get(
      jsonConfig.apiUrl + `post/${postId}`,
      headers
    );
    console.log("get Single post", response);

    return Promise.resolve(response?.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
const updatePost = async (headers,payload, ) => {
 
  const {postInputField,postId} = payload;
  
  try {
    const response = await axios.put(
      jsonConfig.apiUrl + `post/update/${postId}`,
      {
        title: postInputField?.title,
        description: postInputField?.description,
      },
      headers
    );
    console.log("get Single post", response);

    return Promise.resolve(response?.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const deletePost = async (headers,postId ) => {
  console.log("delete post id",postId)
  try {
    const response = await axios.delete(
      jsonConfig.apiUrl + `post/delete/${postId}`,
      
      headers
    );
    console.log("get Single post", response);


    return Promise.resolve(response?.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
const postServices = {
  addNewPost,
  getAllPost,
  addLikeToPost,
  disLikePost,
  getSinglePost,
  updatePost,
  deletePost
};
export default postServices;
