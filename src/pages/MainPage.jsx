import React from "react";
import Header from "../components/main/Header";
import DetailModalBody from "../components/main/detailModal/Body";
import NavigationGroup from "../components/main/fixNavigation/NavigationGroup";

function MainPage(props) {
  return (
    <>
      <Header />
      <NavigationGroup />
      <DetailModalBody />
    </>
  );
}

export default MainPage;
