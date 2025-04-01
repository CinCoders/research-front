import { ProjectsService } from '../../../services/ProjectsService';
import GenericList from '../GenericList';
import ProjectItem from './ProjectItem';

export default function ProjectsList() {
  const fetchProjects = async (lattes: string) => {
    const { data } = await ProjectsService.getProfessorProjects(undefined, lattes);
    return data;
  };

  return (
    <GenericList
      fetchData={fetchProjects}
      renderItem={props => <ProjectItem {...props} key={props.id} />}
      emptyMessage='Nenhum projeto encontrado'
      sortFunction={(a, b) => b.year - a.year}
      defaultErrorMessage='Ocorreu um erro ao buscar os projetos'
    />
  );
}
