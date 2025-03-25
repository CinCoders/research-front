import { toast } from '@cincoders/cinnamon';
import { Box, CircularProgress, Typography } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface GenericListProps<T> {
  fetchData: (id: string | number) => Promise<T[]>;
  renderItem: (item: T) => JSX.Element;
  emptyMessage: string;
  defaultErrorMessage: string;
  sortFunction?: (a: T, b: T) => number;
}

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

export default function GenericList<T>({
  fetchData,
  renderItem,
  emptyMessage,
  defaultErrorMessage,
  sortFunction,
}: GenericListProps<T>) {
  const { id } = useParams();
  const [items, setItems] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      try {
        console.log('IS LOADING: ', loading);
        if (!id) {
          throw new Error('Professor não informado');
        }

        const data = await fetchData(id);
        setItems(data);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '';
        toast.error(`${defaultErrorMessage}. ${errorMessage}`, {
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [fetchData]);

  if (loading) {
    return (
      <StateContainer message='Carregando...'>
        <CircularProgress />
      </StateContainer>
    );
  }

  if (!items || items.length === 0) return <StateContainer message={emptyMessage} />;

  return (
    <Box display='flex' flexDirection='column' gap={4}>
      {items.sort(sortFunction ?? (() => 0)).map(renderItem)}
    </Box>
  );
}
