import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeCurrentPage,
  setPageComponent,
  setPageNumbers,
  setIsShowEndDot,
  setIsShowNumberOne,
  setIsShowTotalPage,
} from '../../store/productSlice';

export default function FirstArrayButton() {
  const dispatch = useDispatch();
  const {
    currentPage,
    postLimit,
    productList,
    totalPage,
    pageNumbers,
    isShowFirstDot,
    isShowEndDot,
    isShowNumberOne,
    isShowTotalPage,
  } = useSelector((state) => state.product);

  const handleNumbersUp = () => {
    if (currentPage === 4) {
      const newPageNumbers = [];
      for (let i = 1; i <= 4; i += 1) {
        const newNumber = currentPage + i;
        if (totalPage >= newNumber) {
          newPageNumbers.push(newNumber);
        }
      }
      if (totalPage - newPageNumbers[newPageNumbers.length - 1] === 0) {
        dispatch(setIsShowNumberOne(true));
        dispatch(setIsShowEndDot(false));
        dispatch(setIsShowTotalPage(false));
      } else if (totalPage - newPageNumbers[newPageNumbers.length - 1] === 1) {
        dispatch(setIsShowNumberOne(true));
        dispatch(setIsShowEndDot(false));
        dispatch(setIsShowTotalPage(true));
      } else if (totalPage - newPageNumbers[newPageNumbers.length - 1] >= 2) {
        dispatch(setIsShowNumberOne(true));
        dispatch(setIsShowEndDot(true));
        dispatch(setIsShowTotalPage(true));
      }
      dispatch(setPageComponent('mid'));
      dispatch(setPageNumbers(newPageNumbers));
    }
  };

  return (
    <Nav>
      <Button
        onClick={() => dispatch(changeCurrentPage(currentPage - 1))}
        disabled={currentPage === 1}
      >
        &lt;
      </Button>
      {isShowNumberOne ? <Button>1</Button> : ''}
      {isShowFirstDot ? <Button>&#46;&#46;&#46;</Button> : ''}
      {pageNumbers.map((page) => {
        return (
          <Button
            className="btn-index"
            key={`page-idx${page}`}
            onClick={() => {
              dispatch(changeCurrentPage(page));
              window.scrollTo(0, 0);
            }}
            aria-current={currentPage === page ? 'page' : null}
          >
            {page}
          </Button>
        );
      })}
      {isShowEndDot ? <Button>&#46;&#46;&#46;</Button> : ''}
      {isShowTotalPage ? <Button>{totalPage}</Button> : ''}
      <Button
        onClick={() => {
          dispatch(changeCurrentPage(currentPage + 1));
          handleNumbersUp();
        }}
        disabled={currentPage === totalPage}
      >
        &gt;
      </Button>
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 100%;
  height: 100px;

  @media screen and (max-width: 467px) {
    display: none;
  }
`;

const Button = styled.button`
  border: none;
  border-radius: 30px;
  margin: 0;
  background: black;
  color: white;
  font-size: 1rem;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;

  &:hover {
    background: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: #d8d8d8;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: coral;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;
