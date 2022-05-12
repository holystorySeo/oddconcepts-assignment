import React from 'react';
import styled from 'styled-components';
import Rendering from '../components/Rendering';

export default function SearchCodeURLResultPage() {
  return (
    <SearchCodeURLResultPageContainer>
      <Rendering />
    </SearchCodeURLResultPageContainer>
  );
}

const SearchCodeURLResultPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 10px solid blue;

  @media screen and (max-width: 746px) {
    width: 300px;
  }
`;
