// src/redux/modules/postSlice.js
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const server = `http://52.78.159.34`;
const testServer = `http://localhost:3001/post`;

const initialState = {
  "post": [
    {
      "id": 1,
      "menuId": 1,
      "brandId": 1,
      "content": "Coffee Review Content",
      "postImg": "https://kimilmbucket.s3.ap-northeast-2.amazonaws.com/02_%EB%AA%A8%EC%BD%94%EC%BD%94%EC%BD%982_03_%EC%A2%8B%EC%95%84%EC%9A%94_100.png"
    },
  ],
  isLoading: false,
  error: null
}

export const __addPost = createAsyncThunk(
  "post/__addPost", 
  async (newPost, thunkAPI) => {
    try {
      const postResponse = await axios.post(
        // `${server}/api/post`, {
          `${testServer}`, {
          brandId: newPost.brandId,
          menuId: newPost.menuId,
          content: newPost.content,
          postImg: newPost.postImg // 이미지url 문자열
        },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJOYW1lIjoic3BhcnRhIiwibWVtYmVyTmlja25hbWUiOiJHZXJhcmQgQnV0bGVyIiwiZXhwIjoxNjYwNTY3MzkwfQ.zPpMMG2iuaDClg0C8tzdEpTAJYSjpnyyDcrxmdIqekw`
          },
        }
      );
      return thunkAPI.fulfillWithValue(postResponse.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  });

// ::: [Reducer]
export const postSlice = createSlice({
  name: 'post',
  initialState: initialState,
  reducers: { },
  extraReducers: { 
    // :: 게시글
    [__addPost.pending]: (state, { payload }) => { 
      state.isLoading = true;
    },
    [__addPost.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.post = payload;
    },
    [__addPost.rejected]: (state, { payload }) => { 
      state.isLoading = false;
    }
  },
});


export default postSlice.reducer