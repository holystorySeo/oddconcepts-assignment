import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { FaPercent } from 'react-icons/fa';

export default function TagPage() {
  const [portion, setPortion] = useState(1);
  const [draggable, setDraggable] = useState(false);

  const pointerLocation = useRef(null);
  const grayBar = useRef(null);
  const coralBar = useRef(null);
  const mouseHandler = (e) => {
    e.preventDefault();
    setDraggable(true);

    const shiftX =
      e.clientX - pointerLocation.current.getBoundingClientRect().left;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(e) {
      let newLeft =
        e.clientX - shiftX - grayBar.current.getBoundingClientRect().left;

      // the pointer is out of slider => lock the thumb within the bounaries
      if (newLeft < 0) {
        newLeft = 0;
      }

      const rightEdge =
        grayBar.current.offsetWidth - pointerLocation.current.offsetWidth;

      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      pointerLocation.current.style.left = `${newLeft}px`;

      if (newLeft === 0) newLeft = 3.89;
      coralBar.current.style.width = `${newLeft}px`;
      const newPortion = Math.floor((newLeft / 388) * 100);
      setPortion(newPortion);
    }

    function onMouseUp() {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }
  };

  const dragStart = () => false;

  const moveDot = (value) => {
    const condition = value;
    if (value === 100) {
      value = 97;
    }

    if (value === 1) {
      value = 0;
    }
    pointerLocation.current.style.left = `${(400 * value) / 100}px`;
    coralBar.current.style.width = `${(400 * value) / 100}px`;
    setPortion(condition);
  };

  return (
    <SliderContainer>
      <div className="display-section">
        <div className="display-portion">{portion}</div>
        <FaPercent className="percent-image" />
      </div>
      <UnderlineBarContainer>
        <div className="underline" ref={grayBar} />
        <Dot />
        <Dot1 className={`${portion >= 25 ? 'dot--checked' : ''}`} />
        <Dot2 className={`${portion >= 50 ? 'dot--checked' : ''}`} />
        <Dot3 className={`${portion >= 75 ? 'dot--checked' : ''}`} />
        <Dot4 />
        <div className="overline" ref={coralBar} />
        <Pointer
          draggable={draggable}
          className="pointer"
          onMouseDown={mouseHandler}
          onDragStart={dragStart}
          ref={pointerLocation}
        />
      </UnderlineBarContainer>
      <PortionButtonContainer>
        <Btn onClick={() => moveDot(1)}>1%</Btn>
        <Btn1 onClick={() => moveDot(25)}>25%</Btn1>
        <Btn2 onClick={() => moveDot(50)}>50%</Btn2>
        <Btn3 onClick={() => moveDot(75)}>75%</Btn3>
        <Btn4 onClick={() => moveDot(100)}>100%</Btn4>
      </PortionButtonContainer>
    </SliderContainer>
  );
}

const SliderContainer = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  width: 400px;
  .display-section {
    width: 400px;
    height: 50px;
    border: 1px solid #e6e6e6;
    display: flex;
    flex-direction: row;
    align-items: center;
    .display-portion {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size: 20px;
      font-weight: 600;
      color: black;
      width: 350px;
      height: 30px;
      margin-right: 3px;
    }
    .percent-image {
      height: 30px;
      font-size: 10px;
      color: #848484;
    }
  }
`;

const UnderlineBarContainer = styled.div`
  position: relative;
  width: 400px;
  height: 50px;
  .underline {
    margin-top: 30px;
    background: #e6e6e6;
    border: 2px solid #e6e6e6;
    width: 400px;
  }
  .overline {
    position: absolute;
    top: 30px;
    border: 2px solid coral;
    background: coral;
  }
  .dot--checked {
    background: coral;
  }
`;

const Pointer = styled.div`
  position: absolute;
  top: 24px;
  width: 12px;
  height: 12px;
  background: coral;
  border-radius: 12px;
  border: 2px solid white;
  box-shadow: 0px 0px 3px #000;
  cursor: pointer;
  z-index: 999;
`;

const Dot = styled(Pointer)`
  top: 25px;
  background: coral;
  border: none;
  box-shadow: none;
  cursor: none;
`;

const Dot1 = styled(Pointer)`
  top: 25px;
  left: 100px;
  background: #e6e6e6;
  border: none;
  box-shadow: none;
  cursor: none;
`;

const Dot2 = styled(Dot1)`
  top: 25px;
  left: 200px;
  background: #e6e6e6;
  border: none;
  box-shadow: none;
  cursor: none;
`;

const Dot3 = styled(Dot1)`
  top: 25px;
  left: 300px;
  background: #e6e6e6;
  border: none;
  box-shadow: none;
  cursor: none;
`;

const Dot4 = styled(Dot1)`
  top: 25px;
  left: 392px;
  background: #e6e6e6;
  border: none;
  box-shadow: none;
  cursor: none;
`;

const PortionButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 420px;
  height: 20px;
  /* border: 1px solid black; */
`;

const Btn = styled.div`
  width: 35px;
  height: 17px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3px;
  font-weight: 600;
  background: #e6e6e6;
  color: #6e6e6e;
  cursor: pointer;
  :hover {
    color: white;
    background: coral;
  }
`;

const Btn1 = styled(Btn)`
  margin-left: 55px;
`;

const Btn2 = styled(Btn)`
  margin-left: 65px;
`;

const Btn3 = styled(Btn)`
  margin-left: 65px;
`;

const Btn4 = styled(Btn)`
  margin-left: 45px;
`;
