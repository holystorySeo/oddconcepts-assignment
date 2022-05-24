import React, { useState } from 'react';
import styled from 'styled-components';
import SearchBar from '../components/Search/SearchBar';
import SearchBtn from '../components/Search/SearchBtn';

export default function SearchPage() {
  return (
    <WholeContainer>
      <div className="search-text">
        <div className="text-ahead">Artificial Intelligence</div>
        <div className="text-end">
          <span className="text-end-first">PXL</span>
          <span className="text-end-mid">Fashion</span>
          <span className="text-end-last">Viewer</span>
        </div>
      </div>
      <div className="search-section">
        <SearchBar />
        <SearchBtn />
      </div>
    </WholeContainer>
  );
}

const WholeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .search-text {
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 90px;

    .text-ahead {
      color: #424242;
      margin-bottom: 0.5rem;
    }

    .text-end-mid {
      color: #424242;
      margin: 0 0.5rem;
    }

    .text-end-first,
    .text-end-last {
      font-family: 'Roboto Flex';
      color: #848484;
    }
  }

  .search-section {
    width: 35%;
    min-width: 300px;
    height: 45px;
    border-radius: 42px;
    background-color: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 1px solid #bdbdbd;
  }
`;
