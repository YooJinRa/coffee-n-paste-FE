import React, { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import styled from "styled-components";
import { userLogout } from "../../../redux/modules/userSlice";
import MyPostList from "./MyPostList";
import MainInterface from "./MainInterface";

function InterfaceContainer({ Ref, handleOpen }) {
  return (
    <StContainer ref={Ref}>
      <MainInterface Ref={Ref} handleOpen={handleOpen} />
    </StContainer>
  );
}
const StContainer = styled.div`
  display: none;
  position: absolute;
  right: 85px;
  bottom: 48px;
  width: 208px;
  height: 600px;
`;

export default InterfaceContainer;
