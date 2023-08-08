import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ForbiddenPage } from '@cincoders/cinnamon';
import { useAuth } from 'react-oidc-context';
import apiBack from './services/api';
import { Links, Roles } from './types/enums';
import Home from './pages/Home/index';
import PublicationsPage from './pages/Publications/Publications';
import ProfessorPublicationsPage from './pages/Publications/ProfessorPublications';
import StudentsPage from './pages/Students/Students';
import ProfessorStudentsPage from './pages/Students/ProfessorStudents';
import ProjectsPage from './pages/Projects/Projects';
import ProfessorProjectsPage from './pages/Projects/ProfessorProjects';
import ProfessorsListPage from './pages/ProfessorsList';
import QualisPage from './pages/Qualis';
import ImportXml from './pages/ImportXml';
import ProfessorInfo from './pages/Professor';
import PageCin from './components/PageCin';

function RoutesApp() {
  const auth = useAuth();

  if (auth.isAuthenticated && auth.user) {
    apiBack.defaults.headers.common.Authorization = `Bearer ${auth.user.access_token}`;
  } else apiBack.defaults.headers.common.Authorization = '';

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={Links.FORBIDDEN}
          element={
            <PageCin auth={auth} permittedRoles={['*']}>
              <ForbiddenPage auth={auth} />
            </PageCin>
          }
        />
        <Route
          path={Links.HOME}
          element={
            <PageCin auth={auth} permittedRoles={[Roles.USERS]}>
              <Home />
            </PageCin>
          }
        />
        <Route
          path={Links.IMPORT_XML}
          element={
            <PageCin auth={auth} permittedRoles={[Roles.USERS]}>
              <ImportXml />
            </PageCin>
          }
        />
        <Route
          path={Links.PUBLICATIONS}
          element={
            <PageCin auth={auth} permittedRoles={[Roles.USERS]}>
              <PublicationsPage />
            </PageCin>
          }
        />
        <Route
          path={Links.PROFESSOR_PUBLICATIONS}
          element={
            <PageCin auth={auth} permittedRoles={[Roles.USERS]}>
              <ProfessorPublicationsPage />
            </PageCin>
          }
        />
        <Route
          path={Links.PROFESSORS_LIST}
          element={
            <PageCin auth={auth} permittedRoles={[Roles.USERS]}>
              <ProfessorsListPage />
            </PageCin>
          }
        />
        <Route
          path={Links.PROJECTS}
          element={
            <PageCin auth={auth} permittedRoles={[Roles.USERS]}>
              <ProjectsPage />
            </PageCin>
          }
        />
        <Route
          path={Links.PROFESSOR_PROJECTS}
          element={
            <PageCin auth={auth} permittedRoles={[Roles.USERS]}>
              <ProfessorProjectsPage />
            </PageCin>
          }
        />
        <Route
          path={Links.STUDENTS}
          element={
            <PageCin auth={auth} permittedRoles={[Roles.USERS]}>
              <StudentsPage />
            </PageCin>
          }
        />
        <Route
          path={Links.PROFESSOR_STUDENTS}
          element={
            <PageCin auth={auth} permittedRoles={[Roles.USERS]}>
              <ProfessorStudentsPage />
            </PageCin>
          }
        />
        <Route
          path={Links.QUALIS}
          element={
            <PageCin auth={auth} permittedRoles={[Roles.USERS]}>
              <QualisPage />
            </PageCin>
          }
        />
        <Route
          path={Links.PROFESSOR_INFO}
          element={
            <PageCin auth={auth} permittedRoles={[Roles.USERS]}>
              <ProfessorInfo />
            </PageCin>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
