import React, { useReducer, useRef, useCallback } from "react";
import Header from "../components/main/Header";
import DetailModalBody from "../components/main/detailModal/Body";
import NavigationGroup from "../components/main/fixNavigation/NavigationGroup";
import GuestModal from "../components/registeration/GuestModal";
import { useLocation } from "react-router-dom";

function MainPage(props) {
  const userToken = localStorage.getItem("userToken");
  const modalRef = useRef();
  const guestModalRef = useRef();
  const handleModalOpen = () => {
    modalRef.current.classList.add("modalOn");
  };
  const handleLoginnSubmitHandler = useCallback(() => {
    if (userToken === null) {
      guestModalRef.current.classList.add("modalOn");
    }
  }, [userToken]);
  return (
    <>
      <Header onClick={handleLoginnSubmitHandler} />
      <NavigationGroup Ref={guestModalRef} />
      <button onClick={handleModalOpen}>모달을 띄워봐요</button>
      <DetailModalBody Ref={modalRef} />
      <GuestModal Ref={guestModalRef} />
    </>
  );
}

export default MainPage;
