import { Box, Typography } from '@mui/material';
import { ProfessorStudents, StudentDegrees } from '../../../types/Students.d';

export default function SupervisionItem({ degree, name, type, yearEnd, yearStart }: ProfessorStudents) {
  return (
    <Box width='100%' display='flex' flexDirection='column'>
      <Typography variant='h6'>{name}</Typography>
      <Typography variant='subtitle2' sx={{ textDecorationLine: 'underline', textTransform: 'capitalize' }}>
        {StudentDegrees[degree.toUpperCase() as keyof typeof StudentDegrees]}
      </Typography>
      <Box display='flex' justifyContent='space-between' alignItems='center' width='100%'>
        <Typography variant='overline' fontSize='0.75rem'>
          {type}
        </Typography>
        <Typography variant='overline' fontSize='0.75rem'>
          <span>{yearStart && `Iniciou em ${yearStart}`}</span>
          <span>{yearEnd && `Terminou em ${yearEnd}`}</span>
        </Typography>
      </Box>
    </Box>
  );
}
