import styled, { keyframes } from "styled-components";

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  border-radius: 50px;
  border-bottom: 3px dotted #2DA898;
  border-right: 3px dotted #2DA898;
  border-top: 6px ridge #2DA898;
  border-left: 3px dotted #2DA898; 
  width: ${props => props.width || "80px"};
  height: ${props => props.height || "80px"};
  animation: ${spinAnimation} 2s linear infinite;
  position: absolute;
  z-index: 9999;
  top: 23vh;
`;