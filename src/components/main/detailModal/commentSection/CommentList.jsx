import React from "react";
import styled from "styled-components";
import CommentCard from "./CommentCard";

function CommentList() {
  return (
    <StCommentsWrap>
      <CommentCard
        author="강머훈"
        body="이것은 로렘대신 작성해보는 개뻘글입니다 나는 무엇을 위해 사는가"
      />
      <CommentCard
        author="김기열"
        body="이것앙ㄱㄱ아제발 빨리 완성했으면 좋겠다 진짜 제발 ㅜㅠㅜ 나는 무엇을 위해 사는가"
      />
      <CommentCard
        author="서태훈"
        body="이것은 로렘대신 작성해보는 개뻘글입니다 나는 무엇을 위해 사는가"
      />
      <CommentCard
        author="장범준"
        body="이것은 로렘대신 작성해보는 개뻘글입니다 나는 무엇을 위해 사는가"
      />
      <CommentCard
        author="이얏호"
        body="이것은 로렘대신 작성해보는 개뻘글입니다 나는 무엇을 위해 사는가"
      />
    </StCommentsWrap>
  );
}

const StCommentsWrap = styled.div`
  overflow-y: scroll;
  width: 100%;
  height: 100%;
`;

export default CommentList;
