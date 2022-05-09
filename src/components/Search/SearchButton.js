import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { getProductList } from '../../store/productSlice';

export default function SearchBtn() {
  const inputValue = useSelector((state) => state.product.inputValue);
  const [isActive, setIsActive] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 전역저장소의 inputValue의 값이 빈문자열이면 검색 버튼 비활성화
  useEffect(() => {
    if (inputValue === '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [inputValue]);

  const handleSearch = () => {
    dispatch(getProductList(inputValue));
    navigate({
      pathname: '/search',
      search: `?${createSearchParams({
        keyword: inputValue,
      })}`,
    });
  };
  return <WholeContainer disabled={isActive} onClick={handleSearch} />;
}

const WholeContainer = styled.button`
  border-width: 0;
  border-top-right-radius: 42px;
  border-bottom-right-radius: 42px;
  background-color: ${(props) => (props.disabled ? '#BDBDBD' : 'coral')};
  color: ${(props) => (props.disabled ? '#A4A4A4' : '#ffff')};
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.018em;
  line-height: 1.6;
  padding-left: 32px;
  padding-right: 32px;
  padding-top: 18px;
  padding-bottom: 18px;
  cursor: color: ${(props) => (props.disabled ? 'none' : 'pointer')};

  -webkit-font-smoothing: antialiased;

  ::after {
    content: '검색';
  }
`;
