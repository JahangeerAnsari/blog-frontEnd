import React from 'react'
import axios from 'axios';
const jsonConfig = require('../../Config.json');

const userRegisteration = async (payload) => {
  let user = {};
  try {
    const response = await axios.post(jsonConfig.apiUrl + 'auth/register',payload);
    console.log('response', response);

    user = response;
    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
}

export default userRegisteration