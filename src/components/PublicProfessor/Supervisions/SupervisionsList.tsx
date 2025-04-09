import GenericList from '../GenericList/GenericList';
import SupervisionItem from './SupervisionItem';

export default function SupervisionsList() {
  return (
    <GenericList itemsKey='supervisions' renderItem={props => <SupervisionItem {...props} key={Math.random()} />} />
  );
}
