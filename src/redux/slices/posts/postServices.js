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

const getAllPost = async ( headers,category) => {
  try {
    const response = await axios.get(
      jsonConfig.apiUrl + `post/all-post?category=${category}`,headers
    );
    console.log("post new add", response);

    return Promise.resolve(response?.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
const addLikeToPost = async ( headers,postId) => {
  try {
    const response = await axios.put(
      jsonConfig.apiUrl + "post/likes",{
        postId:postId
      },headers
    );
    console.log("like to post", response);

    return Promise.resolve(response?.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
const disLikePost = async ( headers,postId) => {
  try {
    const response = await axios.put(
      jsonConfig.apiUrl + "post/dislikes",{
        postId:postId
      },headers
    );
    console.log("dislike to post", response);

    return Promise.resolve(response?.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
const postServices ={
  addNewPost,
  getAllPost,
  addLikeToPost,
  disLikePost
}
export default postServices;