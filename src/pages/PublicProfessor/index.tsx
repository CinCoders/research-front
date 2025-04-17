import { toast, ToastContainer } from '@cincoders/cinnamon';
import { ArrowLeftOutlined, PersonOff } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import MobileMenu from '../../components/PublicProfessor/MobileMenu';
import PublicationItem from '../../components/PublicProfessor/Publications/PublicationItem';
import SideMenu from '../../components/PublicProfessor/SideMenu/SideMenu';
import HumanResourcesService from '../../services/HumanResourcesService';
import { PatentService } from '../../services/PatentService';
import { ProjectsService } from '../../services/ProjectsService';
import { PublicationsService } from '../../services/PublicationsService';
import { StudentsService } from '../../services/StudentsService';
import { ProfessorHr } from '../../types/HRProfessor.d';
import { ProfessorPatents } from '../../types/Patents.d';
import { ProfessorProjects } from '../../types/Projects.d';
import { ProfessorPublications } from '../../types/Publications.d';
import { PublicProfessorContext } from '../../types/PublicProfessor.d';
import { ProfessorStudents } from '../../types/Students.d';
import ScrollButtons from '../../utils/ScrollButtons';

export default function PublicProfessor() {
  const navigate = useNavigate();
  // const { pathname } = useLocation();
  const { alias } = useParams();

  const [professor, setProfessor] = useState<ProfessorHr | null>(null);
  const [professorIsLoading, setProfessorIsLoading] = useState(true);
  const [professorNotFound, setProfessorNotFound] = useState(false);
  const [professorPublications, setProfessorPublications] = useState<ProfessorPublications[] | null>(null);
  const [professorProjects, setProfessorProjects] = useState<ProfessorProjects[] | null>(null);
  const [lattesCode, setLattesCode] = useState<string | null>(null);
  const [professorPatents, setProfessorPatents] = useState<ProfessorPatents[] | null>(null);
  const [professorStudents, setProfessorStudents] = useState<ProfessorStudents[] | null>(null);

  useEffect(() => {
    const fetchProfessor = async () => {
      try {
        if (!alias) {
          throw new Error('Professor não especificado');
        }

        const { data: professorHr } = await HumanResourcesService.getProfessorByAlias(alias);

        if (!professorHr || professorHr.length === 0) {
          setProfessorNotFound(true);
        }

        setLattesCode(professorHr[0].lattesCode);

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
        setProfessorIsLoading(false);
      }
    };

    fetchProfessor();
  }, [alias]);

  useEffect(() => {
    if (professor && lattesCode) {
      const fetchProfessorContributions = async () => {
        try {
          const publicationsPromise = PublicationsService.getProfessorPublications(null, lattesCode, true, true);
          const projectsPromise = ProjectsService.getProfessorProjects(undefined, lattesCode);
          const patentsPromise = PatentService.getProfessorPatents(undefined, lattesCode);
          const studentsPromise = StudentsService.getProfessorStudents(false, undefined, lattesCode);

          publicationsPromise.then(({ data }) => {
            setProfessorPublications(data);
          });

          projectsPromise.then(({ data }) => {
            setProfessorProjects(data);
          });

          patentsPromise.then(({ data }) => {
            setProfessorPatents(data);
          });

          studentsPromise.then(({ data }) => {
            setProfessorStudents(data);
          });
        } catch (error) {
          toast.error('Ocorreu um erro ao carregar as contribuições. Tente novamente mais tarde.', {
            autoClose: 2000,
          });
        }
      };

      fetchProfessorContributions();
    }
  }, [professor]);

  if (professorNotFound) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '20px',
        }}
      >
        <PersonOff sx={{ fontSize: 80, color: 'grey.500', mb: 2 }} />
        <Typography variant='h4' gutterBottom>
          Nenhum professor encontrado
        </Typography>
        <Typography variant='body1' color='text.secondary' sx={{ mb: 3 }}>
          Não foi possível encontrar informações para o professor solicitado.
        </Typography>
        <Button
          variant='outlined'
          startIcon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          sx={{ borderColor: 'error.main', color: 'error.main' }}
        >
          Voltar
        </Button>
      </div>
    );
  }

  // const currentTitle = menuOptions.find(option => {
  //   const normalizedPathname = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  //   return option.href.replace(':alias', alias || '') === normalizedPathname;
  // })?.title;

  const context = {
    publications: professorPublications,
    projects: professorProjects,
    patents: professorPatents,
    supervisions: professorStudents,
  } as PublicProfessorContext;

  return (
    <>
      <ToastContainer
        toastProps={{
          position: 'top-right',
          enableMultiContainer: true,
          containerId: 'page',
        }}
        topInitialPosition={64}
      />

      <Grid
        container
        spacing={2}
        columnGap={2}
        width='100vw'
        maxWidth='1200px'
        height='100%'
        minHeight='100vh'
        mt={4}
        marginX='auto'
        display='flex'
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent='start'
        alignItems='start'
      >
        <Grid xs={12} md={3} sx={{ height: 'min-content' }}>
          <SideMenu isLoading={professorIsLoading} context={context} professor={professor} alias={alias} />
        </Grid>
        <Grid
          xs={12}
          md={8}
          display={{ xs: 'none', md: 'flex' }}
          flexDirection='column'
          gap={4}
          sx={{ height: '100%' }}
        >
          <Outlet context={context} />
        </Grid>

        {/* MOBILE */}
        <Grid xs={12} display={{ xs: 'flex', md: 'none' }} flexDirection='column' gap={4} sx={{ height: '100%' }}>
          <MobileMenu
            options={[{ Card: PublicationItem, dataType: 'publications', title: 'Publicações' }]}
            data={context}
          />
        </Grid>
      </Grid>

      <ScrollButtons />
    </>
  );
}
