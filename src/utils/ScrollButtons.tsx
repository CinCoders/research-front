import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Fab, Zoom } from '@mui/material';
import { useEffect, useState } from 'react';

export default function ScrollButtons() {
  const [showUp, setShowUp] = useState(false);
  const [showDown, setShowDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollBottom = window.innerHeight + window.scrollY;
      const documentHeight = document.body.scrollHeight;

      setShowUp(scrollTop > 200);
      setShowDown(scrollBottom < documentHeight - 200);
    };

    handleScroll(); // verificar na primeira renderização
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        zIndex: 1000,
      }}
    >
      <Zoom in={showUp}>
        <Fab
          sx={{
            background: 'red',
            color: 'white',
            '&:hover': {
              background: '#c92918',
            },
          }}
          color='inherit'
          size='medium'
          onClick={scrollToTop}
          aria-label='Voltar ao topo'
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>
      <Zoom in={showDown}>
        <Fab
          sx={{
            background: 'red',
            color: 'white',
            '&:hover': {
              background: '#c92918',
            },
          }}
          color='inherit'
          size='medium'
          onClick={scrollToBottom}
          aria-label='Descer até o fim'
        >
          <KeyboardArrowDownIcon />
        </Fab>
      </Zoom>
    </Box>
  );
}
