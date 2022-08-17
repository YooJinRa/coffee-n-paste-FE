// App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import PostingPage from "./pages/PostingPage";
import { useDispatch } from "react-redux/es/exports";
import { synchronizeToken } from "./redux/modules/userSlice";

function App() {
  const storedToken = localStorage.getItem("userToken");
  const dispatch = useDispatch();
  const handleWindowLoad = () => {
    dispatch(synchronizeToken(storedToken));
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
