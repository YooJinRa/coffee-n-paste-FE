import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectBrand,
  __getDatabySelectBrand,
  __getPostAll,
} from "../../../redux/modules/mainSlice";
import imagesLoaded from "imagesloaded";
import PostCard from "./PostCard";
import styled from "styled-components";
import ModalPortal from "../../global/ModalPortal";
import DetailModalBody from "../detailModal/ModalDetailBody";

// ::: masorny 레이아웃 구현
const resizeGridItems = function () {
  const items = document.querySelectorAll(".gridItem");
  items.forEach((item) => {
    imagesLoaded(item, (instance) => {
      const item = instance.elements[0];
      const grid = document.querySelector(".gridContainer");
      const rowHeight = parseInt(
        window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
      );
      const rowGap = parseInt(
        window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
      );
      const rowSpan = Math.floor(
        (item.querySelector(".content").offsetHeight + rowGap) /
          (rowHeight + rowGap)
      );
      item.style.gridRowEnd = "span " + rowSpan;
    });
  });
  const gallery = document.querySelector(".gridContainer");
  imagesLoaded(gallery, () => {
    document
      .querySelectorAll(".gridItem")
      .forEach((item) => (item.style.visibility = "visible"));
  });
};

const PostLayout = ({ handleOpen, handleClose, modalOpened }) => {
  const dispatch = useDispatch();
  const currPage = useRef(1);
  const postAll = useSelector((state) => state.mainSlice.posts);
  const brandSelection = useSelector((state) => state.mainSlice.currBrand);
  const menuSelection = useSelector((state) => state.mainSlice.currMenu);

  // const [flag, setFlag] = useState(false);
  const flag = useRef(0);
  const toinfinity = () => {
    if (brandSelection.brandId !== 0) {
      console.log(currPage);
      dispatch(
        __getDatabySelectBrand({
          brandName: brandSelection.brandName,
          menuName: menuSelection.menuName,
          currPage: currPage.current,
        })
      );
      currPage.current += 1;
    } else {
      console.log(currPage);
      dispatch(__getPostAll(currPage.current));
      currPage.current += 1;
    }
  };

  const listenScrolling = (e) => {
    const html = e.target.scrollingElement;
    const currScroll = html.scrollTop;
    const maxScroll = html.scrollTopMax;
    const targetHeight = maxScroll * 0.73;
    if (currScroll > targetHeight) {
      if (flag.current === 0) {
        flag.current += 1;
        toinfinity();
      }
    }
  };
  window.addEventListener("scroll", listenScrolling);

  useEffect(() => {
    dispatch(__getPostAll(0));
  }, []);

  useEffect(() => {
    resizeGridItems();
    flag.current = 0;
  }, [postAll]);
  useEffect(() => {
    currPage.current = 1;
  }, [brandSelection, menuSelection]);

  return (
    <StPostLayoutWrap>
      <div className="gridContainer">
        {postAll.map((post) => (
          <PostCard key={post.postId} post={post} handleOpen={handleOpen} />
        ))}
      </div>
      {modalOpened && (
        <ModalPortal closePortal={handleClose}>
          <DetailModalBody handleClose={handleClose} />
        </ModalPortal>
      )}
    </StPostLayoutWrap>
  );
};

export default React.memo(PostLayout);

const StPostLayoutWrap = styled.div`
  z-index: 0;
  position: relative;
  padding: 10px;
  .gridContainer {
    padding: 3rem 0;
    display: grid;
    max-width: 100rem;
    margin: 0 auto;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-auto-rows: 0.5rem;
  }
`;
