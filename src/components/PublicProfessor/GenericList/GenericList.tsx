import { Box, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

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

export interface GenericListProps<T> {
  data: T[] | null;
  Card: React.ComponentType<T>;
}

export default function GenericList<T>({ Card, data }: GenericListProps<T>) {
  if (!data || data.length === 0) {
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
      {data.map(item => (
        <Card {...item} key={Math.random()} />
      ))}
    </Box>
  );
}
