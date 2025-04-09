import { PublicationsService } from '../../../services/PublicationsService';
import GenericList from '../GenericList/GenericList';
import PublicationItem from './PublicationItem';

export default function PublicationList() {
  const fetchPublications = (lattes: string) => PublicationsService.getProfessorPublications(null, lattes, true, true);

  return (
    <GenericList
      fetchData={fetchPublications}
      renderItem={props => (
        <PublicationItem {...props} key={props.doi || `${props.title}-${props.year}-${props.eventJournal}`} />
      )}
      emptyMessage='Nenhuma publicação encontrada'
      sortFunction={(a, b) => b.year - a.year}
      defaultErrorMessage='Ocorreu um erro ao buscar as publicações'
    />
  );
}
