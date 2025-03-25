import { Box, Typography } from '@mui/material';
import { ProfessorProjects } from '../../../types/Projects.d';

const FINANCIERS = {
  cnpq: 'CNPQ',
  facepe: 'FACEPE',
  capes: 'CAPES',
  other: 'Outros financiadores',
};

export default function ProjectItem({
  anotherFinanciers,
  capesProject,
  cnpqProject,
  facepeProject,
  inProgress,
  name,
  year,
}: ProfessorProjects) {
  const financiers = [
    cnpqProject && FINANCIERS.cnpq,
    facepeProject && FINANCIERS.facepe,
    capesProject && FINANCIERS.capes,
    anotherFinanciers && FINANCIERS.other,
  ].filter(Boolean);

  return (
    <Box width='100%' display='flex' flexDirection='column'>
      <Box display='flex' justifyContent='space-between' alignItems='center' width='100%'>
        <Typography variant='subtitle2'>{year}</Typography>
        <Typography variant='subtitle2' sx={{ color: inProgress ? '#008b35' : 'black' }}>
          {inProgress ? 'Em progresso' : 'Concluído'}
        </Typography>
      </Box>
      <Typography variant='h6'>{name}</Typography>
      {financiers.length > 0 && (
        <Typography variant='overline' fontSize='0.75rem'>
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          Apoio -{' '}
          {financiers.length === 1
            ? financiers[0]
            : `${financiers.slice(0, -1).join(', ')} e ${financiers[financiers.length - 1]}`}
        </Typography>
      )}
    </Box>
  );
}
