import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import postServices from "./postServices";


// lets create post action
export const createPostAction = createAsyncThunk(
  "post/add-new-post",
  async (payload, { rejectWithValue, getState }) => {

      console.log("payload===>",payload)
     const formData = new FormData();
    formData.append('title',payload?.pTitle);
    formData.append('description',payload?.postDescription);
    formData.append('category',payload?.selectCat);
    formData.append('image',payload?.image);
    try {
      const user = getState()?.users;
      console.log("user-category", user);
      const { userAuth } = user;

      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      return await postServices.addNewPost(formData, config);
    } catch (error) {
      console.log("error121 category ****** ", error);
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

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
export const postSlice = createSlice({
  name: "post",
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
    // register
    builder.addCase(createPostAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createPostAction.fulfilled, (state, action) => {
      console.log("success case post new", action.payload);
      state.isLoading = false;
      state.isSuccess = true;
      state.postCreate = action.payload;
      state.message = action?.payload?.msg;
    });
    builder.addCase(createPostAction.rejected, (state, action) => {
      console.log("error case 444 *****", action);
      state.isLoading = false;
      state.isError = true;
      state.message = action?.payload;
      state.category = null;
    });

    
  },
});
export const { reset } = postSlice.actions;
export default postSlice.reducer;

