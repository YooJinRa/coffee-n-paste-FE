import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoPostingPage from "../images/logo_posting_page.png";
import BgPostingHeader from "../images/posting_header_bg.png";
import PostForm from "../components/posting/PostForm";

const PostingPage = () => {
  return (
    <>
      <StHeaderWrap>
        <h1>
          <Link to={`/`} />
        </h1>
      </StHeaderWrap>
      <PostForm />
    </>
  );
}

export default PostingPage;

const StHeaderWrap = styled.header`
  width: 100%;
  height: 140px;
  background: repeat-x center url(${BgPostingHeader});
  margin-bottom: 50px;
  
  h1 {
    width: 180px;
    height: 100%;
    background: no-repeat center/contain url(${LogoPostingPage});
    margin: 0 auto;
    cursor: pointer;
  }
  h1 > a {
    display: inline-block;
    width: 100%; height: 100%;
  }
`