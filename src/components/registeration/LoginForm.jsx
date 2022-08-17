import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import styled, { css } from "styled-components";
import { __postUserExistance } from "../../redux/modules/userSlice";

function LoginForm({ onRegister, Ref }) {
  const userToken = useSelector((state) => state.userSlice.userToken);
  const isErr = useSelector((state) => state.userSlice.err);
  const dispatch = useDispatch();
  const idRef = useRef();
  const pwRef = useRef();
  const handleSubmitLogin = useCallback((e) => {
    e.preventDefault();
    const id = idRef.current.value;
    const password = pwRef.current.value;
    dispatch(__postUserExistance({ id, password }));
    idRef.current.value = "";
    pwRef.current.value = "";
  });

  useEffect(() => {
    if (userToken !== "") Ref.current.classList.remove("modalOn");
  }, [userToken]);

  return (
    <StFormContainer onSubmit={handleSubmitLogin}>
      <StValidateMsg isValid={isErr === null ? true : false}>
        ID 또는 PASSWORD를 확인해주세요!
      </StValidateMsg>
      <label htmlFor="idInput">ID</label>
      <StInput type="text" id="idInput" name="id" ref={idRef} />
      <label htmlFor="pwInput">PASSWORD</label>
      <StInput type="password" id="pwInput" name="pw" ref={pwRef} />
      <StButton>로그인</StButton>
      <StButton onClick={onRegister}>회원가입</StButton>
    </StFormContainer>
  );
}

const StFormContainer = styled.form`
  padding-bottom: 30px;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  label {
    width: 90%;
    text-align: left;
    margin-top: 10px;
    padding-left: 5px;
    font-size: 1.6rem;
    font-family: var(--english-font);
  }
  button {
    :nth-of-type(1) {
      :hover {
        background-color: var(--green-color);
        color: var(--bg-color);
      }
    }
    :nth-of-type(2) {
      :hover {
        background-color: var(--blue-color);
        color: var(--yellow-color);
      }
    }
  }
`;

const StInput = styled.input`
  margin-top: 10px;
  width: 90%;
  height: 70px;
  font-size: 2.5rem;
  letter-spacing: 0.2rem;
  padding: 0 5px;
  font-family: var(--english-font);
`;

const StButton = styled.button`
  margin-top: 20px;
  width: 90%;
  height: 70px;
  font-size: 2.5rem;
  letter-spacing: 0.3rem;
  font-family: var(--korean-font);
  border: var(--border-style);
  background-color: var(--bg-color);
`;

const StValidateMsg = styled.span`
  padding: 5px 0 5px 5px;
  font-size: 1.2rem;
  ${(props) => {
    switch (props.isValid) {
      case true: {
        return css`
          color: var(--bg-color);
        `;
      }
      case false: {
        return css`
          color: var(--red-color);
        `;
      }
    }
  }}
`;

export default LoginForm;
