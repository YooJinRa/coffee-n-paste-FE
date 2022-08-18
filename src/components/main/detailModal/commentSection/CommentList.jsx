import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CommentCard from "./CommentCard";
import { useDispatch, useSelector } from "react-redux";
import { __getCommentsByPostId } from "../../../../redux/modules/commentSlice";

function CommentList({ postId }) {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.commentSlice.comments);
  const loginUser = localStorage.getItem("userId");
  useEffect(() => {
    dispatch(__getCommentsByPostId(postId));
  }, [dispatch]);
  return (
    <StCommentsWrap>
      {comments.map((comment) => {
        return (
          <CommentCard
            key={comment.commentId}
            id={comment.commentId}
            author={comment.memberNickname}
            body={comment.commentContent}
            loginUser={loginUser === comment.memberName ? true : false}
          />
        );
      })}
    </StCommentsWrap>
  );
}

const StCommentsWrap = styled.div`
  overflow-y: scroll;
  width: 100%;
  height: 100%;
`;

export default CommentList;