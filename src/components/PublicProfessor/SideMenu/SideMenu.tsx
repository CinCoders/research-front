import { Avatar, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { RomanNumbers } from '../../../types/enums';
import { ProfessorHr } from '../../../types/HRProfessor.d';
import { getMenuOptions, PublicProfessorContext } from '../../../types/PublicProfessor.d';
import { getProfessorLinks } from '../../../utils/getProfessorLinks';
import LinkItem from '../LinkItem';
import MenuItem from '../MenuItem';
import { SideMenuSkeleton } from './SideMenuSkeleton';

interface SideMenuProps {
  context: PublicProfessorContext;
  professor: ProfessorHr | null;
  isLoading: boolean;
  alias: string | undefined;
}

export default function SideMenu({
  professor,
  context: { patents, projects, publications, supervisions },
  alias,
  isLoading,
}: SideMenuProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (isLoading || !alias) return <SideMenuSkeleton />;

  const menuOptions = getMenuOptions({
    patents,
    projects,
    publications,
    supervisions,
  });

  if (!professor) {
    return null;
  }

  const professorLinks = getProfessorLinks(professor);
  const positionLevel = Number(professor.positionName.split(' ').pop()) ?? null;
  const positionName = positionLevel
    ? professor.positionName.replace(positionLevel.toString(), RomanNumbers[positionLevel as keyof typeof RomanNumbers])
    : professor.positionName;

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
          sx={{ width: '7rem', height: '7rem', borderRadius: '0.5rem', backgroundcolor: 'gray', color: 'white' }}
        >
          {!imageLoaded && alias}
        </Avatar>

        <Box display='flex' flexDirection='column' gap='0.5rem' justifyContent='space-between'>
          <Box>
            <Typography variant='subtitle1' fontWeight={500}>
              {professor.name}
            </Typography>
            <Typography variant='subtitle2' color={professor.rolesDescription.length > 0 ? 'gray' : '#e7000b'}>
              {positionName}
            </Typography>
            <Typography variant='subtitle2' color='#e7000b'>
              {professor.rolesDescription[0]}
            </Typography>
          </Box>

          <Box display='flex' gap={1}>
            {professorLinks.map(link => (
              <LinkItem to={link.href} key={link.href}>
                {link.icon}
              </LinkItem>
            ))}
          </Box>
        </Box>
      </Box>

      <Box display={{ xs: 'none', md: 'flex' }} flexDirection='column'>
        {menuOptions.map(option => (
          <MenuItem {...option} key={option.href} />
        ))}
      </Box>
    </Box>
  );
}
