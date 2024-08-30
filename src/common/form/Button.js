import Button from '@mui/material/Button';
import styled from 'styled-components';

export default function StyledButton({ variant='contained', width, fontsize, children, background, backgroundhover, fontColor, margintop, ...props }) {
  return (
    <StyledMuiButton variant={variant} width={width} fontsize={fontsize} background={background} backgroundhover={backgroundhover} fontColor={fontColor} margintop={margintop} {...props}>
      {children}
    </StyledMuiButton>
  );
}

const StyledMuiButton = styled(Button)`
  && {
    font-weight: 700;
    font-size: ${(props) => props.fontsize || '18px'};
    width: ${(props) => props.width || 'auto'};
    background-color: ${(props) => props.background || '#158A7A'};
    color: ${(props) => props.fontColor || '#FFFFFF'};
    margin-top: ${(props) => props.margintop || '0'};
    
    &:hover {
      background-color: ${(props) => props.backgroundhover || '#158A7A'};
    }
  }
`;
