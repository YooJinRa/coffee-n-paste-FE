import React, { useCallback, useState } from "react";
import styled from "styled-components";

function CommentForm() {
  const [commentBody, setCommentBody] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("동작!");
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
  height: 40px;
  input {
    font-size: 1.3rem;
    padding: 0 5px;
    width: 80%;
    border: var(--border-style);
    :focus {
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
