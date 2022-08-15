import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import styled, { css } from "styled-components";
import { __getMenusbyBrand, selectBrand } from "../../redux/modules/mainSlice";

function BrandList() {
  const BRANDS = useSelector((state) => state.mainSlice.brands);
  const dispatch = useDispatch();

  const [select, setSelect] = useState(0);

  const handleMenuClick = useCallback(
    (e) => {
      const brandId = parseInt(e.target.id[5]);
      dispatch(__getMenusbyBrand(brandId));
      setSelect(brandId);
      dispatch(selectBrand(brandId));
    },
    [dispatch]
  );
  return (
    <StList>
      {BRANDS.map((brand) => {
        return (
          <StListItem
            key={brand.id}
            onClick={handleMenuClick}
            id={`brand${brand.id}`}
            className={brand.id === select ? "active" : null}
          >
            {brand.name}
          </StListItem>
        );
      })}
      <StButton>글 추가하기</StButton>
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
  background: none;
  border: var(--border-style);
  :hover {
    background-color: var(--green-color);
    color: var(--bg-color);
  }
`;
export default BrandList;
