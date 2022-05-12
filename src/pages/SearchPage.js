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
  width: 120%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: -10%;

  .search-text {
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 2.125rem;
    font-weight: 700;
    margin-bottom: 90px;

    ::before {
      content: 'Artificial Intelligence';
    }
    ::after {
      content: 'PXL Fashion Viewer';
    }
  }

  .search-section {
    width: 35%;
    min-width: 300px;
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
