import { useOutletContext } from 'react-router-dom';
import { PublicProfessorContext } from '../../../types/PublicProfessor.d';
import GenericList from '../GenericList/GenericList';
import SupervisionItem from './SupervisionItem';

export default function SupervisionsList() {
  const { supervisions, isLoading, isError } = useOutletContext<PublicProfessorContext>();

  return <GenericList isLoading={isLoading} isError={isError} Card={SupervisionItem} data={supervisions} />;
}
