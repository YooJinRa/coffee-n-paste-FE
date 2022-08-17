// App.js
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import PostingPage from "./pages/PostingPage";
import { useDispatch } from "react-redux/es/exports";
import { synchronizeToken } from "./redux/modules/userSlice";
import { __getDatabySelectBrand } from "./redux/modules/mainSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    const storedId = localStorage.getItem("userId");
    dispatch(__getDatabySelectBrand());
    if (storedToken === null) return;
    dispatch(synchronizeToken(storedToken, storedId));
  }, [dispatch]);

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
