import React, { useState } from 'react';
import styled from 'styled-components';
import SearchBar from '../components/Search/SearchBar';
import SearchBtn from '../components/Search/SearchButton';

export default function SearchPage() {
  return (
    <WholeContainer>
      <div className="search-text" />
      <div className="search-section">
        <SearchBar />
        <SearchBtn />
      </div>
    </WholeContainer>
  );
}

const WholeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 700px;
  height: 600px;

  .search-text {
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 2.125rem;
    font-weight: 700;
    margin-bottom: 70px;
    line-height: 1.6;
    ::before {
      content: 'Artificial Intelligence';
    }
    ::after {
      content: 'PXL Fashion Viewer';
    }
  }

  .search-section {
    width: 100%;
    height: 65px;
    border-radius: 42px;
    background-color: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 1px solid #bdbdbd;
  }
`;
