import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/users/authSlices";
import categoryReducer from "../slices/category/categorySlices";
import postReducer from "../slices/posts/postSlices";
import commentReducer from "../slices/comment/commentSlice";
const store = configureStore({
  reducer: {
    users: authReducer,
    category: categoryReducer,
    post: postReducer,
    comment:commentReducer
  },
});
export default store;
