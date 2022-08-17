import React, { useRef, useCallback } from "react";
import Header from "../components/main/Header";
import { useSelector } from "react-redux/es/exports";
import DetailModalBody from "../components/main/detailModal/Body";
import NavigationGroup from "../components/main/fixNavigation/NavigationGroup";
import GuestModal from "../components/registeration/GuestModal";
import PostLayout from "../components/main/mainContents/PostLayout";

function MainPage(props) {
  const userToken = useSelector((state) => state.userSlice.userToken);
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
      <PostLayout />
    </>
  );
}

export default MainPage;
