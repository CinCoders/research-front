import { useOutletContext } from 'react-router-dom';
import { PublicProfessorContext } from '../../../types/PublicProfessor.d';
import GenericList from '../GenericList/GenericList';
import PatentItem from './PatentItem';

export default function PatentsList() {
  const { patents } = useOutletContext<PublicProfessorContext>();

  return <GenericList Card={PatentItem} data={patents} />;
}
