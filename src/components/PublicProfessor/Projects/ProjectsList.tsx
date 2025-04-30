import { useOutletContext } from 'react-router-dom';
import { PublicProfessorContext } from '../../../types/PublicProfessor.d';
import GenericList from '../GenericList/GenericList';
import ProjectItem from './ProjectItem';

export default function ProjectsList() {
  const { projects, isLoading, isError } = useOutletContext<PublicProfessorContext>();

  return <GenericList isLoading={isLoading} isError={isError} Card={ProjectItem} data={projects} />;
}
