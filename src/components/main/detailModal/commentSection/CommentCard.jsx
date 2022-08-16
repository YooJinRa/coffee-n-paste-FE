import React from "react";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";

function CommentCard({ author, body }) {
  return (
    <StCommentContainer>
      <span>{author}</span>
      <span>{body}</span>
      <StButtonGroup>
        <AiOutlinePlus />
        <button>수정</button>
        <button>삭제</button>
      </StButtonGroup>
    </StCommentContainer>
  );
}

const StCommentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 60px;

  margin-bottom: 8px;
  border: var(--border-style);
  span {
    :nth-of-type(1) {
      font-size: 1.3rem;
      font-family: var(--korean-font);
      margin: 0 8px;
    }

    :nth-of-type(2) {
      font-size: 1.2rem;
      width: 76%;
    }
  }
`;
const StButtonGroup = styled.div`
  position: absolute;
  right: 10px;
  width: 30px;
  height: 30px;
  background-color: var(--blue-color);
  border-radius: 50%;
  border: var(--border-style);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;
  button {
    display: none;
  }
  :hover {
    right: 0;
    width: 50px;
    height: 100%;
    border: none;
    border-left: var(--border-style);
    border-radius: 0%;
    flex-direction: column;
    svg {
      display: none;
    }
    button {
      width: 100%;
      height: 50%;
      display: inline-block;
      border: none;
      color: #fff;
      font-size: 1.2rem;
      :nth-of-type(1) {
        background-color: var(--green-color);
        border-bottom: var(--border-style);
      }
      :nth-of-type(2) {
        background-color: var(--red-color);
      }
    }
  }
`;
export default CommentCard;
