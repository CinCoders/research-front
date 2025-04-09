import GenericList from '../GenericList/GenericList';
import PatentItem from './PatentItem';

export default function PatentsList() {
  return <GenericList itemsKey='patents' renderItem={props => <PatentItem {...props} key={Math.random()} />} />;
}
