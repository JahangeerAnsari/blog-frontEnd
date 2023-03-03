import axios from "axios";
// const API_URL = 'http://localhost:4000/api/v1/auth/register';
const jsonConfig = require("../../../Config.json");



const register = async (payload) => {
  let user ={}
  try {

    const response = await axios.post(jsonConfig.apiUrl + 'auth/register',payload);
    console.log('response', response);
  
    user = response;
    return Promise.resolve(user.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
const login = async (payload) => {
  let user ={}
  try {

    const response = await axios.post(jsonConfig.apiUrl + 'auth/login',payload);
    console.log('response', response);
    if (response.data) {
      localStorage.setItem("userInformation", JSON.stringify(response.data));
    }
  user = response;
    return Promise.resolve(user.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const logout = async () => {
  localStorage.removeItem("userInformation");
};
const authService = {
  register,
  login,
  logout
};
export default authService;
