import { PublicationsService } from '../../../services/PublicationsService';
import GenericList from '../GenericList';
import PublicationItem from './PublicationItem';

export default function PublicationList() {
  const fetchPublications = async (id: string | number) => {
    const { data } = await PublicationsService.getProfessorPublications(String(id), true, true);
    return data;
  };

  return (
    <GenericList
      fetchData={fetchPublications}
      renderItem={props => <PublicationItem {...props} key={props.doi} />}
      emptyMessage='Nenhuma publicação encontrada'
      sortFunction={(a, b) => b.year - a.year}
      defaultErrorMessage='Ocorreu um erro ao buscar as publicações'
    />
  );
}
