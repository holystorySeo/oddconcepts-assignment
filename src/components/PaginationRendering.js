import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import FirstArrayButton from './Button/FirstArrayButton';
import MidArrayButton from './Button/MidArrayButton';
import {
  changeCurrentPage,
  setTotalPage,
  setPageNumbers,
  setIsShowEndDot,
  setIsShowTotalPage,
} from '../store/productSlice';

// 설명: 전역 저장소 변수 상태에 따른 동적 rendering
export default function PaginationRendering() {
  const dispatch = useDispatch();
  const [renderComponent, setRenderComponent] = useState(<FirstArrayButton />);
  const { pageComponent, postLimit, productList } = useSelector(
    (state) => state.product,
  );

  // 최초 렌더링시 pagination 설정
  useEffect(() => {
    if (pageComponent === 'first') {
      const totalPage = Math.ceil(productList.length / postLimit);
      if (totalPage >= 6) {
        dispatch(setPageNumbers([1, 2, 3, 4]));
        dispatch(setIsShowEndDot(true));
        dispatch(setIsShowTotalPage(true));
      } else if (totalPage === 5) {
        dispatch(setPageNumbers([1, 2, 3, 4]));
        dispatch(setIsShowEndDot(false));
        dispatch(setIsShowTotalPage(true));
      } else {
        const newPageNumbers = [];
        for (let i = 1; i <= totalPage; i += 1) {
          newPageNumbers.push(i);
        }
        dispatch(setPageNumbers(newPageNumbers));
        dispatch(setIsShowEndDot(false));
        dispatch(setIsShowTotalPage(false));
      }
      dispatch(setTotalPage(totalPage));
    }
  }, []);

  useEffect(() => {
    let cleanUp = false;
    if (pageComponent === 'first') {
      setRenderComponent(<FirstArrayButton />);
    } else if (pageComponent === 'mid') {
      setRenderComponent(<MidArrayButton />);
    }
    return () => {
      cleanUp = true;
    };
  }, [pageComponent]);

  return <> {renderComponent};</>;
}

const RenderingContainer = styled.div`
  margin-top: 4rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* border: 1px solid red; */

  .postlist-pagination {
    /* border: 1px solid black; */
  }
`;
