import { useNavbar } from '@cincoders/cinnamon';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import predio from '../../assets/predio.png';

function Home() {
  const navbar = useNavbar();
  useEffect(() => {
    navbar?.setTitle('Research Dashboard');
  }, [navbar]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'left',
          textAlign: 'left',
          padding: '2em',
          fontSize: '1.5em',
        }}
      >
        <p>
          O &quot;Research Dashboard&quot;, sistema desenvolvido pelo Centro de Informática (CIn) da UFPE, apresenta
          alguns indicadores extraídos a partir dos Currículos Lattes dos Professores. Estão disponíveis indicadores
          ligados a publicações, projetos de pesquisa e alunos orientados. Os indicadores são sempre apresentados na
          visão geral e na visão por professor.
        </p>
      </Box>
      <Box
        sx={{
          marginTop: '2em',
          display: 'flex',
          float: 'right',
        }}
      >
        <img src={predio} alt='Fachada do CIn' width='500px' height='500px' />
      </Box>
    </Box>
  );
}

export default Home;
