import React, { useCallback, useState } from "react";
import styled from "styled-components";
import ModalBg from "../global/ModalBg";
import Input from "../../elements/Input";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function GuestModal({ Ref }) {
  const [isLogin, setIsLogin] = useState(true);
  const handleCloseModal = useCallback((e) => {
    const isBackGround = e.target.classList.contains("modalOn");
    e.stopPropagation();
    if (isBackGround || e.target.nodeName === "svg") {
      Ref.current.classList.remove("modalOn");
    }
  });
  const handleOnRegister = () => {
    setIsLogin(false);
  };
  const handleOnLogin = (e) => {
    e?.stopPropagation();
    setIsLogin(true);
  };
  return (
    <ModalBg Ref={Ref} onclick={handleCloseModal}>
      <StContainer>
        {isLogin ? (
          <LoginForm onRegister={handleOnRegister} Ref={Ref} />
        ) : (
          <RegisterForm onLogin={handleOnLogin} />
        )}
      </StContainer>
    </ModalBg>
  );
}

const StContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fefefe;
  margin: 8% auto 0;
  padding: 40px;
  border: 4px solid #000000;
  background-color: var(--bg-color);
  max-width: 700px;
  min-width: 600px;
  min-height: 700px;
  max-height: 800px;
`;

export default GuestModal;
