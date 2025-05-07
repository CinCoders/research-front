import { toast, ToastContainer } from '@cincoders/cinnamon';
import { ArrowLeftOutlined, PersonOff } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { MenuItemProps } from '../../components/PublicProfessor/MenuItem';
import SideMenu from '../../components/PublicProfessor/SideMenu/SideMenu';
import HumanResourcesService from '../../services/HumanResourcesService';
import { PatentService } from '../../services/PatentService';
import { ProjectsService } from '../../services/ProjectsService';
import { PublicationsService } from '../../services/PublicationsService';
import { StudentsService } from '../../services/StudentsService';
import { Links } from '../../types/enums';
import { ProfessorHr } from '../../types/HRProfessor.d';
import { ProfessorPatents } from '../../types/Patents.d';
import { ProfessorProjects } from '../../types/Projects.d';
import { ProfessorPublications } from '../../types/Publications.d';
import { ProfessorStudents } from '../../types/Students.d';

export type PublicProfessorOutlet = {
  publications?: ProfessorPublications[];
  projects?: ProfessorProjects[];
  patents?: ProfessorPatents[];
  supervisions?: ProfessorStudents[];
};

export default function PublicProfessor() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
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

  const menuOptions: MenuItemProps[] = [
    {
      href: Links.PUBLIC_PROFESSOR_PUBLICATIONS,
      title: 'Publicações',
      active: !!professorPublications && professorPublications.length > 0,
      isLoading: professorPublications == null,
    },
    {
      href: Links.PUBLIC_PROFESSOR_PROJECTS,
      title: 'Projetos',
      active: !!professorProjects && professorProjects.length > 0,
      isLoading: professorProjects == null,
    },
    {
      href: Links.PUBLIC_PROFESSOR_PATENTS,
      title: 'Patentes',
      active: !!professorPatents && professorPatents.length > 0,
      isLoading: professorPatents == null,
    },
    {
      href: Links.PUBLIC_PROFESSOR_SUPERVISIONS,
      title: 'Orientações Acadêmicas',
      active: !!professorStudents && professorStudents.length > 0,
      isLoading: professorStudents == null,
    },
  ];

  const currentTitle = menuOptions.find(option => {
    const normalizedPathname = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
    return option.href.replace(':alias', alias || '') === normalizedPathname;
  })?.title;

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
      >
        <Grid xs={12} md={3}>
          <SideMenu isLoading={professorIsLoading} menuOptions={menuOptions} professor={professor} alias={alias} />
        </Grid>
        <Grid xs={12} md={8} display='flex' flexDirection='column' gap={4}>
          <Typography variant='h4' fontWeight={500}>
            {currentTitle}
          </Typography>
          <Outlet
            context={
              {
                publications: professorPublications,
                projects: professorProjects,
                patents: professorPatents,
                supervisions: professorStudents,
              } as PublicProfessorOutlet
            }
          />
        </Grid>
      </Grid>
    </>
  );
}
