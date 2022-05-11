import './App.css';
import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchKeywordResultPage from './pages/SearchKeywordResultPage';
import SearchCodeURLResultPage from './pages/SearchCodeURLResultPage';
import Nav from './components/Nav';
import SearchPage from './pages/SearchPage';
import TagPage from './pages/TagPage';
import CartPage from './pages/CartPage';

export default function App() {
  return (
    <BrowserRouter>
      <WholeContainer>
        <Nav />
        <Routes>
          <Route path="/" element={SearchPage()} />
          <Route path="/tagging" element={TagPage()} />
          <Route path="/cart" element={CartPage()} />
          <Route path="/search/keyword" element={SearchKeywordResultPage()} />
          <Route path="/search/code" element={SearchCodeURLResultPage()} />
          <Route path="/search/url" element={SearchCodeURLResultPage()} />
        </Routes>
      </WholeContainer>
    </BrowserRouter>
  );
}

const WholeContainer = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  min-width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
`;
