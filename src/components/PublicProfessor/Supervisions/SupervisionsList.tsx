import { StudentsService } from '../../../services/StudentsService';
import GenericList from '../GenericList';
import SupervisionItem from './SupervisionItem';

export default function SupervisionsList() {
  const fetchSupervisions = async (lattes: string) => StudentsService.getProfessorStudents(true, undefined, lattes);

  return (
    <GenericList
      fetchData={fetchSupervisions}
      renderItem={props => (
        <SupervisionItem {...props} key={props.name + props.degree + props.type + props.yearStart} />
      )}
      emptyMessage='Nenhuma orientação encontrada'
      sortFunction={(a, b) => (b.yearStart ?? 0) - (a.yearStart ?? 0)}
      defaultErrorMessage='Ocorreu um erro ao buscar as orientações'
    />
  );
}
