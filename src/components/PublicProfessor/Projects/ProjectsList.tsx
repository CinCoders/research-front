import { useOutletContext } from 'react-router-dom';
import { PublicProfessorContext } from '../../../types/PublicProfessor.d';
import GenericList from '../GenericList/GenericList';
import ProjectItem from './ProjectItem';

export default function ProjectsList() {
  const { projects } = useOutletContext<PublicProfessorContext>();

  return <GenericList Card={ProjectItem} data={projects} />;
}
