import { Email, GitHub, Instagram, LinkedIn, Twitter, YouTube } from '@mui/icons-material';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { Avatar, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { ProfessorHr } from '../../types/HRProfessor.d';
import LinkItem from './LinkItem';
import MenuItem, { MenuItemProps } from './MenuItem';

interface SideMenuProps {
  menuOptions: MenuItemProps[];
  professor: ProfessorHr | null;
  id: string;
}

export default function SideMenu({ professor, id, menuOptions }: SideMenuProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const links: { href: string; icon: JSX.Element }[] = [
    { href: '', icon: <GitHub /> },
    { href: '', icon: <LinkedIn /> },
    { href: '', icon: <Twitter /> },
    { href: '', icon: <YouTube /> },
    { href: '', icon: <Instagram /> },
    { href: professor ? `mailto:${professor.email}` : '', icon: <Email /> },
    { href: professor?.website ?? '', icon: <LanguageOutlinedIcon /> },
  ];

  if (!professor) {
    return null;
  }

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Avatar
        onLoad={() => setImageLoaded(true)}
        src={professor.imageUrl}
        alt={`Foto de perfil de ${professor.name}`}
        sx={{ width: '7rem', height: '7rem', borderRadius: '0.5rem', backgroundcolor: 'gray', color: 'white' }}
      >
        {!imageLoaded && id}
      </Avatar>
      <Typography variant='subtitle1' fontWeight={500}>
        {professor.name}
      </Typography>
      <Typography variant='subtitle2' color='gray'>
        {professor.positionName}
      </Typography>
      <Typography variant='subtitle2' color='#e7000b'>
        {professor.rolesDescription[0]}
      </Typography>

      <Box display='flex' gap={1}>
        {links.map(link => (
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
