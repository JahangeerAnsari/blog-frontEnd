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
const postServices ={
  addNewPost
}
export default postServices;