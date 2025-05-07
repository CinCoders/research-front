import GenericList from '../GenericList/GenericList';
import ProjectItem from './ProjectItem';

export default function ProjectsList() {
  return <GenericList itemsKey='projects' renderItem={props => <ProjectItem {...props} key={Math.random()} />} />;
}
