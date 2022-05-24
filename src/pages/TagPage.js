import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import InputModal from '../components/InputModal';

export default function TagPage() {
  const canvasRef = useRef(null); // canvas 영역
  const [ctx, setCtx] = useState(); // getContext('2d') 객체
  const [prev, setPrev] = useState([]); // 최종적으로 그린 사각형을a 담는 변수
  const [elements, setElements] = useState([]); // 지금까지 그린 사각형이 담겨있는 변수, useEffect 실행을 위한 의존성 배열의 요소로 사용된다.
  const [isDrawing, setIsDrawing] = useState(false); // drawing 하는지 마는지 여부
  const [pos, setPos] = useState([]); // 시작점 좌표
  const [showModal, setShowModal] = useState(false);
  const itemObj = JSON.parse(localStorage.getItem('canvas')); // localStorage 확인

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.4;
    canvas.height = window.innerHeight * 0.9;
    const context = canvas.getContext('2d');
    setCtx(context);

    if (itemObj) {
      const texts = Object.keys(itemObj);
      const lists = Object.values(itemObj);

      // localStorage 저장되어 있는 데이터를 이용해 사각형을 그려준다.
      lists.forEach((list, idx) => {
        context.strokeStyle = '#81F7F3';
        context.lineWidth = 2.5;
        context.fillStyle = 'rgb(244, 250, 88, 0.3)';
        context.strokeRect(list[0], list[1], list[2], list[3]);
        context.fillRect(list[0], list[1], list[2], list[3]);

        context.font = 'bold 20px arial';
        context.fillStyle = 'black';
        context.textBaseline = 'top';
        context.fillText(texts[idx], list[0] + 10, list[1] + 10);
      });
    }
  }, [elements]);

  const startDrawing = (e) => {
    setIsDrawing(true);
    const startX = e.clientX - canvasRef.current.offsetLeft; // 시작점의 X 좌표
    const startY = e.clientY - canvasRef.current.offsetTop; // 시작점의 Y 좌표
    setPos([startX, startY]);
  };

  const drawing = (e) => {
    if (ctx) {
      if (isDrawing) {
        // 사각형을 그리면서 생기는 잔상을 계속해서 지워준다.
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        const gapX = e.clientX - canvasRef.current.offsetLeft - pos[0];
        const gapY = e.clientY - canvasRef.current.offsetTop - pos[1];

        // 기존에 저장되어 있는 사각형 그리기
        // localStorage에 데이터가 있는 경우
        if (itemObj) {
          ctx.strokeStyle = '#81F7F3';
          ctx.lineWidth = 2.5;
          ctx.fillStyle = 'rgb(244, 250, 88, 0.3)';

          const texts = Object.keys(itemObj);
          const lists = Object.values(itemObj);

          lists.forEach((list, idx) => {
            // 사각형을 그린다.
            ctx.strokeStyle = '#81F7F3';
            ctx.lineWidth = 2.5;
            ctx.fillStyle = 'rgb(244, 250, 88, 0.3)';
            ctx.strokeRect(list[0], list[1], list[2], list[3]);
            ctx.fillRect(list[0], list[1], list[2], list[3]);

            // 텍스트를 그린다.
            ctx.font = 'bold 20px arial';
            ctx.fillStyle = 'black';
            ctx.textBaseline = 'top';
            ctx.fillText(texts[idx], list[0] + 10, list[1] + 10);
          });
        }
        // localStorage에 데이터가 없는 경우는 바로 새로운 도형을 그려준다.
        // 새로운 사각형 그리기, 저장되기 전까지는 red 계열이다.
        // 새롭게 그리는 사각형의 style을 선언해준다.
        ctx.strokeStyle = '#F7819F';
        ctx.lineWidth = 2.5;
        ctx.fillStyle = 'rgb(246, 206, 216, 0.3)';

        ctx.strokeRect(pos[0], pos[1], gapX, gapY);
        ctx.fillRect(pos[0], pos[1], gapX, gapY);

        setPrev([pos[0], pos[1], gapX, gapY]);
      }
    }
  };

  const finishDrawing = () => {
    setIsDrawing(false);
    setShowModal(true);
  };

  const handleSave = () => {
    setElements([...elements, prev]);
  };

  return (
    <TagPageContainer>
      {showModal ? (
        <InputModal
          boxInfo={prev}
          setShowModal={setShowModal}
          handleSave={handleSave}
        />
      ) : (
        ''
      )}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={drawing}
        onMouseUp={finishDrawing}
      />
    </TagPageContainer>
  );
}

const TagPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;

  canvas {
    background-image: url(https://user-images.githubusercontent.com/87353284/169354559-1a0b8c21-7a94-4932-89b3-b0a58b33f3c6.jpeg);
    background-size: cover;
  }
`;
