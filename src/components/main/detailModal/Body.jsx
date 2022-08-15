import React from "react";
import styled from "styled-components";
import IconImage from "../../../static/icon_image.png";
import CommentForm from "./commentSection/CommentForm";
import CommentList from "./commentSection/CommentList";

function DetailModalBody() {
  //나중에 listcard를 누르면 dispatch해서 게시글 내용 받아오고
  //그중에서 user, body, 구독하면됨
  return (
    <StContainer>
      <StImageContainer></StImageContainer>
      <StContentsContainer>
        <StDetailBodyContainer>
          <h1>from: 강태훈훈</h1>
          <h2>게시글 내용</h2>
          <p>
            이건 테스트를 위하여 아무렇게나 작성된 lorem과 같은 글입니다. 과연
            기능구현을 시간에 맞추어 다할수 있을지 조차도 걱정이지만 어떻게든
            되겠죠. 내뼈를 갈아서라도 완성시키고말겁니닿 ㅎ 화이팅~~!~~!!
          </p>
        </StDetailBodyContainer>

        <StDetailCommentSection>
          <CommentList />
          <CommentForm />
        </StDetailCommentSection>
      </StContentsContainer>
    </StContainer>
  );
}

const StContainer = styled.div`
  display: flex;
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: var(--border-style);
  max-width: 1016px;
  min-width: 768px;
  min-height: 690px;
  max-height: 90vh;
  /* display: none; */
`;

const StImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 50%;
  min-height: 650px;
  border-right: var(--border-style);
  background: no-repeat center/100px auto url(${IconImage});
  overflow: hidden;
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
  h1 {
    font-family: "Ubuntu", "SEBANG_Gothic_Bold";
    letter-spacing: 0.3rem;
  }
  h2 {
    width: 100%;
    font-family: var(--basic-font);
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
`;

const StDetailBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 63%;
`;

const StDetailCommentSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 37%;
  font-size: 1.4rem;
`;

export default DetailModalBody;
