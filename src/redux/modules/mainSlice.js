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
  posts: []
};

export const __getDatabySelectBrand = createAsyncThunk(
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

// ::: 메인 게시글 리스트 출력
export const __getPostAll = createAsyncThunk(
  "main/__getPostAll",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(`http://3.35.230.179/api/posts`);
      return thunkAPI.fulfillWithValue(response.data);
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
      state.mainImage = action.payload.image;
      state.menus = action.payload.menus;
    },
    [__getDatabySelectBrand.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },

    // 전체 게시글 불러오기
    [__getPostAll.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getPostAll.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    [__getPostAll.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export const { selectBrand } = mainSlice.actions;
export default mainSlice.reducer;
