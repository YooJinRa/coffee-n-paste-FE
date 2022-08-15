import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { __addPost } from "../../redux/modules/postSlice";
import imageCompression from "browser-image-compression";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import IconImage from "../../static/icon_image.png";

const PostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ::: 게시글 등록 폼 사용자 입력값 받아오기
  const [inputs, setInputs] = useState({
    brandId: '',
    menuId: '',
    content: ''
  });
  const [validationMessage, setValidationMessage] = useState([]);
  const [ postImg, setPostImg ] = useState(null);
  const { brandId, menuId, content } = inputs;

  const onChangePostingForm = (event) => {
    const { value, name } = event.target;
    setInputs({
      ...inputs,
      [name] : value
    });
  }

  // ::: 이미지 미리보기(Image Preview) 및 리사이징(Resizing) 구현
  const uploadImage = async (event) => {
    const imageFile = event.target.files[0];
    // :: 변환할 이미지 크기 지정
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    }
    try {
      const compressedFile = await imageCompression(imageFile, options);
      const imageResult = await imageCompression.getDataUrlFromFile(compressedFile);
      setPostImg(imageResult);   
    } catch (error) {
      console.log("__PostForm_ploadImage error ::", error);
      alert("이미지를 업로드 하는데 문제가 생겼습니다. 다시 시도해주세요!");
    }
  }

  // ::: 게시글 등록
  const onClickAddPost = (event) => {
    event.preventDefault();
    setValidationMessage([]);
    if(inputs.brandId === '' || inputs.menuId === '' || inputs.content === '' || postImg === null) {
      // ::: 유효성 검사
      inputs.brandId === '' && setValidationMessage((prev) => [...prev, '브랜드']);
      inputs.menuId === '' && setValidationMessage((prev) => [...prev, '메뉴']);
      inputs.content === '' && setValidationMessage((prev) => [...prev, '내용']);
      postImg === null && setValidationMessage((prev) => [...prev, '사진']);
      console.log("아래의 내용도 채워주셔야 해요!", validationMessage);

    } else {
      // ::: 게시글 등록
      const newPost = {
        brandId: Number(inputs.brandId),
        menuId: Number(inputs.menuId),
        content: inputs.content,
        postImg: postImg
      }
      dispatch(__addPost(newPost));
      setPostImg(null);
      setInputs({
        brandId: '',
        menuId: '',
        content: ''
      });
      navigate(`/`);
    }
  }

  const onClickCancel = (event) => {
    event.preventDefault();
    navigate(-1);
  }

  return (
    <StPostFormWrap>
      <StPostImageBox>
        { postImg
        && <img src={postImg} alt="preview" /> }
      </StPostImageBox>

      <StPostContentsBox>
        <h2>경험을 공유해주세요!</h2>
        <StRowFormBox>
          <label>브랜드</label>
          <select 
            name='brandId' 
            value={brandId} 
            onChange={onChangePostingForm}
          >
            <option value=''>브랜드를 선택해주세요!</option>
            <option value='1' brandname='STARBUCKS'>스타벅스</option>
            <option value='2' brandname='MEGA'>메가커피</option>
            <option value='3' brandname='HOLLYS'>할리스커피</option>
            <option value='4' brandname='PAIKS'>빽다방</option>
            <option value='5' brandname='PAULBASSETT'>폴바셋커피</option>
          </select>
        </StRowFormBox>

        <StRowFormBox>
          <label>메뉴</label>
          <select 
            name='menuId' 
            value={menuId} 
            onChange={onChangePostingForm}
          >
            <option value=''>메뉴를 선택해주세요!</option>
            <option value='1' menuname='AMERICANO'>아메리카노</option>
            <option value='2' menuname='COLDBREW'>콜드브루</option>
            <option value='3' menuname='CAFELATTE'>카페라떼</option>
            <option value='4' menuname='CAPPUCCINO'>카푸치노</option>
            <option value='5' menuname='MOCHALATTE'>카페모카라떼</option>
          </select>
        </StRowFormBox>

        <StRowFormBox>
          <label>내용</label>
          <textarea 
            placeholder="경험한 내용을 입력해주세요!"
            name='content' 
            value={content} 
            onChange={onChangePostingForm}
          ></textarea>
        </StRowFormBox>
        <StRowFormBox>
          <label>사진선택</label>
          <input 
            type="file" 
            accept="image/jpg, image/jpeg, image/png"
            onChange={uploadImage} />
        </StRowFormBox>
        <StFormValidation validationCount={validationMessage}>
          아래의 내용을 입력해주세요! <br />
          "{validationMessage.length >= 1
          && (
          validationMessage.map((message) => (
            <span key={`${ message }`}>{` ${message} `}</span>
          )))}"
        </StFormValidation>
        <StRowFormBox>
          <button
            onClick={onClickCancel}
          >취소</button>

          <button 
            onClick={onClickAddPost}
          >등록</button>
        </StRowFormBox>
        
      </StPostContentsBox>
    </StPostFormWrap>
  )
}

export default PostForm;

const StPostFormWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: top;
  max-width: 1016px;
  min-width: 768px;
  margin: 10px auto;
  border: var(--border-style);
`

const StPostImageBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 50%;
  min-height: 600px;
  border-right: var(--border-style);
  background: no-repeat center/100px auto url(${IconImage});
  overflow: hidden;
  img {
    display: block;
    width: 100%;
  }
  .imageAlertBox {
    color: var(--red-color);
  }
`
const StPostContentsBox = styled.div`
  width: 50%;
  height: 100%;
  padding: 3rem;
  h2 {
    border-bottom: var(--border-style);
    padding: 10px;
    margin-bottom: 20px;
  }
`

const StRowFormBox = styled.p`
  display: flex;
  flex-direction: row;
  align-items: top;
  width: 100%;
  margin-bottom: 20px;

  &:last-child {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: right;
    height: 60px;
    border-top: var(--border-style);
    padding-top: 20px;
    margin-top: 20px;
  }

  label {
    width: 90px;
    padding: 5px 0 0 10px;
    font-size: 16px;
  }
  label + select,
  label + input {
    width: calc(100% - 100px);
    height: 40px;
    background-color: var(--bg-color);
  }
  label + select {
    text-indent: 10px;
    border: var(--border-style);
  }
  label + textarea {
    width: calc(100% - 100px);
    height: 100px;
    border: var(--border-style);
    padding: 10px;
    background-color: var(--bg-color);
  }
  select:focus,
  textarea:focus {
    outline: none;
    border: 2px solid var(--red-color);
  }
  label + input[type=file]:focus {
    outline:none;
  }
  input[type=file]::file-selector-button {
    visibility: hidden;
  }
  input[type=file]::before {
    content:'사진 업로드!';
    display: block;
    width: 120px;
    height: 36px;
    text-align: center;
    line-height: 36px;
    font-weight: 500;
    border: var(--border-style);
    background-color: var(--blue-color);
    margin-right: 10px;
    cursor:pointer;
    outline: none;
  }
  input[type=file]:hover::before {
    background-color: var(--green-color);
  }

  button {
    width: 80px;
    height: 100%;
    font-weight: 500;
    border: var(--border-style);
    margin-left: 10px;
    background-color: var(--blue-color);
    cursor: pointer;

    &:hover {
      background-color: var(--red-color);
      color:#000;
    }
    &:last-child:hover {
      background-color: var(--green-color);
      color: #000;
    }
  }
`
const StFormValidation = styled.div`
  display: ${({validationCount}) => (validationCount.length < 1 ? 'none' : 'block')};
  width: 100%;
  height: 32px;
  font-style: italic;
  color: var(--red-color);
  margin-top: 20px;
  padding: 0 10px;
  border-left: 2px solid var(--red-color);
  overflow:hidden;
  span {
    color: var(--red-color);
    font-weight: 700;
  }

`