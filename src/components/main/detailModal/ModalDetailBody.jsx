import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommentForm from "./commentSection/CommentForm";
import CommentList from "./commentSection/CommentList";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";

function DetailModalBody({ handleClose }) {
  const dispatch = useDispatch();
  const postDetail = useSelector((state) => state.mainSlice.post);
  const loginUser = localStorage.getItem("userId");
  console.log(":: DetailModalBody__postDetail :: ", postDetail);
  console.log("post Id ===========>>>>>", postDetail.postId);

  // 수정 여부 확인
  const [ showUpdateForm, setShowUpdateForm ] = useState(false);
  const [ textArea, setTextArea ] = useState('');

  const onChangeUpdateContent = (event) => {
    setTextArea(event.target.value);
  }

  // ::: 수정 활성화 버튼 이벤트 실행
  const handleUpdatePost = (event) => {
    setShowUpdateForm(true);
  }

  // ::: 삭제하기 버튼 이벤트 실행
  const handleDeletePost = (event) => {
    setShowUpdateForm(false);
    handleClose();
  }

  // ::: 수정 완료 버튼 이벤트 실행
  const completeUpdatePost = () => {
    if(textArea === ''){
      console.log("수정할 내용을 입력해주세요!");
    }
    setShowUpdateForm(false);
    setTextArea('');
  }

  // ::: 수정하기 취소 버튼 이벤트 실행
  const cancelUpdatePost = (event) => {
    setTextArea('');
    setShowUpdateForm(false);
  }

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
          <div className="titleRowBox">
            <h2>{postDetail.memberNickName}</h2>
            <StButtonCRUDWrap
              loginUser={loginUser === postDetail.memberName ? true : false}
            >
              <StButtonCRUD 
                backgroundColor="var(--green-color)"
                onClick={showUpdateForm ? completeUpdatePost : handleUpdatePost}
                type='submit'
              >
                {showUpdateForm ? '완료' : '수정'}
              </StButtonCRUD>
              <StButtonCRUD
                backgroundColor="var(--red-color)"
                onClick={showUpdateForm ? cancelUpdatePost : handleDeletePost}
              >
                {showUpdateForm ? '취소' : '삭제'}
              </StButtonCRUD>
            </StButtonCRUDWrap>
          </div>
          <p>{postDetail.postContent}</p>
          <StUpdatePostWrap
            showOrHide={showUpdateForm}
          >
            <textarea
              onChange={onChangeUpdateContent}
              placeholder="게시글 수정 내용을 입력해주세요!"
            ></textarea>
          </StUpdatePostWrap>
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
  padding: 1rem 1rem 0 2rem;

  .categoryTag span {
    font-family: var(--korean-font);
    font-size: 1.2rem;
    font-weight: 700;
    font-style: italic;
    background-color: var(--blue-color);
    border: var(--border-style);
    padding: 5px;
    margin-right: 5px;
  }
  .titleRowBox {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border-bottom: var(--border-style);
    padding: 20px 10px 10px 0;
    margin-bottom: 20px;
  }
  .titleRowBox h2 {
    font-family: "Ubuntu", "SEBANG_Gothic_Bold";
    font-style: italic;
    letter-spacing: 0.3rem;
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
    /* background-color: var(--yellow-color); */
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

// ::: 로그인 여부에 따라 게시글 수정, 삭제 버튼 활성화
const StButtonCRUDWrap = styled.div`
  display: ${props => props.loginUser ? 'block' : 'none'};
`
const StButtonCRUD = styled.button`
  padding: 8px 12px;
  border: var(--border-style);
  margin-left: 5px;
  font-size: 1.2rem;
  font-weight: 700;
  background-color: var(--yellow-color);
  color: #000;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.backgroundColor};
    color: var(--bg-color);
  }
`;

//::: 게시글 수정하기 폼
const StUpdatePostWrap = styled.div`
  display: ${props => props.showOrHide? 'block' : 'none'};
  padding: 10px 0;

  textarea {
    width: 100%;
    height:80px;
    border: var(--border-style);
    border-radius: 0;
    font-size: 1.2rem;
    padding: 10px;
  }
  textarea:focus {
    outline: none;
    border: 2px solid var(--red-color);
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
