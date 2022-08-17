import React, { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import styled from "styled-components";
import { userLogout } from "../../../redux/modules/userSlice";
import MyPostList from "./MyPostList";
import MainInterface from "./MainInterface";

function InterfaceContainer({ Ref }) {
  return (
    <StContainer ref={Ref}>
      <MainInterface Ref={Ref} />
    </StContainer>
  );
}
const StContainer = styled.div`
  display: none;
  position: absolute;
  right: 65px;
  bottom: 48px;
  width: 208px;
  height: 600px;
`;
const StInterFaceBorder = styled.div`
  display: none;
  position: absolute;
  width: 208px;
  padding: 4px;
  height: ${({ listOn }) => (listOn ? "328px" : "168px")};
  right: 65px;
  bottom: 48px;
  background-color: black;
  clip-path: polygon(
    0% 0%,
    92.5% 0,
    92.5% 71%,
    100% 77.9%,
    92.5% 84.7%,
    92.5% 100%,
    0 100%
  );
`;
const StInterfaceContainer = styled.div`
  position: relative;
  padding-left: 11px;
  width: 200px;
  height: ${({ listOn }) => (listOn ? "320px" : "160px")};
  background-color: var(--blue-color);
  border: none;
  clip-path: polygon(0% 0%, 92% 0, 92% 73%, 99% 79%, 92% 85%, 92% 100%, 0 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export default InterfaceContainer;
