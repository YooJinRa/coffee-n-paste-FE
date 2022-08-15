import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux/es/exports";
import userEvent from "@testing-library/user-event";

function MainImage() {
  const [mainImageUrl, setMainImageUrl] = useState("");
  const currBrand = useSelector((state) => state.mainSlice.currBrand);

  const getMainImage = async (payload) => {
    const imageRes = new Promise((resolve) => {
      resolve(axios.get(`http://localhost:3001/images?brandId=${payload}`));
    });

    const result = await imageRes;
    setMainImageUrl(result.data[0].image);
    return result.status;
  };

  useEffect(() => {
    getMainImage(currBrand.id);
  });

  return <StWrap>{mainImageUrl}</StWrap>;
}

const StWrap = styled.div`
  width: 100vw;
  height: 400px;
  background-color: var(--blue-color);
`;

export default MainImage;
