import { createAsyncThunk, createSlice,createAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import postServices from "./postServices";

// action to redirect



// lets create post action
export const createPostAction = createAsyncThunk(
  "post/add-new-post",
  async (payload, { rejectWithValue, getState }) => {
    console.log("payload===>", payload);
    const formData = new FormData();
    formData.append("title", payload?.pTitle);
    formData.append("description", payload?.postDescription);
    formData.append("category", payload?.selectCat);
    formData.append("image", payload?.image);
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
// fetch all posts
export const fetchAllPosts = createAsyncThunk(
  "post/all-post",
  async (category, { rejectWithValue, getState }) => {
    try {
      const user = getState()?.users;
      console.log("user-category", user);
      const { userAuth } = user;

      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      return await postServices.getAllPost(config, category);
    } catch (error) {
      console.log("error121  ****** ", error);
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
// add like to post
export const addToggleLikeToPost = createAsyncThunk(
  "post/likes",
  async (postId, { rejectWithValue, getState }) => {
    console.log("postId", postId);
    try {
      const user = getState()?.users;
      console.log("user-category", user);
      const { userAuth } = user;

      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      return await postServices.addLikeToPost(config, postId);
    } catch (error) {
      console.log("error121  ****** ", error);
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

// dislike post
export const addToggleToDislikePost = createAsyncThunk(
  "post/dislikes",
  async (postId, { rejectWithValue, getState }) => {
    console.log("postId", postId);
    try {
      const user = getState()?.users;
      console.log("user-category", user);
      const { userAuth } = user;

      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      return await postServices.disLikePost(config, postId);
    } catch (error) {
      console.log("error121  ****** ", error);
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
// fetch all posts
export const fetchSinglePostAction = createAsyncThunk(
  "post/",
  async (postId, { rejectWithValue, getState }) => {
    console.log("postId123", postId);
    try {
      const user = getState()?.users;
      console.log("user-category", user);
      const { userAuth } = user;

      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      return await postServices.getSinglePost(config, postId);
    } catch (error) {
      console.log("error121  ****** ", error);
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
export const updatePostAction = createAsyncThunk(
  "post/update",
  async (payload, { rejectWithValue, getState }) => {
    console.log("payload---->", payload);
    try {
      const user = getState()?.users;
      console.log("user-post", user);
      const { userAuth } = user;

      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      return await postServices.updatePost(config, payload);
    } catch (error) {
      console.log("error121  ****** ", error);
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
export const deletePostAction = createAsyncThunk(
  "post/delete",
  async (postId, { rejectWithValue, getState }) => {
   
    try {
      const user = getState()?.users;
      console.log("user-post", user);
      const { userAuth } = user;

      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
     
      return await postServices.deletePost(config, postId);
      

    } catch (error) {
      console.log("error121  ****** ", error);
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
    // create new post
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

    // get all posts
    builder.addCase(fetchAllPosts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
      console.log("success case fetch posts", action.payload);
      state.isLoading = false;
      state.isSuccess = true;
      state.postList = action.payload;
      state.message = action?.payload?.msg;
    });
    builder.addCase(fetchAllPosts.rejected, (state, action) => {
      console.log("error case 444  fetch post*****", action);
      state.isLoading = false;
      state.isError = true;
      state.message = action?.payload;
      state.postList = null;
    });

    // post like
    builder.addCase(addToggleLikeToPost.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addToggleLikeToPost.fulfilled, (state, action) => {
      console.log("success case like posts", action.payload);
      state.isLoading = false;
      state.isSuccess = true;
      state.likes = action.payload;
      state.message = action?.payload?.msg;
    });
    builder.addCase(addToggleLikeToPost.rejected, (state, action) => {
      console.log("error case 444  like post*****", action);
      state.isLoading = false;
      state.isError = true;
      state.message = action?.payload;
      state.likes = null;
    });

    // dislike the post
    builder.addCase(addToggleToDislikePost.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addToggleToDislikePost.fulfilled, (state, action) => {
      console.log("success case like posts", action.payload);
      state.isLoading = false;
      state.isSuccess = true;
      state.disLikes = action.payload;
      state.message = action?.payload?.msg;
    });
    builder.addCase(addToggleToDislikePost.rejected, (state, action) => {
      console.log("error case 444  like post*****", action);
      state.isLoading = false;
      state.isError = true;
      state.message = action?.payload;
      state.disLikes = null;
    });
    // get single post
    builder.addCase(fetchSinglePostAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSinglePostAction.fulfilled, (state, action) => {
      console.log("success case get single post", action.payload);
      state.isLoading = false;
      state.isSuccess = true;
      state.postDetail = action.payload;
      state.message = action?.payload?.msg;
    });
    builder.addCase(fetchSinglePostAction.rejected, (state, action) => {
      console.log("error case 444  single post", action);
      state.isLoading = false;
      state.isError = true;
      state.message = action?.payload;
      state.postDetail = null;
    });

    // update post
    builder.addCase(updatePostAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updatePostAction.fulfilled, (state, action) => {
      console.log("success case update post", action.payload);
      state.isLoading = false;
      state.isSuccess = true;
      state.updatePost = action.payload;
      state.message = action?.payload?.msg;
    });
    builder.addCase(updatePostAction.rejected, (state, action) => {
      console.log("error case update post", action);
      state.isLoading = false;
      state.isError = true;
      state.message = action?.payload;
      state.updatePost = null;
    });
    // delete post
    builder.addCase(deletePostAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deletePostAction.fulfilled, (state, action) => {
      console.log("success case delete post", action.payload);
      state.isLoading = false;
      state.isSuccess = true;
      state.deletedPost = action.payload;
      state.message = action?.payload?.msg;
    });
    builder.addCase(deletePostAction.rejected, (state, action) => {
      console.log("error case delete post", action);
      state.isLoading = false;
      state.isError = true;
      state.message = action?.payload;
      state.deletedPost = null;
    });
  },
});
export const { reset } = postSlice.actions;
export default postSlice.reducer;
