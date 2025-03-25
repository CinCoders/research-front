import { StudentsService } from '../../../services/StudentsService';
import GenericList from '../GenericList';
import SupervisionItem from './SupervisionItem';

export default function SupervisionsList() {
  const fetchSupervisions = async (id: string | number) => {
    const { data } = await StudentsService.getProfessorStudents(Number(id), false);
    return data;
  };

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
