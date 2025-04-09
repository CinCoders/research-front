import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { useOutletContext } from 'react-router-dom';
import { PublicProfessorOutlet } from '../../../pages/PublicProfessor';

function StateContainer({ children, message }: { children?: ReactNode; message?: string }) {
  return (
    <Box
      width='100%'
      height='100'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      gap={2}
      style={{ marginTop: 300 }}
    >
      {children}
      {message && (
        <Typography variant='subtitle2' fontSize={20}>
          {message}
        </Typography>
      )}
    </Box>
  );
}

StateContainer.defaultProps = {
  children: null,
  message: '',
};
export type PublicProfessorOutletKey = keyof PublicProfessorOutlet;
export type PublicProfessorOutletValue<K extends PublicProfessorOutletKey> = PublicProfessorOutlet[K] extends Array<
  infer T
>
  ? T
  : never;

interface GenericListProps<K extends PublicProfessorOutletKey> {
  itemsKey: K;
  renderItem: (item: PublicProfessorOutletValue<K>) => JSX.Element;
  // sortFunction?: (a: PublicProfessorOutletValue<K>, b: PublicProfessorOutletValue<K>) => number;
}

export default function GenericList<K extends PublicProfessorOutletKey>({
  renderItem,
  itemsKey,
}: // sortFunction,
GenericListProps<K>) {
  const context = useOutletContext<PublicProfessorOutlet>();
  const items = context[itemsKey] as PublicProfessorOutletValue<K>[] | undefined;

  if (!items) {
    return (
      <StateContainer message='Nenhum dado encontrado'>
        <Typography variant='h5' fontSize={20}>
          Ocorreu um erro durante a busca. Tente novamente mais tarde.
        </Typography>
      </StateContainer>
    );
  }

  return (
    <Box display='flex' flexDirection='column' gap={4}>
      {items.map(renderItem)}
    </Box>
  );
}
