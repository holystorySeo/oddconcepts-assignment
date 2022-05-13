import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeCurrentPage,
  setPageNumbers,
  setPageComponent,
  setIsShowFirstDot,
  setIsShowEndDot,
  setIsShowNumberOne,
  setIsShowTotalPage,
} from '../../store/productSlice';

export default function MidArrayButton() {
  const dispatch = useDispatch();
  const {
    currentPage,
    postLimit,
    productList,
    pageNumbers,
    totalPage,
    isShowEndDot,
    isShowTotalPage,
  } = useSelector((state) => state.product);

  const handleNumbersDown = () => {
    if (currentPage === 5) {
      dispatch(setIsShowNumberOne(false));
      dispatch(setIsShowFirstDot(false));
      dispatch(setPageComponent('first'));
    }
    if (currentPage === pageNumbers[0]) {
      const newPageNumbers = [];
      for (let i = 1; i <= 4; i += 1) {
        const newNumber = currentPage - i;
        if (newNumber >= 1) {
          newPageNumbers.unshift(newNumber);
        }
      }
      if (newPageNumbers[0] - 1 === 0) {
        dispatch(setIsShowFirstDot(false));
        dispatch(setIsShowNumberOne(false));
        dispatch(setIsShowEndDot(true));
        dispatch(setIsShowTotalPage(true));
      } else if (newPageNumbers[0] - 1 === 1) {
        dispatch(setIsShowFirstDot(false));
        dispatch(setIsShowNumberOne(true));
        dispatch(setIsShowEndDot(true));
        dispatch(setIsShowTotalPage(true));
      } else if (newPageNumbers[0] - 1 >= 2) {
        dispatch(setIsShowFirstDot(true));
        dispatch(setIsShowNumberOne(true));
        dispatch(setIsShowEndDot(true));
        dispatch(setIsShowTotalPage(true));
      }
      dispatch(setPageNumbers(newPageNumbers));
    }
  };

  const handleNumbersUp = () => {
    if (currentPage === pageNumbers[pageNumbers.length - 1]) {
      const newPageNumbers = [];
      for (let i = 1; i <= 4; i += 1) {
        const newNumber = currentPage + i;
        if (totalPage >= newNumber) {
          newPageNumbers.push(newNumber);
        }
      }
      if (totalPage - newPageNumbers[newPageNumbers.length - 1] === 0) {
        dispatch(setIsShowEndDot(false));
        dispatch(setIsShowTotalPage(false));
      } else if (totalPage - newPageNumbers[newPageNumbers.length - 1] === 1) {
        dispatch(setIsShowEndDot(false));
        dispatch(setIsShowEndDot(true));
      } else if (totalPage - newPageNumbers[newPageNumbers.length - 1] >= 2) {
        dispatch(setIsShowEndDot(true));
        dispatch(setIsShowEndDot(true));
      }
      dispatch(setPageNumbers(newPageNumbers));
    }
  };

  return (
    <Nav>
      <Button
        onClick={() => {
          dispatch(changeCurrentPage(currentPage - 1));
          handleNumbersDown();
        }}
        disabled={currentPage === 1}
      >
        &lt;
      </Button>
      <Button>1</Button>
      <Button>&#46;&#46;&#46;</Button>
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
  /* border: 1px solid black; */
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
