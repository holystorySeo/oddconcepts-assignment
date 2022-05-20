import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchKeywordResultPage from './pages/SearchKeywordResultPage';
import SearchCodeURLResultPage from './pages/SearchCodeURLResultPage';
import Nav from './components/Nav';
import SearchPage from './pages/SearchPage';
import TagPage from './pages/TagPage';

export default function App() {
  return (
    <BrowserRouter>
      <WholeContainer>
        <Nav />
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/tagging" element={<TagPage />} />
          <Route path="/search/keyword" element={<SearchKeywordResultPage />} />
          <Route path="/search/code" element={<SearchCodeURLResultPage />} />
          <Route path="/search/url" element={<SearchCodeURLResultPage />} />
        </Routes>
      </WholeContainer>
    </BrowserRouter>
  );
}

const WholeContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
  font-size: 16px;
  margin: 0;
  padding: 0;
  /* border: 1px solid red; */
`;
