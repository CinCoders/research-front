import { PatentService } from '../../../services/PatentService';
import GenericList from '../GenericList/GenericList';
import PatentItem from './PatentItem';

export default function PatentsList() {
  const fetchPatents = async (lattes: string) => PatentService.getProfessorPatents(undefined, lattes);

  return (
    <GenericList
      fetchData={fetchPatents}
      renderItem={props => <PatentItem {...props} key={props.registryCode} />}
      emptyMessage='Nenhuma patente encontrada'
      sortFunction={(a, b) => b.developmentYear - a.developmentYear}
      defaultErrorMessage='Ocorreu um erro ao buscar as patentes'
    />
  );
}
