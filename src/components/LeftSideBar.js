import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

export default function LeftSideBar() {
  const { c1, image, left } = useSelector(
    (state) => state.product.leftsideList,
  );
  console.log(left);

  return (
    <LeftSideBarContainer>
      <div className="left-image">
        <img src={image} alt="없음" />
      </div>
      <div className="left-c1">{c1}</div>
      <div className="left-attributes">{left[0].style}</div>
    </LeftSideBarContainer>
  );
}

const LeftSideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  min-width: 100px;
  padding: 1rem;
  height: auto;
  border: 1px solid black;

  .left-image {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    width: 100%;
  }
`;
