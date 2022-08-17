import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Buffer } from "buffer";

const URI = {
  BASE: process.env.REACT_APP_USER_URI,
};

const initialState = {
  userId: "",
  userName: "",
  userToken: null,
  isLoading: false,
  err: null,
};

export const __postUserRegistraion = createAsyncThunk(
  "/user/__postUserRegistraion",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const requestRes = await axios.post(`${URI.BASE}api/register`, {
        memberName: payload.id,
        memberNickname: payload.nickName,
        memberPassword: payload.password,
        memberPasswordConfirm: payload.passwordConfirm,
      });
      console.log(requestRes);
      // return thunkAPI.fulfillWithValue(requestRes);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postUserExistance = createAsyncThunk(
  "/user/__postUserExistance",
  async (payload, thunkAPI) => {
    try {
      const requestRes = await axios.post(`${URI.BASE}api/login`, {
        memberName: payload.id,
        memberPassword: payload.password,
      });
      console.log(requestRes);
      const accessToken = requestRes.data.authorization;
      const refreshToken = requestRes.data.refreshToken;
      const encodeBody = accessToken.split(".")[1];
      const decodeBody = Buffer.from(encodeBody, "base64")
        .toString("utf8")
        .split('"');
      return thunkAPI.fulfillWithValue({
        userId: decodeBody[3],
        userName: decodeBody[7],
        accessToken,
        refreshToken,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.status);
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    synchronizeToken: (state, action) => {
      state.userToken = action.payload;
    },
    userLogout: (state, action) => {
      axios.delete(`${URI.BASE}api/logout`, {
        headers: {
          Authorization: action.payload,
        },
      });
      state.userToken = null;
      console.log(state);
    },
  },
  extraReducers: {
    [__postUserExistance.pending]: (state, action) => {
      state.isLoading = true;
      state.err = null;
    },
    [__postUserExistance.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.userToken = action.payload.accessToken;
      localStorage.setItem("userToken", action.payload.accessToken);
      localStorage.setItem("userId", action.payload.userId);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
    },
    [__postUserExistance.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
  },
});

export const { synchronizeToken, userLogout } = userSlice.actions;

export default userSlice.reducer;
