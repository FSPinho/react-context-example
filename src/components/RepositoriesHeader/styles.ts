import styled from "styled-components";

export const Header = styled.div`
  position: relative;
  padding: 8px;
  margin: 8px;
  border: 1px solid grey;
  border-bottom: 2px solid black;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderInfo = styled.div<{ clickable?: boolean }>`
  cursor: ${p => p.clickable ? "pointer" : "default"};
`;

export const ModalBG = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.24);
`

export const ModalClose = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
`

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  padding: 8px;

  width: 640px;
  max-height: 100vh;

  background-color: white;
  z-index: 9999;
  border-radius: 12px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.24) 0 4px 8px;
`;
