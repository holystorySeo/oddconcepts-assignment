import React from 'react';
import styled from 'styled-components';

export default function NoResult() {
  return (
    <StyledNotFound>
      <p>검색 결과가 없습니다. 다른 검색어를 입력해 주세요.</p>
      <p>HTTP Status 404 - Not Found</p>
    </StyledNotFound>
  );
}

const StyledNotFound = styled.div`
  width: 100%;
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  p {
    margin-top: 30px;
    font-size: 28px;
    font-weight: bold;
  }
  div {
    display: flex;
    img {
      width: 400px;
    }
  }
`;
