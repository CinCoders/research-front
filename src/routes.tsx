import { ForbiddenPage } from '@cincoders/cinnamon';
import { useAuth } from 'react-oidc-context';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageCin from './components/PageCin';
import LinksList from './components/PublicProfessor/Links/LinksList';
import PatentsList from './components/PublicProfessor/Patents/PatentsList';
import ProjectsList from './components/PublicProfessor/Projects/ProjectsList';
import PublicationList from './components/PublicProfessor/Publications/PublicationsList';
import SupervisionsList from './components/PublicProfessor/Supervisions/SupervisionsList';
import Home from './pages/Home/index';
import ImportXml from './pages/ImportXml';
import PatentsPage from './pages/Patents/Patents';
import ProfessorPatentsPage from './pages/Patents/ProfessorPatents';
import ProfessorInfo from './pages/Professor';
import ProfessorsListPage from './pages/ProfessorsList';
import ProfessorProjectsPage from './pages/Projects/ProfessorProjects';
import ProjectsPage from './pages/Projects/Projects';
import ProfessorPublicationsPage from './pages/Publications/ProfessorPublications';
import PublicationsPage from './pages/Publications/Publications';
import PublicProfessor from './pages/PublicProfessor';
import QualisPage from './pages/Qualis';
import ProfessorStudentsPage from './pages/Students/ProfessorStudents';
import StudentsPage from './pages/Students/Students';
import apiBack from './services/api';
import { Links, Roles } from './types/enums';

function RoutesApp() {
  const auth = useAuth();

  if (auth.isAuthenticated && auth.user) {
    apiBack.defaults.headers.common.Authorization = `Bearer ${auth.user.access_token}`;
  } else apiBack.defaults.headers.common.Authorization = '';

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageCin auth={auth} permittedRoles={['*']} />}>
          <Route path={Links.FORBIDDEN} element={<ForbiddenPage auth={auth} />} />
        </Route>

        <Route path={Links.PUBLIC_PROFESSOR_PUBLICATIONS} element={<PublicProfessor />}>
          <Route path='' element={<PublicationList />} />
          <Route path={Links.PUBLIC_PROFESSOR_PROJECTS} element={<ProjectsList />} />
          <Route path={Links.PUBLIC_PROFESSOR_SUPERVISIONS} element={<SupervisionsList />} />
          <Route path={Links.PUBLIC_PROFESSOR_PATENTS} element={<PatentsList />} />
          <Route path={Links.PUBLIC_PROFESSOR_LINKS} element={<LinksList />} />
        </Route>

        <Route element={<PageCin auth={auth} permittedRoles={[Roles.USERS]} />}>
          <Route path={Links.HOME} element={<Home />} />
          <Route path={Links.IMPORT_XML} element={<ImportXml />} />
          <Route path={Links.PUBLICATIONS} element={<PublicationsPage />} />
          <Route path={Links.PROFESSOR_PUBLICATIONS} element={<ProfessorPublicationsPage />} />
          <Route path={Links.PROFESSORS_LIST} element={<ProfessorsListPage />} />
          <Route path={Links.PROJECTS} element={<ProjectsPage />} />
          <Route path={Links.PROFESSOR_PROJECTS} element={<ProfessorProjectsPage />} />
          <Route path={Links.PATENTS} element={<PatentsPage />} />
          <Route path={Links.PROFESSOR_PATENTS} element={<ProfessorPatentsPage />} />
          <Route path={Links.STUDENTS} element={<StudentsPage />} />
          <Route path={Links.PROFESSOR_STUDENTS} element={<ProfessorStudentsPage />} />
          <Route path={Links.QUALIS} element={<QualisPage />} />
          <Route path={Links.PROFESSOR_INFO} element={<ProfessorInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
