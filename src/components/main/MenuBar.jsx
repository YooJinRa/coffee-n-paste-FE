import React from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { selectMenu, __getPostFiltered } from "../../redux/modules/mainSlice";

function MenuBar() {
  const currBrand = useSelector((state) => state.mainSlice.currBrand);
  const currMenu = useSelector((state) => state.mainSlice.currMenu);
  const menus = useSelector(
    (state) =>
      state.mainSlice.brands.find((el) => el.brandId === currBrand.brandId)
        .menus
  );

  const dispatch = useDispatch();

  const handleSelectMenu = (e) => {
    const { innerText, id } = e.target;
    dispatch(selectMenu({ innerText, id }));
    dispatch(
      __getPostFiltered({
        brandId: currBrand.brandId,
        brandName: currBrand.brandName,
        menuId: id,
        menuName: innerText,
      })
    );
  };
  return (
    <StList>
      {menus.length !== 0 ? (
        menus.map((menu) => {
          return (
            <StListItem
              key={menu.menuId}
              id={`brand${menu.menuId}`}
              selectMenu={currMenu.menuId}
              onClick={handleSelectMenu}
            >
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
  border-bottom: 3.5px solid;
  border-color: var(--bg-color);

  ${(props) => {
    if (props.id === props.selectMenu) {
      return css`
        border-color: var(--green-color);
      `;
    }
  }}/* &.active {
    border-color: black;
    border-radius: 50%;
  } */
`;

export default MenuBar;
