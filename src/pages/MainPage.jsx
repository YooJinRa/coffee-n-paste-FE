import React, { useReducer, useRef, useCallback } from "react";
import Header from "../components/main/Header";
import DetailModalBody from "../components/main/detailModal/Body";
import NavigationGroup from "../components/main/fixNavigation/NavigationGroup";
import GuestModal from "../components/registeration/GuestModal";

function MainPage(props) {
  const userToken = window.localStorage.getItem("token");
  const modalRef = useRef();
  const guestModalRef = useRef();
  const handleModalOpen = () => {
    modalRef.current.classList.add("modalOn");
  };
  const handleLoginnSubmitHandler = useCallback(() => {
    console.log("로그인버튼");
    if (userToken === null) {
      guestModalRef.current.classList.add("modalOn");
    } else {
    }
  }, [userToken]);
  return (
    <>
      <Header userToken={userToken} onClick={handleLoginnSubmitHandler} />
      <NavigationGroup />
      <button onClick={handleModalOpen}>모달을 띄워봐요</button>
      <DetailModalBody Ref={modalRef} />
      <GuestModal Ref={guestModalRef} />
    </>
  );
}

export default MainPage;
