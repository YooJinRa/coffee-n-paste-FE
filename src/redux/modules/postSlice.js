// src/redux/modules/postSlice.js
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const URI = {
//   BASE: process.env.REACT_APP_BASE_URI,
// };

const initialState = {
  "post": [
    {
      "id": 1,
      "menuId": 1,
      "brandId": 1,
      "content": "Coffee Review Content"
    },
  ],
  "image": [
    {
      "id": 1,
      "image": "newPostImg.postImg"
    }
  ],
  isLoading: false,
  error: null
}

// export const __addPost = createAsyncThunk(
//   "post/__addPost", 
//   async (newPost, thunkAPI) => {
//     try {
//       const postResponse = await axios.post(
//           // `${URI.BASE}/api/post`, {
//           `${URI.BASE}/post`, {
//           brandId: newPost.brandId,
//           menuId: newPost.menuId,
//           content: newPost.content
//         },
//         {
//           headers: {
//             Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJOYW1lIjoia3RoNDIiLCJtZW1iZXJOaWNrbmFtZSI6Imthbmd0YWVob29uIiwiZXhwIjoxNjYwNjUzMDQyfQ.Hk-hTqTyqbbLZK1jZSfiErEtK5_UY8ukWByT9lmSoH0`
//           },
//         }
//       );
//       return thunkAPI.fulfillWithValue(postResponse.data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   });

  // //__addPostImg
  // export const __addPostImg = createAsyncThunk(
  //   "post/__addPostImg", 
  //   async (newPostImg, thunkAPI) => {
  //     try {
  //       const postResponse = await axios.post(
  //           //`${URI.BASE}/api/post/upload-image`, 
  //           `${URI.BASE}/image`, {
  //             image: newPostImg.postImg,
  //           },
  //           {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //             Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJOYW1lIjoia3RoNDIiLCJtZW1iZXJOaWNrbmFtZSI6Imthbmd0YWVob29uIiwiZXhwIjoxNjYwNjUzMDQyfQ.Hk-hTqTyqbbLZK1jZSfiErEtK5_UY8ukWByT9lmSoH0`
  //           },
  //         }
  //       );
  //       return thunkAPI.fulfillWithValue(postResponse.data);
  //     } catch (error) {
  //       return thunkAPI.rejectWithValue(error);
  //     }
  //   });


// ::: [Reducer]
export const postSlice = createSlice({
  name: 'post',
  initialState: initialState,
  reducers: { },
  extraReducers: { 
    // :: 게시글
    // [__addPost.pending]: (state, { payload }) => { 
    //   state.isLoading = true;
    // },
    // [__addPost.fulfilled]: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.post = payload;
    // },
    // [__addPost.rejected]: (state, { payload }) => { 
    //   state.isLoading = false;
    // },

    // :: 게시글 이미지
    // [__addPostImg.pending]: (state, { payload }) => { 
    //   state.isLoading = true;
    // },
    // [__addPostImg.fulfilled]: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.image = payload;
    // },
    // [__addPostImg.rejected]: (state, { payload }) => { 
    //   state.isLoading = false;
    // }
  },
});


export default postSlice.reducer