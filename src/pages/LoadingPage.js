import React from 'react';
import styled from 'styled-components';
import { RotatingLines } from 'react-loader-spinner';

export default function LoadingPage() {
  return (
    <StyledLoading className="loading">
      <RotatingLines width="70" />
      <p>데이터를 찾고 있습니다!</p>
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

  p {
    margin-top: 30px;
    color: gray;
  }
`;
