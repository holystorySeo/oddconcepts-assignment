import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentPage } from '../store/productSlice';

export default function Pagination() {
  const dispatch = useDispatch();
  const { currentPage, postLimit, productList } = useSelector(
    (state) => state.product,
  );
  const totalPage = Math.ceil(productList.length / postLimit);

  const pageNumbers = [];
  for (let i = 1; i <= totalPage; i += 1) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Nav>
        <Button
          onClick={() => dispatch(changeCurrentPage(currentPage - 1))}
          disabled={currentPage === 1}
        >
          &lt;
        </Button>
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
        <Button
          onClick={() => dispatch(changeCurrentPage(currentPage + 1))}
          disabled={currentPage === totalPage}
        >
          &gt;
        </Button>
      </Nav>
      <NavForMobile>
        <Button
          onClick={() => {
            dispatch(changeCurrentPage(currentPage - 1));
            window.scrollTo(0, 0);
          }}
          disabled={currentPage === 1}
        >
          &lt;
        </Button>
        <Button
          onClick={() => {
            dispatch(changeCurrentPage(currentPage + 1));
            window.scrollTo(0, 0);
          }}
          disabled={currentPage === totalPage}
        >
          &gt;
        </Button>
      </NavForMobile>
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
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

const NavForMobile = styled.nav`
  display: none;

  @media screen and (max-width: 467px) {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    margin: 16px;
    width: 100%;
    height: 100px;
  }
`;
