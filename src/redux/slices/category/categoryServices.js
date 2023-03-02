import axios from "axios";
const jsonConfig = require("../../../Config.json");
const addCategory = async (payload, headers) => {
  try {
    const response = await axios.post(
      jsonConfig.apiUrl + "category/add",
      {
        title: payload,
      },
      headers
    );
    console.log("response category  --->19999", response);

    return Promise.resolve(response?.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
const getAllCategories = async (headers) => {

  try {
    const response = await axios.get(
      jsonConfig.apiUrl + "category/",
      headers
    );
    console.log("response category 2222", response);
    return Promise.resolve(response?.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
const updateCategory = async (id, payload,headers) => {
  try {
    const response = await axios.put(
      jsonConfig.apiUrl + `category/update/${id}`,
      {title:payload},
      headers
     
    );
    console.log("response category 2222", response);
    return Promise.resolve(response?.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const deleteCategory = async (headers, id) => {
  try {
    const response = await axios.delete(
      jsonConfig.apiUrl + `category/delete/${id}`,
      headers
    );
    console.log("response category 2222", response);
    return Promise.resolve(response?.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
const fetchSingleCategory = async (headers, id) => {
  try {
    const response = await axios.get(
      jsonConfig.apiUrl + `category/single/${id}`,
      headers
    );
    console.log("response category 2222", response);
    return Promise.resolve(response?.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const categoryServices = {
  addCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  fetchSingleCategory,
};
export default categoryServices;
