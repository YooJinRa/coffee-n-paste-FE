import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URI = {
  BASE: process.env.REACT_APP_USER_URI,
};

const initialState = {
  brands: [
    {
      brandId: 0,
      brandImg:
        "https://images.unsplash.com/photo-1660663374499-9cbf2415ffb9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
      brandName: "전체",
      menus: [],
    },
  ],
  currBrand: {
    brandName: "전체",
    brandId: 0,
  },
  isLoading: false,
  err: null,
};

export const __getDatabySelectBrand = createAsyncThunk(
  "main/__getDatabySelectBrand",
  async (payload, thunkAPI) => {
    try {
      const requestRes = await axios.get(`${URI.BASE}api/brands`);
      console.log(requestRes);
      return thunkAPI.fulfillWithValue(requestRes.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const mainSlice = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {
    selectBrand: (state, action) => {
      state.currBrand = state.brands[action.payload];
    },
  },
  extraReducers: {
    [__getDatabySelectBrand.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getDatabySelectBrand.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.brands.push(...action.payload);
    },
    [__getDatabySelectBrand.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
  },
});
export const { selectBrand } = mainSlice.actions;
export default mainSlice.reducer;
