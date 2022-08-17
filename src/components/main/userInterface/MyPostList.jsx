import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { __getUserPostList } from "../../../redux/modules/mainSlice";

function MyPostList({ onClick }) {
  const dispatch = useDispatch();
  const myPostList = useSelector((state) => state.mainSlice.myPosts);
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    dispatch(__getUserPostList(userToken));
  }, [dispatch]);
  return (
    <>
      <StListContainer>
        {myPostList.length !== 0
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
      <StGobackBtn onClick={onClick} />
    </>
  );
}

const StListContainer = styled.div`
  width: 162px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
`;

const StListCard = styled.div`
  width: 100%;
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
  position: absolute;
  right: 31px;
  bottom: 10px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: var(--border-style);
`;
export default MyPostList;
