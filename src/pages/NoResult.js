import React from 'react';
import styled from 'styled-components';

function NotPound() {
  return (
    <StyledNotFound>
      <p>404 ERROR 페이지를 찾을 수 없습니다.</p>
      <p>올바른 경로로 접근해주세요!</p>
    </StyledNotFound>
  );
}

export default NotPound;

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
