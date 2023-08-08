import { styled, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export const TableDiv = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: '1',
  width: '100%',
  minHeight: '300px',
  height: '100%',
  margin: 'auto',
  borderRadius: '1.2rem',
  boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.1)',
  backgroundColor: 'var(--color-box-base)',
  '.MuiDataGrid-root': {
    boxShadow: '0px 4px 6px rgb(0 0 0 / 10%)',
    borderRadius: '1rem',
    fontSize: '0.78rem',
    letterSpacing: '0.017rem',
  },
  '.MuiDataGrid-windowContainer': {
    color: '#2E3B52',
  },
  '.MuiDataGrid-toolbarContainer': {
    marginRight: '1rem',
    marginBottom: '0.2rem',
  },
  '.MuiDataGrid-toolbarContainer button': {
    color: '#2E3B52',
  },
});

export const GridContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: '1',
});

export const ProfessorGrid = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: '1',
  height: '100%',
  width: '100%',
});

export const ProfessorsGrid = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: '1',
  width: '100%',
});

export const MainGrid = styled(DataGrid)({
  '.MuiDataGrid-columnHeaderTitle': {
    color: '#2E3B52',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export const ProfessorDiv = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: '1',
  width: '100%',
});
