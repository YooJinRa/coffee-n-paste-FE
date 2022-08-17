import React, { useCallback, useRef } from "react";
import styled from "styled-components";
import NavButton from "./NavButton";
import { AiOutlineArrowUp, AiOutlineUser } from "react-icons/ai";
import MainInterface from "../userInterface/MainInterface";

function NavigationGroup({ Ref }) {
  const handleScrollTop = useCallback(() => {
    window.scrollTo(0, 0);
  });
  const interfaceModalRef = useRef();
  const handleClickModalBg = (e) => {
    e.stopPropagation();
    const clickedEl = e.target.localName;
    if (
      clickedEl !== "button" &&
      clickedEl !== "svg" &&
      clickedEl !== "path" &&
      !e.target.id?.includes("Modal")
    ) {
      interfaceModalRef.current.classList.remove("modalOn");
    }
  };
  window.addEventListener("click", handleClickModalBg);
  const handleInterFaceToggle = useCallback(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken === null) {
      Ref.current.classList.add("modalOn");
    } else {
      interfaceModalRef.current.classList.toggle("modalOn");
    }
  });
  return (
    <StContainer>
      <MainInterface Ref={interfaceModalRef} />
      <NavButton bgColor="green" onclick={handleInterFaceToggle}>
        <AiOutlineUser />
      </NavButton>
      <NavButton bgColor="yellow" onclick={handleScrollTop}>
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
