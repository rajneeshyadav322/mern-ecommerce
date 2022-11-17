import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../axios/constant";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (data, thunkAPI) => {
    try {
      let query = `${BASE_URL}/api/products/get?` 
      const res = await axios.get(query, {
        params: data
      });
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
        console.log(action?.payload)
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
