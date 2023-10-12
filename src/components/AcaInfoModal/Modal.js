import styled from 'styled-components';
import React from 'react';

export const ModalContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 400px; /* 모달의 최대 너비 설정 */
  width: 100%;
  position: relative; /* 부모 요소에 대한 상대 위치로 설정 */
`;

export const ModalOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CloseButton = styled.button`
  background-image: linear-gradient(45deg, #9370DB 30%, #0288d1 90%);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  left: 50%; /* 화면 가로 중앙에 위치하도록 설정 */
  transform: translateX(-50%); /* 가로 중앙을 정확하게 조정 */

  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.0); /* 그림자 스타일 및 투명도 조절 */
  transition: box-shadow 0.3s ease; /* 그림자 변화에 부드러운 효과 추가 */

  &:hover {
    background-color: #6A5ACD;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.4); /* 마우스를 올렸을 때 그림자 효과 증가 */
  }
`;

export const Modal = ({ onClose, children }) => {
  console.log('모달이 열렸습니다.');
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {children}
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;