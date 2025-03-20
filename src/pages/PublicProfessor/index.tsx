import { toast } from '@cincoders/cinnamon';
import { CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { MenuItemProps } from '../../components/PublicProfessor/MenuItem';
import SideMenu from '../../components/PublicProfessor/SideMenu';
import HumanResourcesService from '../../services/HumanResourcesService';
import { ProfessorService } from '../../services/ProfessorService';
import { Links } from '../../types/enums';
import { ProfessorHr } from '../../types/HRProfessor.d';

const menuOptions: MenuItemProps[] = [
  { href: Links.PUBLIC_PROFESSOR_PUBLICATIONS, title: 'Publicações' },
  { href: Links.PUBLIC_PROFESSOR_PROJECTS, title: 'Projetos' },
  { href: Links.PUBLIC_PROFESSOR_PATENTS, title: 'Patentes' },
  { href: Links.PUBLIC_PROFESSOR_SUPERVISIONS, title: 'Orientações Acadêmicas' },
  { href: Links.PUBLIC_PROFESSOR_LINKS, title: 'Links' },
];

export default function PublicProfessor() {
  const { pathname } = useLocation();
  const { id } = useParams();

  const [professor, setProfessor] = useState<ProfessorHr | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfessor = async () => {
      try {
        if (!id) {
          throw new Error('Professor não específicado');
        }

        const response = await ProfessorService.getProfessor(Number(id));
        const professorData = await HumanResourcesService.getProfessors(response.data.identifier);

        if (!professorData) {
          throw new Error('Professor não encontrado');
        }

        setProfessor({
          id: professorData.data[0].id,
          name: professorData.data[0].name,
          imageUrl: professorData.data[0].imageUrl,
          website: professorData.data[0].website,
          email: professorData.data[0].email,
          phone: professorData.data[0].phone,
          fax: professorData.data[0].fax,
          room: professorData.data[0].room,
          lattes: professorData.data[0].lattes,
          status: professorData.data[0].status,
          workRegime: professorData.data[0].workRegime,
          positionName: professorData.data[0].position.name,
          researchAreasName: professorData.data[0].researchAreas.map(area => area.name),
          rolesDescription: professorData.data[0].employeeRoles.map(role => role.description),
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
  }, [id]);

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

  if (!id) {
    return (
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <h1>Nenhum professor informado</h1>
        <span>Voltar</span>
      </div>
    );
  }

  if (!id) {
    return null;
  }

  const currentTitle = menuOptions.find(option => {
    const normalizedPathname = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
    return option.href.replace(':id', id) === normalizedPathname;
  })?.title;

  return (
    <Grid container spacing={2} columnGap={2} width='100%' maxWidth='1200px' height='100%' minHeight='100vh' mt={4}>
      <Grid xs={3}>
        <SideMenu menuOptions={menuOptions} professor={professor} id={id} />
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
