import { configureStore, combineReducers } from "@reduxjs/toolkit";
import mainSlice from "./modules/mainSlice";

const reducer = combineReducers({
  mainSlice,
});

const store = configureStore({
  reducer,
});

export default store;
