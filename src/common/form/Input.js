import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import InputMask from 'react-input-mask';

export default function StyledInput({ mask = '', maskChar = '', formatChars, variant = 'outlined', value='', onChange = () => 0, width, height, background, events, ...props }) {
  return (mask || maskChar) ? (
    <InputMask  mask={mask} maskChar={maskChar} value={value} onChange={onChange} {...(formatChars && { formatChars })}>
      {() => <StyledTextField {...props} variant={variant} width={width} height={height} background={background} events={events}/>}
    </InputMask>
  ) : (
    <StyledTextField {...props} value={value} onChange={onChange} variant={variant} width={width} height={height} background={background} events={events}/>
  );
}

const StyledTextField = styled(TextField)`
  margin-top: 8px !important;
  background-color: ${(props) => props.background || 'initial'};
  pointer-events: ${(props) => props.events || 'initial'};
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.width || 'auto'};
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #A4A4A4;
    }
  }
  & label.Mui-focused {
    color: #3A3A3A;  
  }
`;
