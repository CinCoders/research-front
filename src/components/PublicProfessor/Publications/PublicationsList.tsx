import GenericList from '../GenericList/GenericList';
import PublicationItem from './PublicationItem';

export default function PublicationList() {
  return (
    <GenericList itemsKey='publications' renderItem={props => <PublicationItem {...props} key={Math.random()} />} />
  );
}
