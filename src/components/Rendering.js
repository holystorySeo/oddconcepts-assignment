import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import PostList from './PostList';
import PostListforCodeURL from './PostListforCodeURL';
import LeftSideBar from './LeftSideBar';
import Pagination from './Pagination';
import LoadingPage from '../pages/LoadingPage';
import NoResultPage from '../pages/NoResultPage';

// 설명: 전역 저장소 변수 상태에 따른 동적 rendering
export default function Rendering() {
  const { productList, loading, searchStuff, error } = useSelector(
    (state) => state.product,
  );

  if (loading) {
    return <LoadingPage />;
  }

  // 검색 결과가 없는 경우
  if (loading === false && productList.length === 0 && error === '') {
    return (
      <RenderingContainer>
        <NoResultPage
          text="검색 결과가 없습니다. 다른 검색어를 입력해 주세요"
          message="http status code 404"
        />
      </RenderingContainer>
    );
  }

  if (
    loading === false &&
    productList.length !== 0 &&
    searchStuff &&
    error === ''
  ) {
    return (
      <RenderingContainer>
        <div className="postlist-pagination">
          <PostList />
          <Pagination />
        </div>
      </RenderingContainer>
    );
  }

  if (
    loading === false &&
    productList.length !== 0 &&
    !searchStuff &&
    error === ''
  ) {
    return (
      <RenderingContainer>
        <LeftSideBar />
        <div className="postlist-pagination">
          <PostListforCodeURL />
          <Pagination />
        </div>
      </RenderingContainer>
    );
  }

  // 통신 response error 발생시
  if (error !== '') {
    return (
      <RenderingContainer>
        <NoResultPage
          text="데이터 통신 요청 중에 에러가 발생했습니다."
          message="http status code 404"
        />
      </RenderingContainer>
    );
  }
}

const RenderingContainer = styled.div`
  margin-top: 4rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* border: 1px solid red; */
`;
