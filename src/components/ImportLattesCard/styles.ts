import { Box, styled, Button, Card } from '@mui/material';

export const ImportButton = styled(Button)({
  backgroundColor: '#c92918',
  ':hover': {
    backgroundColor: '#c10000',
  },
  marginTop: '1em',
  alignSelf: 'flex-end',
});

export const ImportLattesButton = styled(Button)({
  backgroundColor: '#1976D2',
  ':hover': {
    backgroundColor: '#1565C0',
  },
});

export const DataDiv = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  maxWidth: 800,
  width: '100%',
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