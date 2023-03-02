import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/users/authSlices";
import categoryReducer from "../slices/category/categorySlices";
const store = configureStore({
  reducer: {
    users: authReducer,
    category: categoryReducer,
  },
});
export default store;
