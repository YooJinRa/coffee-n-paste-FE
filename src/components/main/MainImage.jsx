import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux/es/exports";

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

  return <StWrap imageUrl={mainImageUrl}></StWrap>;
}

const StWrap = styled.div`
  width: 100vw;
  height: 50vh;
  margin-bottom: 1800px;

  background: radial-gradient(
      70% 50.83% at 70% 50.15%,
      rgba(0, 0, 0, 0) 10%,
      rgba(0, 0, 0, 0.5) 100%
    ),
    url(${({ imageUrl }) => imageUrl});

  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export default MainImage;
