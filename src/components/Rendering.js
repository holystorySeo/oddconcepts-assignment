import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import PostList from './PostList';
import LeftSideBar from './LeftSideBar';
import Pagination from './Pagination';
import LoadingPage from '../pages/LoadingPage';
import NotResultPage from '../pages/NoResultPage';

// 설명: 전역 저장소 변수 상태에 따른 동적 rendering
export default function Rendering() {
  const { productList, loading, searchStuff } = useSelector(
    (state) => state.product,
  );

  if (loading) {
    return <LoadingPage />;
  }

  if (loading === false && productList.length === 0) {
    return <NotResultPage />;
  }

  if (loading === false && productList.length !== 0 && searchStuff) {
    return (
      <div className="postlist-pagination">
        <PostList />
        <Pagination />
      </div>
    );
  }

  if (loading === false && productList.length !== 0 && !searchStuff) {
    return (
      <RenderingContainer>
        <LeftSideBar />
        <div className="postlist-pagination">
          <PostList />
          <Pagination />
        </div>
      </RenderingContainer>
    );
  }
}

const RenderingContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
