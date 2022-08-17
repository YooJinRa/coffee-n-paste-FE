import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { __getUserPostList } from "../../../redux/modules/mainSlice";

function MyPostList() {
  const dispatch = useDispatch();
  const myPostList = useSelector((state) => state.mainSlice.myPosts);
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    dispatch(__getUserPostList(userToken));
  });
  return (
    <>
      <StListContainer>
        {mypostList.length !== 0
          ? myPostList.map((post) => {
              return (
                <StListCard key={post.postId}>
                  <h3>{post.createAt.slice(9)}</h3>
                  <StContentsWrap>
                    <h2>{post.brandName}</h2>
                    <h2>{post.menuName}</h2>
                  </StContentsWrap>
                </StListCard>
              );
            })
          : "작성한 리뷰가 없어요!"}
      </StListContainer>
      <StGobackBtn />
    </>
  );
}

const StListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StListCard = styled.div`
  width: 85%;
  height: 60px;
  background-color: var(--bg-color);
  font-family: var(--korean-font);
  font-size: 25px;
  letter-spacing: 0.3rem;
  margin-top: 11px;
  :nth-of-type(1) {
    margin-top: 0;
  }
`;

const StContentsWrap = styled.div`
  display: flex;
`;

const StGobackBtn = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: var(--border-style);
`;
export default MyPostList;
