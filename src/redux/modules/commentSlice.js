import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URI = {
  BASE: process.env.REACT_APP_BASE_URI,
};

const initialState = {
  brands: [],
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

export const __getCommentsByPostId = createAsyncThunk(
  "comment/__getCommentsByPostId",
  async (payload, thunkAPI) => {
    try {
      const targetPostId = payload.postId;
      const requestRes = await axios.get(
        `${URI.BASE}api/comment?post-id=${targetPostId}`
      );
      console.log(requestRes);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const __postComment = createAsyncThunk(
  "comment/__postComment",
  async (payload, thunkAPI) => {
    try {
      const targetPostId = payload.postId;
      const userToken = payload.userToken;
      const commentBody = payload.commentBody;
      const requestRes = await axios.post(
        `${URI.BASE}api/comment?post-id=${targetPostId}`,
        {
          commentContent: commentBody,
        },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      console.log(requestRes);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const __updateMyComment = createAsyncThunk(
  "comment/__updateMyComment",
  async (payload, thunkAPI) => {
    try {
      const targetCommentId = payload.commentId;
      const updatedCommentBody = payload.newCommentBody;
      const userToken = payload.userToken;

      const requestRes = await axios.put(
        `${URI.BASE}api/comment/${targetCommentId}`,
        {
          commentContent: updatedCommentBody,
        },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );

      console.log(requestRes);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const __deleteMyComment = createAsyncThunk(
  "comment/__deleteMyComment",
  async (payload, thunkAPI) => {
    try {
      const userToken = payload.userToken;
      const targetCommentId = payload.commentId;

      const requestRes = await axios.delete(
        `${URI.BASE}api/comment/${targetCommentId}`,
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const commentSlice = createSlice({
  name: "commentSlice",
  initialState,
  reducers: {},
  extraReducers: {
    //post별 달려있는 댓글 확인
    [__getCommentsByPostId.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getCommentsByPostId.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [__getCommentsByPostId.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    //post에 댓글 등록
    [__postComment.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__postComment.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [__postComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    //본인이 작성한 댓글 수정
    [__updateMyComment.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__updateMyComment.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [__updateMyComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    //본인이 작성한 댓글 삭제
  },
});

export default commentSlice.reducer;
