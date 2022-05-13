import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import image from '../assets/fashion-unsplash.jpeg';

export default function TagPage() {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState();

  const drawing = (e) => {
    ctx.strokeStyle = 'red';
    const x = e.clientX - canvasRef.current.offsetLeft;
    const y = e.clientY - canvasRef.current.offsetTop;
    const w = 50;
    const h = 50;
    ctx.strokeRect(x - w / 2, y - h / 2, w, h);
  };

  return (
    <TagPageContainer>
      <p>준비중</p>
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

  .image-section {
    border: 1px solid red;
  }

  .tag-list-section {
    width: 100px;
  }
`;
