import React, { useCallback } from "react";
import styled from "styled-components";
import ModalBg from "../global/ModalBg";
import Input from "../../elements/Input";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function GuestModal({ Ref }) {
  const handleCloseModal = useCallback((e) => {
    const isBackGround = e.target.classList.contains("modalOn");
    e.stopPropagation();
    if (isBackGround || e.target.nodeName === "svg") {
      Ref.current.classList.remove("modalOn");
    }
  });
  return (
    <ModalBg Ref={Ref} onclick={handleCloseModal}>
      <StContainer>
        <Routes>
          <Route path="/login" element={LoginForm} />
          <Route path="/register" element={RegisterForm} />
        </Routes>
      </StContainer>
    </ModalBg>
  );
}

const StContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fefefe;
  margin: 18vh auto;
  padding: 20px;
  border: 4px solid #000000;

  max-width: 1000px;
  min-width: 800px;
  min-height: 700px;
  max-height: 800px;
`;

export default GuestModal;
