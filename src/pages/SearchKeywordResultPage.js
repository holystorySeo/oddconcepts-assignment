import React from 'react';
import styled from 'styled-components';
import Rendering from '../components/Rendering';

export default function SearchKeywordResultPage() {
  return (
    <SearchKeywordResultPageContainer>
      <Rendering />
    </SearchKeywordResultPageContainer>
  );
}

const SearchKeywordResultPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid coral; */
`;
