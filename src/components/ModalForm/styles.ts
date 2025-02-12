import { Box, styled } from '@mui/material';

export const ModalStyled = styled(Box)({
  position: 'absolute',
  borderRadius: '3px',
  outline: 0,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  maxHeight: 453,
  backgroundColor: 'white',
  padding: '0px 32px 32px 32px',
});

export const FooterStyled = styled(Box)({
  width: '112%',
  hr: {
    position: 'relative',
    border: '1px solid #ebecf0',
    maxWidth: 660,
    left: '-2.2em',
  },
});
