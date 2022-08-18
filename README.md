# Coffee N Pasete Project
## Project Introduction
### WHO
#### 💻 Front-end developer ::: 
- 🏆 **강태훈** [FE리더]
  * 메인페이지 네비게이션, 메인 이미지 기능 구현, 상세페이지 게시글 Read, 댓글 CRUD, 무한스크롤
- 🏆 **나유진**
  * 게시글 Add, 이미지 미리보기, 이미지 리사이징, 메소리니 레이아웃, createPotal
- 🏆 **고호성**
  * 로그인*회원가입 모달

#### 💻 Back-end developer ::: 
- 🏆 **박상욱** [BE리더]
- 🏆 **김휘림** [총괄]
- 🏆 **김현중**
- 🏆 **최준우**

### WHEN
- 2022.08.12 ~ 2022.08.18

### WHAT
- Web Service 'Coffee N Paste'
- ::: 커피 프랜차이즈 메뉴별 리뷰 커뮤니케이션 서비스

### 주요기능
- 💻 Infinite Scroll 
- 💻 CreatePotal 
- 💻 Image Upload 
- 💻 Image Resizing(Compression) 
- 💻 LogIn & SignIn 
- 💻 Post CRUD
- 💻 Comment CRUD

### Trouble Shooting
- 이미지 프리뷰 업로드 및 리사이징, 서버 전송
- 게시글 이미지(AWS S3) 전송 후 게시글 컨텐츠 전송
- 모달창 구현으로 상세 게시글 불러올 때 랜더링 안되는 현상
- 무한 스크롤 게시글 중복 현상

- ... _이 외의 매 시간 에러와의 전쟁!_

### 패키지
- 스타일 적용 : `styled-components`
- s3 연결 : `aws-sdk`
- json-server (서버) 설치(테스트용) : `yarn add json-server`
- 리덕스 설치 : `yarn add react-redux`
- 툴킷 (리덕스) 설치 : `yarn add @reduxjs/toolkit`
- thunk (미들웨어) 설치 : `yarn add redux-thunk`
- axios(통신) 설치 : `yarn add axios` 
- logger (개발 편하게 도와줌) 설치 : `yarn add redux-loger`
- image resizing : `yarn add browser-image-compression`
- masorny 레이아웃 기능 구현 : `yarn add imagesloaded` (DOM에 부착된 이미지 로드 시점 알기 위해 사용)

### git commit message 규칙
- 파일 생성 ✨new : ~~~ 생성에 대한 커밋
- 파일 업데이트 🚀update : ~~~ 추가에 대한 커밋
- 파일 수정 ✂fix : ~~~ 수정에 대한 커밋
- 파일 삭제 🗑delete : ~~~ 삭제에 대한 커밋

### 폴더 및 컴포넌트 구성
<img src='https://github.com/YooJinRa/coffee-n-paste-FE/tree/master/documentImage/directoryFile1.png' width="100px">
<img src='https://github.com/YooJinRa/coffee-n-paste-FE/tree/master/documentImage/directoryFile2.png' width="100px">



