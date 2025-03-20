import { Box, Typography } from '@mui/material';
import { ProfessorProjects } from '../../../types/Projects.d';

interface ProjectItemProps {
  project: ProfessorProjects;
}

const FINANCIERS = {
  cnpq: 'CNPQ',
  facepe: 'FACEPE',
  capes: 'CAPES',
  other: 'Outros financiadores',
};

export default function ProjectItem({ project }: ProjectItemProps) {
  const financiers = [
    project.cnpqProject && FINANCIERS.cnpq,
    project.facepeProject && FINANCIERS.facepe,
    project.capesProject && FINANCIERS.capes,
    project.anotherFinanciers && FINANCIERS.other,
  ].filter(Boolean);

  return (
    <Box width='100%' display='flex' flexDirection='column'>
      <Box display='flex' justifyContent='space-between' alignItems='center' width='100%'>
        <Typography variant='subtitle2'>{project.year}</Typography>
        <Typography variant='subtitle2' sx={{ color: project.inProgress ? '#008b35' : 'black' }}>
          {project.inProgress ? 'Em progresso' : 'Concluído'}
        </Typography>
      </Box>
      <Typography variant='h6'>{project.name}</Typography>
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
