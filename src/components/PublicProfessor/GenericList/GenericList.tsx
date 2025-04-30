import { Box, Typography } from '@mui/material';
import React from 'react';
import StateContainer from '../../share/StateContainer';
import GenericListSkeleton from './GenericListSkeleton';

export interface GenericListProps<T> {
  data: T[] | null;
  Card: React.ComponentType<T>;
  isLoading: boolean;
  isError: boolean;
}

export default function GenericList<T>({ Card, isError, data, isLoading }: GenericListProps<T>) {
  if (isLoading || data === null) return <GenericListSkeleton />;

  if (isError) {
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
      {data?.map(item => (
        <Card {...item} key={Math.random()} />
      ))}
    </Box>
  );
}
