import React from "react";
import PostCard from "./PostCard";
import styled from "styled-components";

const PostLayout = () => {
  return(
    <StPostLayoutWrap>
      <PostCard />
    </StPostLayoutWrap>
  )
}

export default PostLayout;

const StPostLayoutWrap = styled.div`
  max-width: 1016px;
  width: 100%;
  height: 1000px;
  margin: 0 auto;
  background-color: var(--red-color);
`