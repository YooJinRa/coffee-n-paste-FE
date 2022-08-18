import React from "react";
import styled from "styled-components";

const PostCard = ({ post, handleOpen }) => {
  return (
    <StPostCardWrap
      className="gridItem"
      onClick={() => handleOpen(post.postId)}
    >
      <img className="content" src={post.postImg} alt={post.postId} />
      <StBgHover>
        <div className="bgHoverRowBox">
          <h3>{post.brandName.toUpperCase()}</h3>
          <h4>{post.menuName.toUpperCase()}</h4>
        </div>
        <div className="bgHoverRowBox">
          <p>{post.memberNickname}</p>
        </div>
      </StBgHover>
    </StPostCardWrap>
  );
};

export default React.memo(PostCard);

const StPostCardWrap = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  border: var(--border-style);
  overflow: hidden;
  visibility: hidden;
  img {
    width: calc(100% + 4px);
  }
  .bgHoverRowBox {
    width: 100%;
  }
`;
const StBgHover = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.5)
  );
  padding: 1.5rem;
  z-index: 1;
  visibility: hidden;
  cursor: pointer;
  transition: 0.1s;

  ${StPostCardWrap}:hover & {
    visibility: visible;
  }
  h3 {
    /* display: inline-block; */
    padding: 5px;
    /* color: var(--bg-color); */
    font-size: 1.7rem;
    background-color: var(--bg-color);
    margin-bottom: 5px;
  }
  h4 {
    font-size: 1.3rem;
    color: var(--bg-color);
    border-top: 1px solid var(--bg-color);
    padding: 10px 5px;
  }
  p {
    width: 100%;
    font-size: 1.5rem;
    text-align: right;
    font-style: italic;
    color: var(--bg-color);
  }
`;
