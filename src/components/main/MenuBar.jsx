import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux/es/exports";

function MenuBar() {
  const menus = useSelector((state) => state.mainSlice.menus);
  return (
    <StList>
      {menus.length !== 0 ? (
        menus.map((menu) => {
          return (
            <StListItem key={menu.id} id={`brand${menu.id}`}>
              {menu.menuName}
            </StListItem>
          );
        })
      ) : (
        <p>"메뉴별 리뷰를 보시려면 브랜드를 먼저 선택해주세요!"</p>
      )}
    </StList>
  );
}

const StList = styled.ul`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  height: 50%;
  p {
    font-family: var(--korean-font);
    font-size: 24px;
    letter-spacing: 0.2rem;
  }
`;

const StListItem = styled.li`
  font-family: var(--korean-font);
  font-size: 30px;
  padding: 10px 15px;
  border: 3.5px solid;
  border-color: var(--bg-color);

  &.active {
    border-color: black;
    border-radius: 50%;
  }
`;

export default MenuBar;
