import { Box, styled } from '@mui/material';

export const FieldValue = styled(Box)({
  minWidth: '150px',
});

export const LattesValues = styled(Box)({
  '@media(min-width: 1024px)': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: '2em',
  },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100px',
});

export const Field = styled(Box)({
  display: 'flex',
});

export const FieldBox = styled(Box)({
  width: '',
  display: 'flex',
  justifyContent: 'end',
});

export const DataGridBox = styled(Box)({
  marginTop: '10px',
  marginBottom: '10px',
});

export const LabelBox1 = styled(Box)({
  width: '25%',
  minWidth: '100px',
  paddingLeft: '10px',
});

export const LabelBox2 = styled(Box)({
  width: '25%',
  minWidth: '220px',
  paddingLeft: '10px',
});

export const TitleBox = styled(Box)({
  paddingLeft: '20px',
});

export const Name = styled(Box)({
  display: 'block',
  fontSize: '1.5em',
  fontWeight: 'bold',
});

export const CustomName = styled(Box)({
  '@media(min-width: 1024px)': {
    marginRight: '1rem',
    marginBottom: '0.5em',
  },
  display: 'block',
  fontSize: 'clamp(1rem, 1.1rem, 1.8rem)',
  fontWeight: 'bold',
});

export const Email = styled(Box)({
  display: 'flex',
  fontSize: '1.25em',
  fontWeight: 'bold',
  marginLeft: '5px',
  alignItems: 'center',
});

export const ProfessorDataBox = styled(Box)({
  '@media(max-width:1024px)': {
    flexDirection: 'column',
  },
  marginTop: '10px',
  pl: '10px',
  display: 'flex',
});

export const MainField = styled(Box)({
  color: '#7e7e7e',
});

export const ProfessorInfoHolder = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  '@media(min-width: 1024px)': {
    flexDirection: 'row',
  },
});

export const ProfessorInfoHeader = styled(Box)({
  '@media(min-width: 1024px)': {
    justifyContent: 'normal',
  },
  display: 'flex',
  marginBottom: '10px',
  justifyContent: 'center',
});

export const LinksWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'space-around',
});
