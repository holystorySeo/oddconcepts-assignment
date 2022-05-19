# oddconcepts-assignment
오드컨셉 픽셀뷰어 검색과 네임 태그

### 일정
- 2022.5.9 ~ 5.13(5일)

### 내용
- 오드컨셉 json 파일 자료 픽셀뷰어 검색 기능 2가지 종류 구현
- keywor 검색의 경우, product-code 와 image_url 검색의 경우
- 이미지 네임 태그 설정

<kbd><img src="https://user-images.githubusercontent.com/87353284/168218174-bad9e29b-3ea5-4f18-ba79-0dfefc5b4ef8.gif" width="200%"></kbd>

## 배포 링크
[https://oddconcepts-assignment.vercel.app](https://oddconcepts-assignment.vercel.app)

## 개발 환경
  |기술 스택|실행 방법|의존성 모듈|
  |:-:|:-:|:-:|
  |JavaScript|Repostiory clone : 터미널 창에서 git clone|create-react-app, styled-components|
  |React.JS |Dependency install : npm install|react-redux, @redux-toolkit 
  |Redux|Execution : npm start|react-router-dom, axios|

## 개발 기능

- API 호출 : redux/toolkit의 createAsyncThunk와 axios 활용하여 데이터 비동기 수신
  - 직관적 쿼리문

      <img src="https://user-images.githubusercontent.com/87353284/168223134-965db44a-f556-4eac-9a89-cbc96bbd7af0.png" width="50%">
      <img src="https://user-images.githubusercontent.com/87353284/168223143-c52a32f5-623f-49bc-bce5-3615b08fa0f4.png" width="90%">
      <img src="https://user-images.githubusercontent.com/87353284/168223149-ba339442-a7fb-4190-ba4e-547b3640c1c0.png" width="50%">
      
- 반응형 구현 : 최초 렌더링시에 browser 사이즈 확인하여 검색 결과에 따른 전체 포스트의 개수에 맞추어서 한 페이지당 포스팅 수 계산하여 구현

    <img src="https://user-images.githubusercontent.com/87353284/168220117-83bae7dc-0195-4e1e-b647-8670bdbd0875.gif" width="70%">

- 로컬 캐싱: LocalStorage에 검색어를 저장하여 동일 검색어의 경우에 활용(expireTime 30분, 파일명: utils/getItemFromLocalStorage.js, utils/setItemToLocalStorage.js)
  - 만료시간은 최초 저장시 getTime()에 1.8e6 밀리세컨드(30분)를 가산
  - 로컬 스토리지에서 동일 검색어 발견시 현재 시간과 만료시간을 비교하여 삭제 혹은 활용 여부 결정
  
    <img src="https://user-images.githubusercontent.com/87353284/168219190-4e8d48bd-ff96-4840-a088-cb66062db403.png" width="70%">

- 페이지네이션 도입: 페이지 인덱스의 이동에 따른 페이지네이션 컴포넌트 알맞은 변화로 UX 제고

    <img src="https://user-images.githubusercontent.com/87353284/168222040-19546cb3-596b-400d-9dac-f0725ffeb73e.gif" width="70%">

- 검색 결과 없는 경우와 데이터 호출 에러 처리
  - 정상적인 데이터 호출 상황에서 검색겨로가 없을 경우 화면에 해당 내용 안내
  
    <img src="https://user-images.githubusercontent.com/87353284/168222897-3c19996b-1dc8-41ff-a067-bef58864c41b.gif" width="50%">
  
  - 데이터 통신 오류로 인하여 검색결과 없을 경우 alert 처리와 화면에 해당 내용 안내

    <img src="https://user-images.githubusercontent.com/87353284/168222587-3925cd8e-fbdc-4ce4-b360-ed016ae3d01b.gif" width="50%">

## 프로젝트 구현 방법

- Redux Toolkit으로 전역 상태 관리(1개의 slice 활용하여 로딩 속도 제고)

    <img src="https://user-images.githubusercontent.com/87353284/168223539-c9c89d27-749b-4c50-82c3-34a42daea11b.png" width="30%">

- 개별 기능에 중점을 둔 컴포넌트 폴더 구조

    <img src="https://user-images.githubusercontent.com/87353284/168223711-c5fee09c-c81e-48b4-be4f-2f8eb3fe142b.png" width="20%">
   

## 개선 사항
- 이미지 검색 결과 반응형에 따른 열에 이미지 빈공백 처리의 문제 
  - 초기 렌더링 시에는 이미지 열에 빈공백이 없으나 브라우저 창의 크기를 변경하면 이미지 공백이 생기는 문제
  - display: grid를 활요하여 해결 예정

- 페이지 네이션 숫자 1과 마지막 숫자 클릭의 경우 페이지 이동이 되지 않음
  -  데이터 흐름을 변경하는 파일 구조로 해결 모색
