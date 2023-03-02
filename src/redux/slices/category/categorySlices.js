import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryServices from "./categoryServices";
export const addNewCategoryAction = createAsyncThunk(
  "category/add",
  async (title, { rejectWithValue, getState }) => {
    try {
      const user = getState()?.users;
      console.log("user-category", user);
      const { userAuth } = user;

      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      return await categoryServices.addCategory(title, config);
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
// fetch all categories
export const fetchedCategories = createAsyncThunk(
  "category/",
  async (_, { rejectWithValue, getState }) => {
    try {
      const user = getState()?.users;
      console.log("user-category", user);
      const { userAuth } = user;
      // Config
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      return await categoryServices.getAllCategories(config);
    } catch (error) {
      console.log("error121 =====>", error?.response?.data?.msg);
      const message =
        (error?.response &&
          error?.response?.data &&
          error?.response?.data?.msg) ||
        error?.toString();

      return rejectWithValue(message);
    }
  }
);
// update category
export const updateCategoryAction = createAsyncThunk(
  "category/update",
  async (category, { rejectWithValue, getState }) => {
   
    try {
      const user = getState()?.users;
      console.log("user-category", user);
      const { userAuth } = user;
      // Config
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      return await categoryServices.updateCategory(category?.id, category.title,config);
    } catch (error) {
      console.log("error121 =====>", error?.response?.data?.msg);
      const message =
        (error?.response &&
          error?.response?.data &&
          error?.response?.data?.msg) ||
        error?.toString();

      return rejectWithValue(message);
    }
  }
);

// delete category
export const deleteCategoryAction = createAsyncThunk(
  "category/delete",
  async (id, { rejectWithValue, getState }) => {
    try {
      const user = getState()?.users;
      console.log("user-category", user);
      const { userAuth } = user;
      // Config
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      return await categoryServices.deleteCategory(config,id);
    } catch (error) {
      console.log("error121 =====>", error?.response?.data?.msg);
      const message =
        (error?.response &&
          error?.response?.data &&
          error?.response?.data?.msg) ||
        error?.toString();

      return rejectWithValue(message);
    }
  }
);

export const fetchSingleCategoryAction = createAsyncThunk(
  "category/single",
  async (id, { rejectWithValue, getState }) => {
    try {
      const user = getState()?.users;
      console.log("user-category", user);
      const { userAuth } = user;
      // Config
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      return await categoryServices.fetchSingleCategory(config,id);
    } catch (error) {
      console.log("error121 =====>", error?.response?.data?.msg);
      const message =
        (error?.response &&
          error?.response?.data &&
          error?.response?.data?.msg) ||
        error?.toString();

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
export const categorySlice = createSlice({
  name: "category",
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
    builder.addCase(addNewCategoryAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addNewCategoryAction.fulfilled, (state, action) => {
      console.log("success case category", action.payload);
      state.isLoading = false;
      state.isSuccess = true;
      state.category = action.payload;
      state.message = action?.payload?.msg;
    });
    builder.addCase(addNewCategoryAction.rejected, (state, action) => {
      console.log("error case 444 *****", action);
      state.isLoading = false;
      state.isError = true;
      state.message = action?.payload;
      state.category = null;
    });

    // fetch categories
    builder.addCase(fetchedCategories.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchedCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.categoryList = action.payload;
      state.message = action?.payload?.msg;
    });
    builder.addCase(fetchedCategories.rejected, (state, action) => {
      console.log("error case", action);
      state.isLoading = false;
      state.isError = true;
      state.message = action?.payload;
      state.categoryList = null;
    });


// update category
    builder.addCase(updateCategoryAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateCategoryAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.updateCategory = action.payload;
      state.message = action?.payload?.msg;
    });
    builder.addCase(updateCategoryAction.rejected, (state, action) => {
      console.log("error case", action);
      state.isLoading = false;
      state.isError = true;
      state.message = action?.payload;
      state.updateCategory = null;
    });


    

    // delete category
    builder.addCase(deleteCategoryAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCategoryAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.deletedCategory = action.payload;
      state.message = action?.payload?.msg;
    });
    builder.addCase(deleteCategoryAction.rejected, (state, action) => {
      console.log("error case", action);
      state.isLoading = false;
      state.isError = true;
      state.message = action?.payload;
      state.deletedCategory = null;
    });

    // single
    builder.addCase(fetchSingleCategoryAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSingleCategoryAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.category = action.payload;
      state.message = action?.payload?.msg;
    });
    builder.addCase(fetchSingleCategoryAction.rejected, (state, action) => {
      console.log("error case", action);
      state.isLoading = false;
      state.isError = true;
      state.message = action?.payload;
      state.category = null;
    });

  },
});
export const { reset } = categorySlice.actions;
export default categorySlice.reducer;
