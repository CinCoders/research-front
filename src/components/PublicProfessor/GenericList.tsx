import { toast } from '@cincoders/cinnamon';
import { Box, CircularProgress, Typography } from '@mui/material';
import { AxiosResponse } from 'axios';
import { ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { showErrorStatus } from '../../utils/showErrorStatus';
import { getUserLattes } from '../../utils/storeUserLattes';

interface GenericListProps<T> {
  fetchData: (lattes: string) => Promise<AxiosResponse<T[]>>;
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

StateContainer.defaultProps = {
  children: null,
  message: '',
};

export default function GenericList<T>({
  fetchData,
  renderItem,
  emptyMessage,
  defaultErrorMessage,
  sortFunction,
}: GenericListProps<T>) {
  const { user } = useParams();
  const [items, setItems] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      try {
        if (!user) {
          throw new Error('Professor não informado');
        }

        const lattes = getUserLattes(user);

        if (!lattes) {
          throw new Error('Professor nao encontrado');
        }

        const response = await fetchData(lattes);

        if (response.status !== 200) {
          showErrorStatus(response.status);
        }

        setItems(response.data);
      } catch (error) {
        toast.error(defaultErrorMessage, {
          autoClose: 3000,
          containerId: 'page',
        });
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [defaultErrorMessage, fetchData, user]);

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

GenericList.defaultProps = {
  sortFunction: undefined,
};
