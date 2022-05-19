import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import image from '../assets/fashion-unsplash.jpeg';

export default function TagPage() {
  const canvasRef = useRef(null); // canvas 영역
  const [ctx, setCtx] = useState(); // getContext('2d') 객체
  const [prev, setPrev] = useState([]); // 최종적으로 그린 사각형을 담는 변수
  const [elements, setElements] = useState([]); // 지금까지 그린 사각형이 담겨있는 변수
  const [isDrawing, setIsDrawing] = useState(false); // drawing 하는지 마는지 여부
  const [pos, setPos] = useState([]); // 시작점 좌표

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.5;
    canvas.height = window.innerHeight;
    const context = canvas.getContext('2d');
    context.strokeStyle = '#F7819F';
    context.lineWidth = 2.5;
    setCtx(context);
  }, []);

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

        const updateElements = [...elements, [pos[0], pos[1], gapX, gapY]];
        setPrev([pos[0], pos[1], gapX, gapY]);

        // 사각형 렌더링
        updateElements.forEach((element) =>
          ctx.strokeRect(element[0], element[1], element[2], element[3]),
        );
      }
    }
  };

  const finishDrawing = () => {
    setElements([...elements, prev]);
    setIsDrawing(false);
  };

  return (
    <TagPageContainer>
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
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;

  canvas {
    border: 1px solid red;
  }
`;
