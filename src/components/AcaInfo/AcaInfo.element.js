import styled, { css } from 'styled-components';

export const BodyContainer = styled.main`
  padding: 20px;
  background-color: #ffffff;
  
`;

export const InfoText = styled.p`
  font-size: 22px;
  font-weight: bold;
  color: #333;
`;

/* 테이블 목차 스타일 */
export const TableDesign = styled.ul`
  list-style-type: none; /* 목차 스타일 제거 */
  padding-left: 20px; /* 들여쓰기 제거 */
`;

export const CustomButton = styled.button`
  background-color: #bebebe;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.0);
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  ${(props) =>
    props.clicked &&
    css`
      background-image: linear-gradient(45deg, #9370DB 30%, #0288d1 90%);
    `}

  &:hover {
    cursor: pointer;
    cursor: pointer;
    transform: scale(1.04); /* 확대 효과 추가 */
    background-image: linear-gradient(45deg, #9370DB 30%, #0288d1 90%);
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  &:active {
    background-color: #483d8b;
  }
`;