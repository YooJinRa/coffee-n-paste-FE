import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { __getPostAll } from "../../../redux/modules/mainSlice";
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

const PostLayout = ({ 
  handleOpen,
  handleClose,
  modalOpened,
}) => {
  const dispatch = useDispatch();
  const postAll = useSelector((state) => state.mainSlice.posts);

  useEffect(() => {
    dispatch(__getPostAll());
    resizeGridItems();
  }, [dispatch]);

  // ::: load : 이미지 사이즈를 확인할 때 등. 외부 자원이 로드된 후이기 때문에 스타일이 적용된 상태이므로 화면에 뿌려지는 요소의 실제 크기를 확인할 수 있음
  window.addEventListener("load", resizeGridItems);
  window.addEventListener("resize", resizeGridItems);
  window.addEventListener("scroll", resizeGridItems);

  return (
    <StPostLayoutWrap>
      <div className="gridContainer">
        {postAll.map((post) => (
          <PostCard key={post.postId} 
            post={post} 
            handleOpen={handleOpen} 
            />
        ))}
      </div>
      {modalOpened && (
        <ModalPortal closePortal={handleClose}>
          <DetailModalBody 
            handleClose={handleClose} 
          />
        </ModalPortal>
      )}
    </StPostLayoutWrap>
  );
};

export default PostLayout;

const StPostLayoutWrap = styled.div`
  z-index: 0;
  position: relative;
  padding: 10px;
  height: 1000px;
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
