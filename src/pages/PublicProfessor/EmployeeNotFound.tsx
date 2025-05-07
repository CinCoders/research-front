import { PersonOff } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function EmployeeNotFound() {
  const { alias } = useParams();

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <PersonOff sx={{ fontSize: 80, color: 'grey.500', mb: 2 }} />
      <Typography variant='h4' gutterBottom>
        {`"${alias}" não encontrado`}
      </Typography>
      <Typography variant='body1' color='text.secondary' sx={{ mb: 3 }}>
        Não foi possível encontrar informações para staff solicitado.
      </Typography>
    </div>
  );
}
