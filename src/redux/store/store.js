import { configureStore,  } from "@reduxjs/toolkit";
import authReducer from "../slices/users/authSlices";
const store = configureStore({
reducer:{
  users: authReducer,
}
})
export default store;
