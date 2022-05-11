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
    const checkKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글이 포함되었는지 여부
    const checkOnlyNum = /^[0-9]*$/; // 숫자로만 구성되었는지 여부
    const checkUrl = /^(http(s)?:\/\/)/gi; // URL인지 확인

    dispatch(getProductList(inputValue));

    // keyword 입력한 경우 브라우저 주소입력창의 주소 설정
    if (checkKor.test(inputValue)) {
      navigate(`/search/keyword?query=${inputValue}`);
    }

    // product_code 입력한 경우
    if (checkOnlyNum.test(inputValue)) {
      navigate(`/search/code?query=${inputValue}`);
    }

    // img_url 입력한 경우
    if (checkUrl.test(inputValue)) {
      navigate(`/search/url?query=${inputValue}`);
    }
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
