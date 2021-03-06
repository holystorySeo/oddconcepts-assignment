import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import logoPxl from '../assets/logo_pxl_b.png';
import { initializeState } from '../store/productSlice';

export default function Nav() {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(0);

  const tabHandler = (idx) => {
    setSelectedTab(idx);
  };

  return (
    <NavContainer>
      <span id="title">
        <Link to="/">
          <img
            role="presentation"
            id="logo"
            src={logoPxl}
            alt="logo"
            onClick={() => dispatch(initializeState())}
          />
        </Link>
      </span>
      <div id="menu">
        <Link to="/">
          <span
            role="presentation"
            className={`submenu ${selectedTab === 0 ? 'submenu--focused' : ''}`}
            onClick={() => tabHandler(0)}
          >
            상품검색
          </span>
        </Link>
        <Link to="/tagging">
          <span
            role="presentation"
            className={`submenu ${selectedTab === 1 ? 'submenu--focused' : ''}`}
            onClick={() => tabHandler(1)}
          >
            태그달기
          </span>
        </Link>
      </div>
    </NavContainer>
  );
}

const NavContainer = styled.div`
  background-color: white;
  width: 100%;
  min-height: 4rem;
  position: fixed;
  top: 0;
  border-bottom: solid 1px rgb(212, 212, 212);
  display: grid;
  place-items: center;

  #title {
    font-weight: 700;
    font-size: 1.5rem;
  }

  #logo {
    width: 70px;
    margin-right: 1rem;
    vertical-align: middle;

    @media screen and (max-width: 559px) {
      margin: 0;
    }
  }

  #menu {
    margin: 1.8rem;
    right: 0;
    font-weight: 300;
    position: absolute;
    display: flex;
    flex-direction: row;

    @media screen and (max-width: 559px) {
      display: none;
    }
  }

  .submenu {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #848484;
    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;

    &.submenu--focused {
      color: black;
    }
  }

  a {
    text-decoration: none;
    color: black;
    font-size: 1rem;
    margin: 0.7rem;
  }

  a:hover {
    color: #4000c7;
  }
`;
