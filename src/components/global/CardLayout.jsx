import React from "react";
import styled from "styled-components";

const CardLayout = () => {
  return (
    <StCardLayoutWrap>
    </StCardLayoutWrap>
  );
}

export default CardLayout;

const StCardLayoutWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: top;
  max-width: 1016px;
  min-width: 768px;
  margin: 10px auto;
  border: var(--border-style);
`

