import React, { useRef, useCallback, useState } from "react";
import Header from "../components/main/Header";
import { useSelector, useDispatch } from "react-redux/es/exports";
import NavigationGroup from "../components/main/fixNavigation/NavigationGroup";
import GuestModal from "../components/registeration/GuestModal";
import PostLayout from "../components/main/mainContents/PostLayout";
import { __getPostDetail } from "../redux/modules/mainSlice";

function MainPage(props) {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.userSlice.userToken);
  const postDetail = useSelector((state) => state.mainSlice.post);
  // const modalRef = useRef();
  const guestModalRef = useRef();
  // const handleModalOpen = () => {
  //   modalRef.current.classList.add("modalOn");
  // };
  const handleLoginnSubmitHandler = useCallback(() => {
    if (userToken === null) {
      guestModalRef.current.classList.add("modalOn");
    }
  }, [userToken]);

  // ::: 모달 : CreatePortal
  const [modalOpened, setModalOpened] = useState(false);

  const handleOpen = async (postId) => {
    setModalOpened(true);
    dispatch(__getPostDetail(postId));
  };

  console.log(postDetail);
  const handleClose = () => {
    setModalOpened(false);
  };
  return (
    <>
      <Header onClick={handleLoginnSubmitHandler} />
      <NavigationGroup Ref={guestModalRef} handleOpen={handleOpen} />
      {/* <button onClick={handleModalOpen}>모달을 띄워봐요</button>
      <DetailModalBody Ref={modalRef} /> */}
      <GuestModal Ref={guestModalRef} />
      <PostLayout
        handleOpen={handleOpen}
        handleClose={handleClose}
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
      />

      <div id="root-modal"></div>
    </>
  );
}

export default MainPage;
