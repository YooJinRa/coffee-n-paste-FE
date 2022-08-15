// src/redux/modules/postSlice.js
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const port = '3001';

const initialState = {
  "post": [
    {
      "id": 1,
      "menuId": 1,
      "brandId": 1,
      "content": "Coffee Review Content",
      "imageUrl": "https://kimilmbucket.s3.ap-northeast-2.amazonaws.com/02_%EB%AA%A8%EC%BD%94%EC%BD%94%EC%BD%982_03_%EC%A2%8B%EC%95%84%EC%9A%94_100.png"
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
        `http://localhost:${port}/post`, {
          brandId: newPost.brandId,
          menuId: newPost.menuId,
          content: newPost.content,
          imageUrl: newPost.imageUrl
        },
        {
          headers: {
            Authorization: `Bearer AccessToken...!!`
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