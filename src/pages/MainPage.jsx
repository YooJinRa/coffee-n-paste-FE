import React from "react";
import Header from "../components/main/Header";
import MainImage from "../components/main/MainImage";
import NavigationGroup from "../components/main/fixNavigation/NavigationGroup";
import PostLayout from "../components/main/mainContents/PostLayout";

function MainPage(props) {
  return (
    <>
      <Header />
      <MainImage />
      <NavigationGroup />
      <PostLayout />
    </>
  );
}

export default MainPage;
