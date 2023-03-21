import axios from "axios";
const jsonConfig = require("../../../Config.json");

const addComment = async (payload, headers) => {
  try {
    const response = await axios.post(
      jsonConfig.apiUrl + "comments/add-new-comment",
      {
        postId: payload.postId,
        description: payload.commentDesc,
      },

      headers
    );
    console.log("new comment", response);

    return Promise.resolve(response?.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const allPostComments = async (headers) => {
  console.log("config")
  try {
    const response = await axios.get(
      jsonConfig.apiUrl + "comments/all-comments",

      headers
    );
    console.log("get", response);

    return Promise.resolve(response?.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const commentServices = {
  addComment,
  allPostComments,
};
export default commentServices;
