import React, { useCallback } from "react";
import { useDispatch } from "react-redux/es/exports";
import styled from "styled-components";
import { synchronizeToken, userLogout } from "../../../redux/modules/userSlice";

function MainInterface({ Ref }) {
  const dispatch = useDispatch();

  const handleLogout = useCallback((e) => {
    e.stopPropagation();
    const userToken = localStorage.getItem("userToken");

    dispatch(userLogout(userToken));
    localStorage.clear();
  });
  return (
    <StInterFaceBorder ref={Ref} id="interfaceModalBg">
      <StInterfaceContainer id="interfaceModalContents">
        <StInterfaceBtn onClick={handleLogout}>로그아웃</StInterfaceBtn>
        <StInterfaceBtn>내 글보기</StInterfaceBtn>
      </StInterfaceContainer>
    </StInterFaceBorder>
  );
}
const StInterFaceBorder = styled.div`
  display: none;
  position: absolute;
  width: 208px;
  padding: 4px;
  height: 168px;
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
  padding-left: 11px;
  width: 200px;
  height: 160px;
  background-color: var(--blue-color);
  border: none;
  clip-path: polygon(0% 0%, 92% 0, 92% 73%, 99% 79%, 92% 85%, 92% 100%, 0 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const StInterfaceBtn = styled.button`
  width: 85%;
  height: 60px;
  background-color: var(--bg-color);
  font-family: var(--korean-font);
  font-size: 25px;
  letter-spacing: 0.3rem;

  :nth-of-type(1) {
    margin-bottom: 11px;
    :hover {
      background-color: var(--red-color);
    }
  }
  :nth-of-type(2) {
    :hover {
      background-color: var(--green-color);
      color: var(--bg-color);
    }
  }
  border: var(--border-style);
`;

export default MainInterface;
