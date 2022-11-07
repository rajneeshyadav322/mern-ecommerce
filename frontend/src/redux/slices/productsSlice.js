import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../axios/apiclient";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (thunkAPI) => {
    try {
      const res = await api.get("/api/products");
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  loading: false,
  error: "",
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.products = action?.payload;
    });
    builder.addCase(getProducts.pending, (state, action) => {
        state.loading = true;
        state.error = "";
    });
    builder.addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
    });
  },
});


export const productsReducer = productsSlice.reducer;
