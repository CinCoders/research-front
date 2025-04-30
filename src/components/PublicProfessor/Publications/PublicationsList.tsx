import { useOutletContext } from 'react-router-dom';
import { PublicProfessorContext } from '../../../types/PublicProfessor.d';
import GenericList from '../GenericList/GenericList';
import PublicationItem from './PublicationItem';

export default function PublicationList() {
  const { publications, isLoading, isError } = useOutletContext<PublicProfessorContext>();

  return <GenericList isLoading={isLoading} isError={isError} Card={PublicationItem} data={publications} />;
}
