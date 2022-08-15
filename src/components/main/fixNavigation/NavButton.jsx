import React from "react";
import styled, { css } from "styled-components";

function NavButton(props) {
  return <StButton {...props} onClick={props.onclick} />;
}

const StButton = styled.button`
  width: 50px;
  height: 50px;
  border: var(--border-style);
  border-radius: 50%;
  ${({ bgColor }) => {
    switch (bgColor) {
      case "base": {
        return css`
          background-color: var(--bg-color);
        `;
      }
      case "red": {
        return css`
          background-color: var(--red-color);
        `;
      }
      case "green": {
        return css`
          background-color: var(--green-color);
        `;
      }
      case "yellow": {
        return css`
          background-color: var(--yellow-color);
        `;
      }
      case "blue": {
        return css`
          background-color: var(--blue-color);
        `;
      }
    }
  }}
`;

export default NavButton;
