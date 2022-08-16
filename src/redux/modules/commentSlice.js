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
  mainImage:
    "https://images.unsplash.com/photo-1623157879673-859a2d8d4522?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  isLoading: false,
  err: null,
};

export const __gg = createAsyncThunk(
  "main/__getDatabySelectBrand",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.get(`http://localhost:3001/data/${payload}`);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const commentSlice = createSlice({
  name: "commentSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [__gg.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__gg.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.mainImage = action.payload.image;
      state.menus = action.payload.menus;
    },
    [__gg.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
  },
});

export default commentSlice.reducer;
