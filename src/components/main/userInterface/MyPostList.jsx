import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { __getUserPostList } from "../../../redux/modules/mainSlice";
import { AiOutlineSwapLeft } from "react-icons/ai";

function MyPostList({ onClick, handleOpen }) {
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
              console.log(post.createAt);
              return (
                <StListCard
                  key={post.postId}
                  onClick={() => handleOpen(post.postId)}
                >
                  <h3>{post.createAt.split("T")[0]}</h3>
                  <StContentsWrap>
                    <h2>{post.brandName}</h2>
                    <h2>{post.menuName}</h2>
                  </StContentsWrap>
                </StListCard>
              );
            })
          : "작성한 리뷰가 없어요!"}
      </StListContainer>
      <StGobackBtn onClick={onClick}>
        <AiOutlineSwapLeft />
      </StGobackBtn>
    </>
  );
}

const StListContainer = styled.div`
  width: 180px;
  height: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
`;

const StListCard = styled.div`
  width: 100%;
  height: 60px;
  background-color: var(--bg-color);
  font-size: 25px;
  letter-spacing: 0.3rem;
  margin-top: 11px;
  padding-left: 5px;
  h3 {
    /* font-family: var(--basic-font); */
    font-size: 1.4rem;
    padding-bottom: 5px;
  }
  h2 {
    font-family: var(--basic-font);
    font-size: 1.1rem;
    letter-spacing: 0.1rem;
    :nth-of-type(1) {
      margin-right: 5px;
      border: var(--border-style);
      background-color: var(--blue-color);
    }
    :nth-of-type(2) {
      border: var(--border-style);
      background-color: var(--yellow-color);
    }
  }
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
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: var(--border-style);
  border-radius: 50%;
  background: none;

  :hover {
    background-color: var(--red-color);
  }
`;
export default MyPostList;
