import React from "react";
import { useSelector } from "react-redux";
import CommentForm from "./commentSection/CommentForm";
import CommentList from "./commentSection/CommentList";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";

function DetailModalBody({ handleClose }) {
  const postDetail = useSelector((state) => state.mainSlice.post);
  console.log(":: DetailModalBody__postDetail :: ", postDetail);

  return (
    <StContainer>
      <StImageContainer>
        <img src={postDetail.postImg} alt={postDetail.postContent} />
      </StImageContainer>
      <StContentsContainer>
        <button className="close_modal" onClick={handleClose}>
          <AiOutlineClose />
        </button>
        <StDetailBodyContainer>
          <p className="categoryTag">
            <span>{postDetail.brandName}</span>
            <span>{postDetail.menuName}</span>
          </p>
          <h2>{postDetail.memberNickName}</h2>
          <p>{postDetail.postContent}</p>
        </StDetailBodyContainer>

        <StDetailCommentSection>
          <CommentList postId={postDetail.postId} />
          <CommentForm postId={postDetail.postId} />
        </StDetailCommentSection>
      </StContentsContainer>
    </StContainer>
  );
}
const StContainer = styled.div`
  display: flex;
  background-color: #fefefe;
  margin: 10vh auto;
  padding: 20px;
  border: 4px solid #000000;
  text-align: left;

  max-width: 1200px;
  min-width: 1000px;
  min-height: 800px;
  max-height: 90vh;
`;

const StImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 50%;
  min-height: 650px;
  border-right: var(--border-style);
  padding-right: 20px;
  overflow: hidden;
  cursor: pointer;
  img {
    display: block;
    width: 100%;
  }
`;

const StContentsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 50%;
  min-height: 100%;
  /* border-left: var(--border-style); */
  padding: 1rem 1rem 0 2rem;

  .categoryTag span {
    font-family: var(--korean-font);
    font-size: 1.2rem;
    font-weight: 700;
    background-color: var(--blue-color);
    border: var(--border-style);
    padding: 5px;
    margin-right: 8px;
  }
  h2 {
    width: 100%;
    font-family: "Ubuntu", "SEBANG_Gothic_Bold";
    font-style: italic;
    letter-spacing: 0.3rem;
    border-bottom: var(--border-style);
    padding: 20px 10px 10px 0;
    margin-bottom: 20px;
  }
  p {
    font-family: var(--basic-font);
    font-size: 1.4rem;
    letter-spacing: 0.1rem;
    line-height: 2rem;
  }
  .close_modal {
    position: absolute;
    top: 0;
    right: 0;
    border: var(--border-style);
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--yellow-color);
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const StDetailBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 60%;
`;

const StDetailCommentSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 40%;
  font-size: 1.4rem;
  padding-top: 10px;
  border-top: 2px dashed #000;
`;

export default DetailModalBody;