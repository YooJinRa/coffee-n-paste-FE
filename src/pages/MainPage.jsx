import React from "react";
import Header from "../components/main/Header";
import MainImage from "../components/main/MainImage";
import NavigationGroup from "../components/main/fixNavigation/NavigationGroup";

function MainPage(props) {
  return (
    <>
      <Header />
      <MainImage />
      <NavigationGroup />
    </>
  );
}

export default MainPage;
