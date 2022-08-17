// App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import PostingPage from "./pages/PostingPage";
import { useDispatch } from "react-redux/es/exports";
import { synchronizeToken } from "./redux/modules/userSlice";
import { __getDatabySelectBrand } from "./redux/modules/mainSlice";

function App() {
  const storedToken = localStorage.getItem("userToken");
  const dispatch = useDispatch();
  const handleWindowLoad = () => {
    console.log("너왜 두번,,?");
    // dispatch(synchronizeToken(storedToken));
    dispatch(__getDatabySelectBrand());
  };
  window.addEventListener("load", handleWindowLoad);
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/post/" element={<PostingPage />} />
      </Routes>
    </>
  );
}

export default App;
