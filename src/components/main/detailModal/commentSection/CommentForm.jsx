import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { __postComment } from "../../../../redux/modules/commentSlice";

function CommentForm({ postId }) {
  const [commentBody, setCommentBody] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(__postComment({ postId, commentBody }));
    setCommentBody("");
  };
  const handleChangeInput = useCallback((e) => {
    setCommentBody(e.target.value);
  });

  return (
    <StFormContainer onSubmit={handleSubmit}>
      <input
        onChange={handleChangeInput}
        value={commentBody}
        placeholder="최대 30자"
      />
      <button>등록</button>
    </StFormContainer>
  );
}

const StFormContainer = styled.form`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  margin-top: 10px;
  input {
    font-size: 1.3rem;
    padding: 0 5px;
    width: 80%;
    border: var(--border-style);
    &:focus {
      outline: none;
    }
  }

  button {
    width: 80px;
    font-size: 1.5rem;
    border: var(--border-style);
    letter-spacing: 0.1rem;
    :hover {
      background-color: var(--green-color);
      color: var(--bg-color);
    }
  }
`;

export default CommentForm;
