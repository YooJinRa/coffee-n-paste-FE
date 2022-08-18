import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux/es/exports";

function MainImage() {
  const currBrandId = useSelector((state) => state.mainSlice.currBrand.brandId);
  const mainImageUrl = useSelector(
    (state) =>
      state.mainSlice.brands.find((el) => el.brandId === currBrandId)
  );

  return (
    <StWrap imageUrl={mainImageUrl.brandImg}>
      {mainImageUrl.brandId !== 0 &&
        <h1>{mainImageUrl.brandName}</h1>
      }
    </StWrap>
  );
}

const StWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 50vh;
  background: radial-gradient(
      70% 50.83% at 70% 50.15%,
      rgba(0, 0, 0, 0) 10%,
      rgba(0, 0, 0, 0.5) 100%
    ),
    url(${({ imageUrl }) => imageUrl});

  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  h1 {
    width: 30%;
    text-align: center;
    color: var(--bg-color);
    border-bottom: 2px solid var(--bg-color);
    font-family: var(--korean-font);
    font-size: 7rem;
    margin-bottom: 30px;
  }
`;

export default MainImage;
