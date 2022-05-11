import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

export default function LeftSideBar() {
  const { c1, image, left } = useSelector(
    (state) => state.product.leftsideList,
  );

  // attributes를 단일 객체로 만들기
  const newObj = {};
  left.forEach((obj, idx) => {
    // eslint-disable-next-line prefer-destructuring
    newObj[Object.keys(obj)[0]] = Object.values(obj)[0];
  });

  return (
    <LeftSideBarContainer>
      <div className="left-image">
        <img src={image} alt="없음" />
      </div>
      <div className="left-items">ITEMS</div>
      <div className="left-c1">
        <div className="left-c1-text">{c1.toUpperCase()}</div>
      </div>

      <div className="left-attributes">ATTRIBUTES</div>
      <div className="attributes">
        {left.map((obj, idx) => {
          return (
            <div className="attributes-value-key" key={`attr-idx${idx}`}>
              <div className="attribute-value">
                #{Object.values(obj)[0].toUpperCase()}
              </div>
              <div className="attribute-key">
                {Object.keys(obj)[0].toUpperCase()}
              </div>
            </div>
          );
        })}
      </div>
    </LeftSideBarContainer>
  );
}

const LeftSideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 15%;
  min-width: 300px;
  margin-top: 1rem;
  height: auto;
  /* border: 1px solid #bdbdbd; */

  .left-image {
    margin: 0.5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    border: 1px solid #bdbdbd;

    img {
      width: 100%;
      border: 0;
      border-radius: 5px;
    }
  }

  .left-items {
    width: 100%;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .left-c1 {
    display: flex;
    width: 100%;
    margin-bottom: 2rem;

    .left-c1-text {
      display: flex;
      background: coral;
      color: white;
      padding: 0.2rem 0.5rem;
      font-size: 1.5rem;
      font-weight: 900;
    }
  }
  .left-attributes {
    width: 100%;
    font-size: 1.5rem;
  }

  .attributes {
    width: 100%;
    word-break: break-all;

    .attributes-value-key {
      display: inline-block;
      margin: 1.5rem 1.5rem 0 0;
    }

    .attribute-value {
      font-size: 1.2rem;
      font-weight: 700;
      color: coral;
    }

    .attribute-key {
      font-size: 1.2rem;
      font-weight: 600;
      color: black;
    }
  }
`;
