import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentServices from "./commentServices";

// add new comments
export const addCommentToPostAction = createAsyncThunk(
  "comments/add-new-comment",
  async (payload, { rejectWithValue, getState }) => {

    console.log("payload comment",payload);
    
    try {
      const user = getState()?.users;
      console.log("user-category", user);
      const { userAuth } = user;

      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      return await commentServices.addComment(payload, config);
    } catch (error) {
      console.log("error121 comment ****** ", error);
      const message =
        (error?.response &&
          error?.response?.data &&
          error?.response?.data?.msg) ||
        error?.toString();
      console.log("message category ****", message);

      return rejectWithValue(message);
    }
  }
);
export const getAllPostsCommentsAction = createAsyncThunk(
  "comments/all-comments",
  async (_, { rejectWithValue, getState }) => {

    // console.log("payload comment",payload);
    
    try {
      const user = getState()?.users;
      console.log("user-category", user);
      const { userAuth } = user;

      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      return await commentServices.allPostComments(config);
    } catch (error) {
      console.log("error121 comment ****** ", error);
      const message =
        (error?.response &&
          error?.response?.data &&
          error?.response?.data?.msg) ||
        error?.toString();
      console.log("message category ****", message);

      return rejectWithValue(message);
    }
  }
);


// create slices
// slices
const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // add new comment
    builder.addCase(addCommentToPostAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addCommentToPostAction.fulfilled, (state, action) => {
      console.log("success case comment", action.payload);
      state.isLoading = false;
      state.isSuccess = true;
      state.postComments = action.payload;
      state.message = action?.payload?.msg;
    });
    builder.addCase(addCommentToPostAction.rejected, (state, action) => {
      console.log("error case 444 *****", action);
      state.isLoading = false;
      state.isError = true;
      state.message = action?.payload;
      state.postComments = null;
    });
// fetch all comments
    builder.addCase(getAllPostsCommentsAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllPostsCommentsAction.fulfilled, (state, action) => {
      console.log("success case all comments", action.payload);
      state.isLoading = false;
      state.isSuccess = true;
      state.allComments = action.payload;
      state.message = action?.payload?.msg;
    });
    builder.addCase(getAllPostsCommentsAction.rejected, (state, action) => {
      console.log("error case 444 *****", action);
      state.isLoading = false;
      state.isError = true;
      state.message = action?.payload;
      state.allComments = null;
    });

   




    

    

    
  },
});
export const { reset } = commentSlice.actions;
export default commentSlice.reducer;
