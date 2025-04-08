import { Avatar, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { RomanNumbers } from '../../types/enums';
import { ProfessorHr } from '../../types/HRProfessor.d';
import { getProfessorLinks } from '../../utils/getProfessorLinks';
import LinkItem from './LinkItem';
import MenuItem, { MenuItemProps } from './MenuItem';

interface SideMenuProps {
  menuOptions: MenuItemProps[];
  professor: ProfessorHr | null;
  alias: string;
}

export default function SideMenu({ professor, alias, menuOptions }: SideMenuProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!professor) {
    return null;
  }

  const professorLinks = getProfessorLinks(professor);
  const positionLevel = Number(professor.positionName.split(' ').pop()) ?? null;
  const positionName = positionLevel
    ? professor.positionName.replace(positionLevel.toString(), RomanNumbers[positionLevel as keyof typeof RomanNumbers])
    : professor.positionName;

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Avatar
        onLoad={() => setImageLoaded(true)}
        src={professor.imageUrl}
        alt={`Foto de perfil de ${professor.name}`}
        sx={{ width: '7rem', height: '7rem', borderRadius: '0.5rem', backgroundcolor: 'gray', color: 'white' }}
      >
        {!imageLoaded && alias}
      </Avatar>
      <Typography variant='subtitle1' fontWeight={500}>
        {professor.name}
      </Typography>
      <Typography variant='subtitle2' color={professor.rolesDescription.length > 0 ? 'gray' : '#e7000b'}>
        {positionName}
      </Typography>
      <Typography variant='subtitle2' color='#e7000b'>
        {professor.rolesDescription[0]}
      </Typography>

      <Box display='flex' gap={1}>
        {professorLinks.map(link => (
          <LinkItem to={link.href} key={link.href}>
            {link.icon}
          </LinkItem>
        ))}
      </Box>

      {menuOptions.map(option => (
        <MenuItem href={option.href} title={option.title} key={option.href} />
      ))}
    </Box>
  );
}
