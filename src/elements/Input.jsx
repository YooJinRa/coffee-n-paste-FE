import React from "react";
import styled from "styled-components";

function Input(props) {
  return <StInput {...props} />;
}

const StInput = styled.input`
  width: ${(props) => props.size || "700px"};
  height: ${(props) => props.height || "100px"};
`;

export default Input;
