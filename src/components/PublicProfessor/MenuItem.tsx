import { Typography } from '@mui/material';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { Links } from '../../types/enums';

export interface MenuItemProps {
  title: string;
  href: Links;
}
export default function MenuItem({ title, href }: MenuItemProps) {
  const { user } = useParams();
  const isActive = !!useMatch(href);
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  return (
    <Typography
      component='button'
      onClick={() => navigate(href.replace(':user', user))}
      sx={{
        background: 'transparent',
        margin: 0,
        textAlign: 'start',
        outline: 'none',
        border: 'none',
        color: 'black',
        textDecoration: 'none',
        cursor: 'pointer',
        borderLeft: isActive ? '2px solid red' : 'none',
        paddingLeft: isActive ? '8px' : '0',
        transition: 'border-left 0.1s ease, padding-left 0.2s ease',
        '&:hover': {
          color: 'red',
        },
      }}
    >
      {title}
    </Typography>
  );
}
