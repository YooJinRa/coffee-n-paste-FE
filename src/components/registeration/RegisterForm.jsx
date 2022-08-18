import React, { useRef, useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux/es/exports";
import styled, { css } from "styled-components";
import { AiOutlineCheck } from "react-icons/ai";
import { __postUserRegistraion } from "../../redux/modules/userSlice";

function RegisterForm({ onLogin }) {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({ name: "", id: "" });
  const [validate, setValidate] = useState({
    name: true,
    id: true,
    pw: true,
    rePw: true,
  });
  const pwRef = useRef();
  const rePwRef = useRef();

  const handleSubmitLogin = useCallback((e) => {
    e.preventDefault();
    const pw = pwRef.current.value;
    const rePw = rePwRef.current.value;
    const specialRegExp = /[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi;
    const isValidName =
      inputs.name.length >= 3 && inputs.name.search(specialRegExp) === -1;
    const isValidId =
      inputs.id.length >= 5 && inputs.id.search(specialRegExp) === -1;
    const isValidPassword = pw.length >= 8 && pw.search(specialRegExp) >= 1;
    console.log({ ...inputs, pw, rePw });
    console.log(validate);
    console.log(isValidPassword);

    if (!isValidName) {
      return setValidate({ ...validate, name: false });
    }

    if (!isValidId) {
      return setValidate({ ...validate, name: true, id: false });
    }
    if (!isValidPassword) {
      return setValidate({ ...validate, name: true, id: true, pw: false });
    }
    if (pw !== rePw) {
      return setValidate({
        ...validate,
        name: true,
        id: true,
        pw: true,
        rePw: false,
      });
    } else {
      setValidate({ ...validate, name: true, id: true, pw: true, rePw: true });
    }
  });
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  useEffect(() => {
    if (
      validate.id &&
      validate.name &&
      validate.pw &&
      validate.rePw &&
      pwRef.current.value !== ""
    ) {
      dispatch(
        __postUserRegistraion({
          id: inputs.id,
          nickName: inputs.name,
          password: pwRef.current.value,
          passwordConfirm: rePwRef.current.value,
        })
      );

      setInputs({ id: "", name: "" });
      pwRef.current.value = "";
      rePwRef.current.value = "";
      onLogin();
    }
  }, [validate]);
  return (
    <StFormContainer onSubmit={handleSubmitLogin}>
      <label htmlFor="nameInput">
        NICKNAME{" "}
        {validate.name && inputs.name.length >= 3 && <AiOutlineCheck />}
      </label>
      <StInput
        type="text"
        id="nameInput"
        name="name"
        value={inputs.name}
        onChange={handleChangeInput}
        placeholder="특수문자를 제외한 3글자 이상"
      />
      <StValidateMsg isValid={validate.name}>
        3글자이상, 특수문자는 안되요!
      </StValidateMsg>

      <label htmlFor="idInput">
        ID {validate.id && inputs.id.length >= 5 && <AiOutlineCheck />}
      </label>
      <StInput
        type="text"
        id="idInput"
        name="id"
        value={inputs.id}
        onChange={handleChangeInput}
        placeholder="특수문자를 제외한 5글자 이상"
      />
      <StValidateMsg isValid={validate.id}>
        5글자이상, 특수문자는 안되요!
      </StValidateMsg>

      <label htmlFor="pwInput">
        PASSWORD
        {validate.pw &&
          pwRef.current?.value !== "" &&
          pwRef.current !== undefined && <AiOutlineCheck />}
      </label>
      <StInput
        type="password"
        id="pwInput"
        name="password"
        placeholder={`특수문자~!@@#$%^&*₩'";:/?를 포함한 8글자 이상`}
        ref={pwRef}
      />
      <StValidateMsg isValid={validate.pw}>
        특수문자를 포함해 8자리 이상이어야해요!
      </StValidateMsg>

      <label htmlFor="pwCheck">
        PASSWORD Re-CHECK
        {validate.rePw &&
          rePwRef.current?.value !== "" &&
          rePwRef.current !== undefined && <AiOutlineCheck />}
      </label>
      <StInput
        type="password"
        id="pwCheck"
        name="passwordCheck"
        placeholder="비밀번호를 한번더 입력해주세요!"
        ref={rePwRef}
      />
      <StValidateMsg isValid={validate.rePw}>
        비밀번호를 다시 입력해주세요!
      </StValidateMsg>

      <StButton>회원가입!</StButton>
      <StButton onClick={onLogin}>뒤로가기</StButton>
    </StFormContainer>
  );
}

const StFormContainer = styled.form`
  padding-bottom: 20px;
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
    svg {
      margin-left: 5px;
      width: 17px;
      height: 17px;
      border: var(--border-style);
      border-radius: 50%;
      background-color: var(--green-color);
    }
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
  margin-top: 5px;
  width: 90%;
  height: 70px;
  font-size: 2.5rem;
  letter-spacing: 0.2rem;
  padding: 0 5px;
  font-family: var(--english-font);
  ::placeholder {
    font-size: 1.4rem;
    letter-spacing: 0.1rem;
  }
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
export default RegisterForm;
