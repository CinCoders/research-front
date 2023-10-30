import { Box, Button, Card } from '@mui/material';
import styled, { keyframes, css } from 'styled-components';

interface CustomButtonProps {
  isRotating: boolean; // Define your custom prop
}
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const AnimatedRefreshButton = styled(Button)<CustomButtonProps>`
  background: none;
  border: none;
  cursor: pointer;

  ${props =>
    props.isRotating &&
    css`
      animation: ${spin} 1s linear infinite;
    `}
`;

export const XMLDiv = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: '1',
  justifyContent: 'center',
  width: '100%',
});

export const FilesButton = {
  borderColor: '#c4c4c4',
  color: '#787878',
  minWidth: '150px',
  height: '56px',
  marginTop: '0.5em',
  ':hover': {
    backgroundColor: '#e4e4e487',
    border: '1px solid #3a3a3a',
  },
};

export const LoadingProcess = styled(Box)({
  display: 'flex',
  margin: 'auto',
  alignItems: 'center',
});

export const DataDiv = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: '1',
  width: '100%',
});

export const ButtonsDiv = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '1em',
});

export const ImportButton = styled(Button)({
  backgroundColor: '#c92918',
  ':hover': {
    backgroundColor: '#c10000',
  },
  marginLeft: 'auto',
});

export const CardType = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'initial',
  alignItems: 'center',
  position: 'fixed',
  padding: '0em 2em 0em 2em',
  borderRadius: '5px',
  color: '#000000',
  bottom: '25%',
  right: '25%',
  minWidth: '50vw',
  minHeight: '50vh',
});
