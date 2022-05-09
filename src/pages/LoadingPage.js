import React from 'react';
import styled from 'styled-components';
import { RotatingLines } from 'react-loader-spinner';

export default function LoadingPage() {
  return (
    <StyledLoading className="loading">
      <RotatingLines width="70" />
      <p>데이터를 집계중입니다!!</p>
    </StyledLoading>
  );
}

const StyledLoading = styled.div`
  width: 100%;
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid black;
  p {
    margin-top: 30px;
    color: gray;
  }
`;
