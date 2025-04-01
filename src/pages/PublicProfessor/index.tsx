import { toast } from '@cincoders/cinnamon';
import { ArrowLeftOutlined } from '@mui/icons-material';
import { Button, CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { MenuItemProps } from '../../components/PublicProfessor/MenuItem';
import SideMenu from '../../components/PublicProfessor/SideMenu';
import HumanResourcesService from '../../services/HumanResourcesService';
import { Links } from '../../types/enums';
import { ProfessorHr } from '../../types/HRProfessor.d';
import { storeUserLattes } from '../../utils/storeUserLattes';

const menuOptions: MenuItemProps[] = [
  { href: Links.PUBLIC_PROFESSOR_PUBLICATIONS, title: 'Publicações' },
  { href: Links.PUBLIC_PROFESSOR_PROJECTS, title: 'Projetos' },
  { href: Links.PUBLIC_PROFESSOR_PATENTS, title: 'Patentes' },
  { href: Links.PUBLIC_PROFESSOR_SUPERVISIONS, title: 'Orientações Acadêmicas' },
];

export default function PublicProfessor() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useParams();

  const [professor, setProfessor] = useState<ProfessorHr | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfessor = async () => {
      try {
        if (!user) {
          throw new Error('Professor não específicado');
        }

        const { data: professorHr } = await HumanResourcesService.getProfessorByUser(user);

        if (!professorHr) {
          throw new Error('Professor não encontrado');
        }

        storeUserLattes(user, professorHr[0].lattesCode);

        setProfessor({
          ...professorHr[0],
          positionName: professorHr[0].position.name,
          researchAreasName: professorHr[0].researchAreas.map(area => area.name),
          rolesDescription: professorHr[0].employeeRoles.map(role => role.description),
          links: professorHr[0].employeeLinks.map(link => link.url),
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : null;
        toast.error(`Não foi possível carregar as informações do professor ${errorMessage}.`, {
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfessor();
  }, [user]);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (!user) {
    return (
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <h1>Nenhum professor informado</h1>
        <Button
          variant='outlined'
          startIcon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          style={{ marginBottom: 20, borderColor: 'red', color: 'red' }}
        >
          Voltar
        </Button>
      </div>
    );
  }

  const currentTitle = menuOptions.find(option => {
    const normalizedPathname = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
    return option.href.replace(':user', user) === normalizedPathname;
  })?.title;

  return (
    <Grid container spacing={2} columnGap={2} width='100%' maxWidth='1200px' height='100%' minHeight='100vh' mt={4}>
      <Grid xs={3}>
        <SideMenu menuOptions={menuOptions} professor={professor} id={user} />
      </Grid>
      <Grid xs={8} display='flex' flexDirection='column' gap={4}>
        <Typography variant='h4' fontWeight={500}>
          {currentTitle}
        </Typography>
        <Outlet />
      </Grid>
    </Grid>
  );
}
