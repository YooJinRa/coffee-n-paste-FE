import React, { useReducer, useRef } from "react";
import Header from "../components/main/Header";
import DetailModalBody from "../components/main/detailModal/Body";
import NavigationGroup from "../components/main/fixNavigation/NavigationGroup";

function MainPage(props) {
  const modalRef = useRef();
  const handleModalOpen = () => {
    modalRef.current.classList.add("modalOn");
  };
  return (
    <>
      <Header />
      <NavigationGroup />
      <button onClick={handleModalOpen}>모달을 띄워봐요</button>
      <DetailModalBody Ref={modalRef} />
    </>
  );
}

export default MainPage;
