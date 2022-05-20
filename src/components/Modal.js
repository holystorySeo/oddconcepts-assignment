import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

export default function Modal({ boxInfo, setShowModal, handleSave }) {
  const [inputValue, setInputValue] = useState('');

  const handleSumbit = () => {
    const itemObj = localStorage.getItem('canvas');

    if (!itemObj) {
      const newObj = {};
      newObj[inputValue] = boxInfo;
      localStorage.setItem('canvas', JSON.stringify(newObj));
    } else {
      const oldObj = JSON.parse(itemObj);
      oldObj[inputValue] = boxInfo;
      localStorage.setItem('canvas', JSON.stringify(oldObj));
    }
    handleSave();
    setShowModal(false);
  };

  const handleQuit = () => {
    setShowModal(false);
  };

  return (
    <ModalContainer>
      <div className="question" />
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className="btn">
        <button type="submit" onClick={handleSumbit}>
          확인
        </button>
        <button type="button" onClick={handleQuit}>
          취소
        </button>
      </div>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  position: absolute;
  width: 300px;
  height: 170px;
  background-color: #0b0b3b;
  border-radius: 5px;

  input {
    width: 80%;
    height: 15%;
    border-radius: 5px;
  }

  .question {
    &:before {
      content: '영역의 이름은 무엇인가요?';
      color: white;
    }
  }
`;
