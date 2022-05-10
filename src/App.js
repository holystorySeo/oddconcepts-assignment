import './App.css';
import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import SearchPage from './pages/SearchPage';
import TagPage from './pages/TagPage';
import CartPage from './pages/CartPage';
import SearchResultPage from './pages/SearchResultPage';

export default function App() {
  return (
    <BrowserRouter>
      <WholeContainer>
        <Nav />
        <Routes>
          <Route path="/" element={SearchPage()} />
          <Route path="/tagging" element={TagPage()} />
          <Route path="/cart" element={CartPage()} />
          <Route path="/search" element={SearchResultPage()} />
        </Routes>
      </WholeContainer>
    </BrowserRouter>
  );
}

const WholeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;
