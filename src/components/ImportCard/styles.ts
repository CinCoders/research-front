import { Box, styled, Button } from '@mui/material';

export const ButtonsDiv = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const XMLDiv = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  maxWidth: 800,
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

export const ImportButton = styled(Button)({
  backgroundColor: '#c92918',
  ':hover': {
    backgroundColor: '#c10000',
  },
});

export const LoadingProcess = styled(Box)({
  display: 'flex',
  margin: 'auto',
  alignItems: 'center',
});

export const DataDiv = styled(Box)({
  height: 300,
  marginTop: '1em',
});
