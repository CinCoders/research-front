import { useOutletContext } from 'react-router-dom';
import { PublicProfessorContext } from '../../../types/PublicProfessor.d';
import GenericList from '../GenericList/GenericList';
import PatentItem from './PatentItem';

export default function PatentsList() {
  const { patents, isLoading } = useOutletContext<PublicProfessorContext>();

  return <GenericList isLoading={isLoading} Card={PatentItem} data={patents} />;
}
