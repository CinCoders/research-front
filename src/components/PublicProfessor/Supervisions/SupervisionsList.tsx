import { useOutletContext } from 'react-router-dom';
import { PublicProfessorContext } from '../../../types/PublicProfessor.d';
import GenericList from '../GenericList/GenericList';
import SupervisionItem from './SupervisionItem';

export default function SupervisionsList() {
  const { supervisions } = useOutletContext<PublicProfessorContext>();

  return <GenericList Card={SupervisionItem} data={supervisions} />;
}
