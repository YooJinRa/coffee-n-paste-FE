import React from "react";
import styled from "styled-components";

function MainInterface({ Ref }) {
  return <StInterfaceContainer ref={Ref}></StInterfaceContainer>;
}

const StInterfaceContainer = styled.div`
  display: none;
  position: absolute;
  right: 75px;
  bottom: 30px;
  width: 200px;
  height: 260px;
  background-color: var(--blue-color);

  ::after {
    content: "";
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    right: -15px;
    bottom: 50px;
    border-left: 15px solid var(--blue-color);
    border-bottom: 10px solid transparent;
    border-top: 10px solid transparent;
  }
`;

export default MainInterface;
