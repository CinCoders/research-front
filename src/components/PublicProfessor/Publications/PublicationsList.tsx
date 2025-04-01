import { PublicationsService } from '../../../services/PublicationsService';
import GenericList from '../GenericList';
import PublicationItem from './PublicationItem';

export default function PublicationList() {
  const fetchPublications = async (lattes: string) => {
    const { data } = await PublicationsService.getProfessorPublications(null, lattes, true, true);
    return data;
  };

  return (
    <GenericList
      fetchData={fetchPublications}
      renderItem={props => <PublicationItem {...props} key={props.doi ? props.doi : props.title} />}
      emptyMessage='Nenhuma publicação encontrada'
      sortFunction={(a, b) => b.year - a.year}
      defaultErrorMessage='Ocorreu um erro ao buscar as publicações'
    />
  );
}
