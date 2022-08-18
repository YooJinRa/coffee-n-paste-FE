import React, { useState } from "react";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import IconImage from "../../static/icon_image.png";

const PostForm = () => {
  const navigate = useNavigate();
  const brands = useSelector((state) => state.mainSlice.brands);
  const [selectedBrand, setSelectedBrand] = useState("");

  // ::: 게시글 등록 폼 사용자 입력값 받아오기
  const [inputs, setInputs] = useState({
    brandId: "",
    menuId: "",
    content: "",
  });

  const [validationMessage, setValidationMessage] = useState([]);
  const [postImg, setPostImg] = useState(null);
  const [compressedImageFile, setCompressedImageFile] = useState(null);
  const { brandId, menuId, content } = inputs;

  const onChangePostingForm = (event) => {
    const { value, name } = event.target;

    // ::: 브랜드에 따라 메뉴 가져오기
    if (event.target.name === "brandId") {
      setSelectedBrand(event.target.value);
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // ::: 이미지 용량 줄이기 설정
  const compressImageAndGetImageFile = async (imageFile) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    const compressedFile = await imageCompression(imageFile, options);
    return compressedFile;
  };

  // ::: 이미지 미리보기(Image Preview) 및 리사이징(Resizing) 구현
  const previewImage = async (event) => {
    const imageFile = event.target.files[0];

    try {
      const compressedFile = await compressImageAndGetImageFile(imageFile);
      setCompressedImageFile(compressedFile);

      const finalCompressedImage = await imageCompression.getDataUrlFromFile(
        compressedFile
      );

      setPostImg(finalCompressedImage);
    } catch (error) {
      console.log("__PostForm_ploadImage error ::", error);
      alert("이미지를 업로드 하는데 문제가 생겼습니다. 다시 시도해주세요!");
    }
  };

  // ::: 게시글 등록
  const onClickAddPost = async (event) => {
    event.preventDefault();
    setValidationMessage([]);
    if (
      inputs.brandId === "" ||
      inputs.menuId === "" ||
      inputs.content === "" ||
      postImg === null
    ) {
      // ::: 유효성 검사
      inputs.brandId === "" &&
        setValidationMessage((prev) => [...prev, "브랜드"]);
      inputs.menuId === "" && setValidationMessage((prev) => [...prev, "메뉴"]);
      inputs.content === "" &&
        setValidationMessage((prev) => [...prev, "내용"]);
      postImg === null && setValidationMessage((prev) => [...prev, "사진"]);
      console.log("아래의 내용도 채워주셔야 해요!", validationMessage);
      return;
    }

    const URI = {
      BASE: process.env.REACT_APP_BASE_URI,
    };

    // ::: image 파일 서버 전송

    const form = new FormData();
    form.append("image", compressedImageFile);
    try {
      const postImageResponse = await axios.post(
        `${URI.BASE}api/post/upload-image`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("userToken"),
          },
        }
      );

      // ::: 게시글 컨텐츠 업로드
      const postContentResponse = await axios.post(
        `${URI.BASE}api/post`,
        {
          brandId: Number(inputs.brandId),
          menuId: Number(inputs.menuId),
          content: inputs.content,
          postImg: postImageResponse.data.img,
        },
        {
          headers: {
            Authorization: localStorage.getItem("userToken"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }

    // ::: 초기화
    setSelectedBrand("");
    setPostImg(null);
    setInputs({
      brandId: "",
      menuId: "",
      content: "",
    });
    navigate(`/`);
  };

  const onClickCancel = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <StPostFormWrap>
      <StPostImageBox>
        {postImg && <img src={postImg} alt="preview" />}
      </StPostImageBox>

      <StPostContentsBox>
        <h2>경험을 공유해주세요!</h2>
        <StRowFormBox>
          <label>브랜드</label>
          <select
            name="brandId"
            value={selectedBrand}
            onChange={onChangePostingForm}
          >
            <option value="">브랜드를 선택해주세요!</option>
            {brands.map(
              (brand, index) =>
                index !== 0 && (
                  <option
                    key={brand.brandId}
                    value={brand.brandId}
                    brandname={brand.brandName}
                  >
                    {brand.brandName}
                  </option>
                )
            )}
          </select>
        </StRowFormBox>

        <StRowFormBox>
          <label>메뉴</label>
          <select name="menuId" value={menuId} onChange={onChangePostingForm}>
            <option value="">메뉴를 선택해주세요!</option>
            {brands.map(
              (brand) =>
                brand.brandId === Number(selectedBrand) &&
                brand.menus.map((menu) => (
                  <option
                    key={menu.menuId}
                    value={menu.menuId}
                    menuname={menu.menuName}
                  >
                    {menu.menuName}
                  </option>
                ))
            )}
          </select>
        </StRowFormBox>

        <StRowFormBox>
          <label>내용</label>
          <textarea
            placeholder="경험한 내용을 입력해주세요!"
            name="content"
            value={content}
            onChange={onChangePostingForm}
          ></textarea>
        </StRowFormBox>
        <StRowFormBox>
          <label>사진선택</label>
          <input
            type="file"
            accept="image/jpg, image/jpeg, image/png"
            onChange={previewImage}
          />
        </StRowFormBox>
        <StFormValidation validationCount={validationMessage}>
          아래의 내용을 입력해주세요! <br />"
          {validationMessage.length >= 1 &&
            validationMessage.map((message) => (
              <span key={`${message}`}>{` ${message} `}</span>
            ))}
          "
        </StFormValidation>
        <StRowFormBox>
          <button onClick={onClickCancel}>취소</button>
          <button onClick={onClickAddPost}>등록</button>
        </StRowFormBox>
      </StPostContentsBox>
    </StPostFormWrap>
  );
};

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
`;

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
`;
const StPostContentsBox = styled.div`
  width: 50%;
  height: 100%;
  padding: 3rem;
  h2 {
    border-bottom: var(--border-style);
    padding: 10px;
    margin-bottom: 20px;
  }
`;

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
    font-size: 1.3rem;
    font-weight: 700;
  }
  label + select,
  label + input {
    width: calc(100% - 100px);
    height: 40px;
    background-color: var(--bg-color);
    font-size: 1.2rem;
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
    font-size: 1.2rem;
  }
  select:focus,
  textarea:focus {
    outline: none;
    border: 2px solid var(--red-color);
  }
  label + input[type="file"]:focus {
    outline: none;
  }
  input[type="file"]::file-selector-button {
    visibility: hidden;
  }
  input[type="file"]::before {
    content: "사진 업로드!";
    display: block;
    width: 120px;
    height: 36px;
    text-align: center;
    line-height: 36px;
    font-weight: 500;
    border: var(--border-style);
    background-color: var(--blue-color);
    margin-right: 10px;
    cursor: pointer;
    outline: none;
  }
  input[type="file"]:hover::before {
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
      color: #000;
    }
    &:last-child:hover {
      background-color: var(--green-color);
      color: #000;
    }
  }
`;
const StFormValidation = styled.div`
  display: ${({ validationCount }) =>
    validationCount.length < 1 ? "none" : "block"};
  width: 100%;
  height: 32px;
  font-style: italic;
  color: var(--red-color);
  margin-top: 20px;
  padding: 0 10px;
  border-left: 2px solid var(--red-color);
  overflow: hidden;
  span {
    color: var(--red-color);
    font-weight: 700;
  }
`;
