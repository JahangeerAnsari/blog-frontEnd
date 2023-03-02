import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authServices";

export const registerUserAction = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      console.log("error121 register", error);
      const message =
        (error?.response &&
          error?.response?.data &&
          error?.response?.data?.msg) ||
        error?.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const userLoginAction = createAsyncThunk(
  "auth/login",
  async (payload, thunkAPI) => {
    try {
      return await authService.login(payload);
    } catch (error) {
      console.log("error121", error);
      const message =
        (error?.response &&
          error?.response?.data &&
          error?.response?.data?.msg) ||
        error?.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userLogoutAction = createAsyncThunk(
  "auth/logout",async (thunkAPI) => {
    try {
      return await authService.logout();
    } catch (error) {
      console.log("error121", error);
      const message =
        (error?.response &&
          error?.response?.data &&
          error?.response?.data?.msg) ||
        error?.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
)

// create slices
// slices
// lets get user form localStorage
const userLoginFromStorage = localStorage.getItem("userInformation") ?
 JSON.parse(localStorage.getItem("userInformation")) : null;
 console.log("userLoginFromStorage",userLoginFromStorage)
  
const initialState = {
  userAuth: userLoginFromStorage,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
export const authSlice = createSlice({
  name: "auth",
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
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      console.log("success case", action.payload);
      state.isLoading = false;
      state.isSuccess = true;
      state.userAuth = action.payload;
      state.message = action?.payload?.msg;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      console.log("action.payload error", action.payload);
      state.isLoading = false;
      state.isError = true;
      state.message = action?.payload;
      state.userAuth = null;
    });
    // login 
    builder.addCase(userLoginAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(userLoginAction.fulfilled, (state, action) => {
      console.log("Success case", action.payload)
      state.isLoading = false;
      state.isSuccess = true;
      state.userAuth = action.payload;
      state.message = action?.payload?.msg;
    });
    builder.addCase(userLoginAction.rejected, (state, action) => {
      console.log("Rejected case", action.payload)
      state.isLoading = false;
      state.isError = true;
      state.userAuth = null;
      state.message = action?.payload?.msg;
    });
    builder.addCase(userLogoutAction.fulfilled, (state, action) => {
      state.userAuth =null;
    });



   
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;