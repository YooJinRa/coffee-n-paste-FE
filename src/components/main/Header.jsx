import React, { useEffect } from "react";
import styled from "styled-components";
import big_logo from "../../static/big_logo.png";
import BrandList from "./BrandList";
import MenuBar from "./MenuBar";
import MainImage from "../main/MainImage";
import { __getDatabySelectBrand } from "../../redux/modules/mainSlice";
import { useDispatch } from "react-redux";

function Header({ onClick }) {
  return (
    <>
      <StHeader>
        <Stlogo />
        <StWrap>
          <BrandList onClick={onClick} />
          <MenuBar />
        </StWrap>
      </StHeader>
      <MainImage />
    </>
  );
}

const StHeader = styled.header`
  width: 100vw;
  min-width: 1550px;
  height: 150px;
  background-color: var(--bg-color);
  display: flex;
  border: var(--border-style);
  border-left: none;
  border-right: none;
`;

const Stlogo = styled.div`
  background-image: url(${big_logo});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 90%;
  border-right: var(--border-style);
  width: 260px;
  height: 100%;
`;

const StWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 260px);
`;
export default React.memo(Header);
