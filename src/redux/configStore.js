import { combineReducers, configureStore } from "@reduxjs/toolkit";
import mainSlice from "./modules/mainSlice";
import userSlice from "./modules/userSlice";
import commentSlice from "./modules/commentSlice";
import logger from "redux-logger";

// ::: 여러개의 reducer 통합
const reducer = combineReducers({
  mainSlice,
  userSlice,
  commentSlice
});

// ::: 스토어 생성, 미들웨어 설정
export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
