import React, { useCallback } from "react";
import styled from "styled-components";
import NavButton from "./NavButton";
import { AiOutlineArrowUp, AiOutlineUser } from "react-icons/ai";

function NavigationGroup() {
  const handleScrollTop = useCallback(() => {
    window.scrollTo(0, 0);
  });
  return (
    <StContainer>
      <NavButton bgColor="green">
        <AiOutlineUser />
      </NavButton>
      <NavButton bgColor="red" onclick={handleScrollTop}>
        <AiOutlineArrowUp />
      </NavButton>
    </StContainer>
  );
}

const StContainer = styled.div`
  position: fixed;
  height: 110px;
  right: 50px;
  bottom: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  svg {
    width: 70%;
    height: 70%;
  }
`;
export default NavigationGroup;
