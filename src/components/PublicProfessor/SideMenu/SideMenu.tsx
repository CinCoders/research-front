import { Avatar, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { RomanNumbers } from '../../../types/enums';
import { ProfessorHr } from '../../../types/HRProfessor.d';
import { getProfessorLinks } from '../../../utils/getProfessorLinks';
import EmployeeContact from './EmployeeContact';
import EmployeeLinks from './EmployeeLinks';
import ResearchAreas from './ResearchAreas';
import { SideMenuSkeleton } from './SideMenuSkeleton';

const getRoleLevel = (role: string): number => {
  const levels = [
    { keyword: 'DIRETOR', level: 3 },
    { keyword: 'CHEFE', level: 2 },
    { keyword: 'COORDENADOR', level: 1 },
  ];

  const upperRole = role.toUpperCase();

  return levels.find(({ keyword }) => upperRole.includes(keyword))?.level ?? 0;
};

interface SideMenuProps {
  professor: ProfessorHr | null;
  isLoading: boolean;
  alias: string | undefined;
}

export default function SideMenu({ professor, alias, isLoading }: SideMenuProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (isLoading || !alias) return <SideMenuSkeleton />;

  if (!professor) {
    return null;
  }

  const professorLinks = getProfessorLinks(professor);
  const positionLevel = Number(professor.positionName.split(' ').pop()) ?? null;
  const positionName = positionLevel
    ? professor.positionName.replace(positionLevel.toString(), RomanNumbers[positionLevel as keyof typeof RomanNumbers])
    : professor.positionName;

  const rolesWithLevel = professor.rolesDescription
    .map(role => ({ role, level: getRoleLevel(role) }))
    .sort((a, b) => b.level - a.level);

  const mainRole = rolesWithLevel[0]?.role || '';

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'start' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'row', md: 'column' },
          justifyContent: 'center',
          gap: { xs: '1rem', md: '0.5rem' },
        }}
      >
        <Avatar
          onLoad={() => setImageLoaded(true)}
          src={professor.imageUrl}
          alt={`Foto de perfil de ${professor.name}`}
          sx={{ width: '6rem', height: '6rem', borderRadius: '0.5rem', backgroundcolor: 'gray', color: 'white' }}
        >
          {!imageLoaded && alias}
        </Avatar>

        <Box>
          <Typography variant='subtitle1' fontWeight={500}>
            {professor.name}
          </Typography>
          <Typography variant='subtitle2' color={professor.rolesDescription.length > 0 ? '#474747' : '#e7000b'}>
            {positionName}
          </Typography>
          <Typography variant='subtitle2' color='#e7000b'>
            {mainRole}
          </Typography>
        </Box>
      </Box>

      <ResearchAreas researchAreas={professor?.researchAreasName} isLoading={isLoading} />

      <Box>
        {rolesWithLevel.slice(1).map(({ role }) => (
          <Typography
            variant='subtitle2'
            color='gray'
            sx={{
              transform: 'translateX(0.4rem)',
            }}
          >
            {`• ${role}`}
          </Typography>
        ))}
      </Box>

      <EmployeeLinks links={professorLinks} />
      <EmployeeContact {...professor} />
    </Box>
  );
}
