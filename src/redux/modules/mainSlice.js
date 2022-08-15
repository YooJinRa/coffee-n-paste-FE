import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  brands: [
    {
      name: "전체",
      id: 0,
    },
    {
      name: "스타벅스",
      id: 1,
    },
    {
      name: "메가커피",
      id: 2,
    },
    {
      name: "할리스커피",
      id: 3,
    },
    {
      name: "컴포즈커피",
      id: 4,
    },
    {
      name: "투썸플레이스",
      id: 5,
    },
  ],
  currBrand: {
    name: "전체",
    id: 0,
  },
  menus: [],
  isLoading: false,
  err: null,
};

export const __getMenusbyBrand = createAsyncThunk(
  "main/__getMenusbyBrand",
  async (payload, thunkAPI) => {
    try {
      const menuRes = await axios.get(
        `http://localhost:3001/menus?brandId=${payload}`
      );
      return thunkAPI.fulfillWithValue(menuRes.data);
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
    [__getMenusbyBrand.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getMenusbyBrand.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.menus = action.payload;
    },
    [__getMenusbyBrand.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
  },
});
export const { selectBrand } = mainSlice.actions;
export default mainSlice.reducer;
