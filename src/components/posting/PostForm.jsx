import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { __addPost } from "../../redux/modules/postSlice";
import styled from "styled-components";

import IconImage from "../../static/icon_image.png";

const PostForm = () => {
  const dispatch = useDispatch();
  const brandSelect = useRef();
  const menuSelect = useRef();
  const contentTextarea = useRef();
  
  // ::: 이미지 미리보기(Image Preview) 기능 구현
  // :::: => User가 PostForm에서 사진 업로드 했을때만 확인하기에 해당 컨포넌트에서 상태관리 진행
  const [ imgUrl, setImgUrl ] = useState(null);

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result);
      }
      reader.onerror = () => {
        console.log(reader.error);
        reject(reader.error);
        
      }
    });
  }
  const uploadImage = async (event) => {
    console.log(event.target.files[0]);
    const response = await encodeFileToBase64(event.target.files[0]);
    setImgUrl(response);
  }

  const onClickAddPost = (event) => {
    event.preventDefault();
    const emptyBox = [];
    const brandId = brandSelect.current.value;
    const menuId = menuSelect.current.value;
    const content = contentTextarea.current.value;
    
    if(brandId === '' || menuId === '' || content === '' || imgUrl === null) {
      // ::: 유효성 검사
      brandId === '' && emptyBox.push('브랜드');
      menuId === '' && emptyBox.push('메뉴');
      content === '' && emptyBox.push('내용');
      imgUrl === null && emptyBox.push('사진');
      console.log("아래의 내용도 채워주셔야 해요!", emptyBox);

    } else {
      // ::: 게시글 등록
      console.log(brandId, menuId, content, imgUrl);
      const newPost = {
        brandId: Number(brandId),
        menuId: Number(menuId),
        content,
        imageUrl: imgUrl
      }
      dispatch(__addPost(newPost));
      setImgUrl(null);
    }

  }

  return (
    <StPostFormWrap>
      <StPostImageBox>
        {imgUrl && <img src={imgUrl} alt="preview" />}
      </StPostImageBox>

      <StPostContentsBox>
        <h2>경험을 공유해주세요!</h2>
        <StRowFormBox>
          <label>브랜드</label>
          <select name="brand" ref={brandSelect}>
            <option value=''>브랜드를 선택해주세요!</option>
            <option value='0' brandname='STARBUCKS'>스타벅스</option>
            <option value='1' brandname='MEGA'>메가커피</option>
            <option value='2' brandname='HOLLYS'>할리스커피</option>
            <option value='3' brandname='PAIKS'>빽다방</option>
            <option value='4' brandname='PAULBASSETT'>폴바셋커피</option>
          </select>
        </StRowFormBox>

        <StRowFormBox>
          <label>메뉴</label>
          <select name="menu" ref={menuSelect}>
            <option value=''>메뉴를 선택해주세요!</option>
            <option value='0' menuname='AMERICANO'>아메리카노</option>
            <option value='1' menuname='COLDBREW'>콜드브루</option>
            <option value='2' menuname='CAFELATTE'>카페라떼</option>
            <option value='3' menuname='CAPPUCCINO'>카푸치노</option>
            <option value='4' menuname='MOCHALATTE'>카페모카라떼</option>
          </select>
        </StRowFormBox>

        <StRowFormBox>
          <label>내용</label>
          <textarea 
            placeholder="경험한 내용을 입력해주세요!"
            ref={contentTextarea}
          ></textarea>
        </StRowFormBox>
        <StRowFormBox>
          <label>사진선택</label>
          <input 
            type="file" 
            accept="image/jpg, image/jpeg, image/png"
            onChange={uploadImage} />
        </StRowFormBox>
        <StRowFormBox>
          <button>취소</button>
          <button onClick={onClickAddPost}>등록</button>
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
  min-height: 529px;
  border-right: var(--border-style);
  background: no-repeat center/100px auto url(${IconImage});
  overflow: hidden;
  img {
    display: block;
    width: 100%;
  }
`
const StPostContentsBox = styled.div`
  width: 50%;
  height: 100%;
  /* border-left: var(--border-style); */
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
    background-color: var(--bg-color);
    cursor: pointer;

    &:last-child {
      background-color: var(--green-color);
    }

    &:hover {
      background-color: #000;
      color:var(--bg-color);
    }
  }
  
`