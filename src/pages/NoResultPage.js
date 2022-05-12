import React from 'react';
import styled from 'styled-components';

export default function NoResult({ text, message }) {
  return (
    <StyledNotFound>
      <p>{text}</p>
      <p>{message}</p>
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
