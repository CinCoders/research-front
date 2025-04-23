import { Box, Typography } from '@mui/material';
import React from 'react';
import StateContainer from '../../share/StateContainer';

export interface GenericListProps<T> {
  data: T[] | null;
  Card: React.ComponentType<T>;
}

export default function GenericList<T>({ Card, data }: GenericListProps<T>) {
  if (!data || data.length === 0) {
    return (
      <StateContainer message='Nenhum dado encontrado'>
        <Typography variant='h5' fontSize={20} align='center'>
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
