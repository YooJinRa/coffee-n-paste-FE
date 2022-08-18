import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { selectBrand, __getPostFiltered } from "../../redux/modules/mainSlice";

function BrandList(props) {
  const BRANDS = useSelector((state) => state.mainSlice.brands);
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.userSlice.userToken);
  const [select, setSelect] = useState(0);
  const handleBrandClick = useCallback(
    (e) => {
      const brandId = parseInt(e.target.id);
      const brandName = e.target.innerText;
      setSelect(brandId);
      dispatch(selectBrand({ brandId, brandName }));
      dispatch(__getPostFiltered({ brandId, brandName, currPage: 0 }));
    },
    [select]
  );
  return (
    <StList>
      {BRANDS.map((brand) => {
        return (
          <StListItem
            key={brand.brandId}
            onClick={handleBrandClick}
            id={brand.brandId}
            className={brand.brandId === select ? "active" : null}
          >
            {brand.brandName}
          </StListItem>
        );
      })}
      <StButton onClick={props.onClick}>
        {userToken === null ? "로그인하기" : <Link to="/post">글추가하기</Link>}
      </StButton>
    </StList>
  );
}

const StList = styled.ul`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-bottom: var(--border-style);
  height: 50%;
`;

const StListItem = styled.li`
  font-family: var(--korean-font);
  font-size: 30px;
  padding: 10px 15px;
  border: 3.5px solid;
  border-color: var(--bg-color);
  min-width: 170px;
  text-align: center;
  &.active {
    ${() => {
      switch (Math.floor(Math.random() * 3)) {
        case 0: {
          return css`
            border-color: var(--red-color);
          `;
        }
        case 1: {
          return css`
            border-color: var(--green-color);
          `;
        }
        case 2: {
          return css`
            border-color: var(--yellow-color);
          `;
        }
        default: {
          return css`
            border-color: var(--red-color);
          `;
        }
      }
    }}
    border-radius: 50%;
  }
`;

const StButton = styled.button`
  font-family: var(--korean-font);
  font-size: 28px;
  padding: 10px;
  letter-spacing: 0.1rem;
  background: none;
  border: var(--border-style);
  a {
    font-family: var(--korean-font);
    font-size: 28px;
    padding: 10px;
    background: none;
    padding: 0;
  }
  :hover {
    background-color: var(--green-color);
    color: var(--bg-color);
    a {
      color: var(--bg-color);
    }
  }
`;
export default BrandList;
