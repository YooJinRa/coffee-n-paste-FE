import React, { useCallback, useRef } from "react";
import styled from "styled-components";
import NavButton from "./NavButton";
import { AiOutlineArrowUp, AiOutlineUser } from "react-icons/ai";
import InterfaceContainer from "../userInterface/InterfaceContainer";

function NavigationGroup({ Ref, handleOpen }) {
  const handleScrollTop = useCallback(() => {
    window.scrollTo(0, 0);
  });
  const interfaceModalRef = useRef();
  const handleClickModalBg = useCallback((e) => {
    e.stopPropagation();
    const clickedEl = e.target.localName;
    if (
      clickedEl !== "button" &&
      clickedEl !== "svg" &&
      clickedEl !== "path" &&
      !e.target.id?.includes("Modal") &&
      interfaceModalRef.current
    ) {
      interfaceModalRef.current.classList.remove("modalOn");
    }
  }, []);
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
      <InterfaceContainer Ref={interfaceModalRef} handleOpen={handleOpen} />
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
  z-index: 1;
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
