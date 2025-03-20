import { Box, Typography } from '@mui/material';
import { ProfessorStudents } from '../../../types/Students.d';

export default function SupervisionItem({ degree, name, type, yearEnd, yearStart }: ProfessorStudents) {
  return (
    <Box width='100%' display='flex' flexDirection='column'>
      <Typography variant='h6'>{name}</Typography>
      <Typography variant='subtitle2' sx={{ textDecorationLine: 'underline' }}>
        {degree}
      </Typography>
      <Box display='flex' justifyContent='space-between' alignItems='center' width='100%'>
        <Typography variant='overline' fontSize='0.75rem'>
          {type}
        </Typography>
        <Typography variant='overline' fontSize='0.75rem'>
          {/* // eslint-disable-next-line react/jsx-one-expression-per-line */}
          {yearStart && `Iniciou em ${yearStart}`}
          {yearEnd && `Terminou em ${yearEnd}`}
        </Typography>
      </Box>
    </Box>
  );
}
