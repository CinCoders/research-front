import { useOutletContext } from 'react-router-dom';
import { PublicProfessorContext } from '../../../types/PublicProfessor.d';
import GenericList from '../GenericList/GenericList';
import PublicationItem from './PublicationItem';

export default function PublicationList() {
  const { publications, isLoading } = useOutletContext<PublicProfessorContext>();

  return <GenericList isLoading={isLoading} Card={PublicationItem} data={publications} />;
}
