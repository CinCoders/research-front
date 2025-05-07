import { Typography } from '@mui/material';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { ProfessorListProps, PublicProfessorContextKey } from '../../../types/PublicProfessor.d';

export default function NavbarItem<K extends PublicProfessorContextKey>({
  title,
  href,
  isVisible,
}: ProfessorListProps<K>) {
  const { alias } = useParams();
  const isActive = !!useMatch(href);
  const navigate = useNavigate();

  if (!alias) {
    return null;
  }

  return (
    <Typography
      component='button'
      onClick={() => navigate(href.replace(':alias', alias))}
      sx={{
        background: 'transparent',
        margin: 0,
        textAlign: 'start',
        outline: 'none',
        border: 'none',
        color: isActive ? 'red' : 'black',
        textDecoration: 'none',
        cursor: 'pointer',

        // sempre definimos estilo, largura e cor da borda
        borderLeftStyle: 'solid',
        borderLeftColor: 'red',
        borderLeftWidth: isActive ? '2px' : '0px',

        // padding-left também varia
        paddingLeft: isActive ? '8px' : '0px',

        // a transição SEMPRE existe, para entrar e sair
        transition: 'border-left-width 0.2s ease, padding-left 0.2s ease',

        '&:hover': {
          color: 'red',
        },
        display: isVisible ? 'block' : 'none',
      }}
    >
      {title}
    </Typography>
  );
}
