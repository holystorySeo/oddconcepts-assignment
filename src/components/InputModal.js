import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

export default function InputModal({ boxInfo, setShowModal, handleSave }) {
  const [inputValue, setInputValue] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const confirmRef = useRef(null);

  useEffect(() => {
    confirmRef.current.focus();
  }, []);

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
    if (e.target.value) {
      setErrorMsg('');
    }
  };

  const handleSumbit = () => {
    if (inputValue === '') {
      setErrorMsg('영역의 태그를 입력해 주세요.');
      return;
    }
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
        ref={confirmRef}
        onChange={handleInputValue}
      />
      <div className="error-message">{errorMsg}</div>
      <div className="btn">
        <button type="button" className="cancel-btn" onClick={handleQuit}>
          취소
        </button>
        <button type="submit" className="submit-btn" onClick={handleSumbit}>
          확인
        </button>
      </div>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  position: absolute;
  min-width: 270px;
  min-height: 130px;
  background-color: #2e2e2e;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  padding: 0.8rem 0.8rem;

  input {
    border-radius: 5px;
    height: 30px;
    border: none;
    background-color: black;
    color: white;
    padding-left: 10px;
    :focus {
      outline: 2px solid aqua;
    }
  }

  .btn {
    display: flex;
    justify-content: flex-end;

    .submit-btn {
      background: aqua;
      font-weight: 700;
      :active {
        background: white;
      }
    }

    .cancel-btn {
      font-weight: 700;
      margin-right: 0.5rem;
    }
  }

  .question {
    &:before {
      content: '영역의 이름은 무엇인가요?';
      color: white;
    }
  }

  button {
    min-width: 60px;
    min-height: 30px;
    border-radius: 5px;
    border: none;
  }

  .error-message {
    display: flex;
    align-items: center;
    height: 20px;
    color: red;
    font-size: 0.8rem;
    margin-left: 0.2rem;
  }
`;
