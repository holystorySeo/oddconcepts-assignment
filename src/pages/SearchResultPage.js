import React from 'react';
import styled from 'styled-components';
import Rendering from '../components/Rendering';

export default function SearchResultPage() {
  return (
    <SearchResultPageContainer>
      <Rendering />
    </SearchResultPageContainer>
  );
}

const SearchResultPageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
