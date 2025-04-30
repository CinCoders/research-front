import { toast, ToastContainer } from '@cincoders/cinnamon';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import MobileMenu from '../../components/PublicProfessor/MobileMenu';
import PatentItem from '../../components/PublicProfessor/Patents/PatentItem';
import ProjectItem from '../../components/PublicProfessor/Projects/ProjectItem';
import PublicationItem from '../../components/PublicProfessor/Publications/PublicationItem';
import SideMenu from '../../components/PublicProfessor/SideMenu/SideMenu';
import SupervisionItem from '../../components/PublicProfessor/Supervisions/SupervisionItem';
import VerticalNavbar from '../../components/PublicProfessor/VerticalNavbar';
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
import EmployeeNotFound from './EmployeeNotFound';

export default function PublicProfessor() {
  const { alias } = useParams();

  const [professor, setProfessor] = useState<ProfessorHr | null>(null);
  const [isTechinician, setIsTechnician] = useState(false);
  const [professorIsLoading, setProfessorIsLoading] = useState(true);
  const [professorDetailsIsLoading, setProfessorDetailsIsLoading] = useState(true);
  const [professorDetailsIsError, setProfessorDetailsIsError] = useState(false);
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
          return;
        }

        setLattesCode(professorHr[0].lattesCode);
        setIsTechnician(professorHr[0].position.category.toLowerCase() !== 'professor');

        setProfessor({
          ...professorHr[0],
          positionName: professorHr[0].position.name,
          researchAreasName: professorHr[0].researchAreas.map(area => area.name),
          rolesDescription: professorHr[0].employeeRoles.map(role => role.description),
          links: professorHr[0].employeeLinks.map(link => link.url),
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : null;
        toast.error(`Não foi possível encontrar informações para: ${alias}. ${errorMessage}.`, {
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
          setProfessorDetailsIsError(true);
          toast.error('Ocorreu um erro ao carregar as contribuições. Tente novamente mais tarde.', {
            autoClose: 2000,
          });
        } finally {
          setProfessorDetailsIsLoading(false);
        }
      };

      fetchProfessorContributions();
    }
  }, [professor]);

  if (professorNotFound) return <EmployeeNotFound />;

  const context = {
    publications: professorPublications,
    projects: professorProjects,
    patents: professorPatents,
    supervisions: professorStudents,
    isLoading: professorDetailsIsLoading,
    isError: professorDetailsIsError,
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
        <Grid
          xs={12}
          md={3}
          maxWidth={isTechinician ? '45%' : '100%'}
          sx={{ height: 'min-content' }}
          display='flex'
          flexDirection='column'
          gap={4}
        >
          <SideMenu isLoading={professorIsLoading} professor={professor} alias={alias} />
          {!isTechinician && <VerticalNavbar professorData={context} />}
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
            options={[
              { Card: PublicationItem, dataType: 'publications', title: 'Publicações' },
              { Card: PatentItem, dataType: 'patents', title: 'Patentes' },
              { Card: ProjectItem, dataType: 'projects', title: 'Projetos' },
              { Card: SupervisionItem, dataType: 'supervisions', title: 'Orientações Acadêmicas' },
            ]}
            data={context}
          />
        </Grid>
      </Grid>

      <ScrollButtons />
    </>
  );
}
