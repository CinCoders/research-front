import { toast } from '@cincoders/cinnamon';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PatentService } from '../../../services/PatentService';
import { ProfessorPatents } from '../../../types/Patents.d';
import PatentItem from './PatentItem';

export default function PatentsList() {
  const { id } = useParams();
  const [patents, setPatents] = useState<ProfessorPatents[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatents = async () => {
      setLoading(true);
      try {
        if (!id) {
          throw new Error('Professor não específicado');
        }
        const data = await PatentService.getProfessorPatents(Number(id));
        setPatents(data.data);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : null;
        toast.error(`Ocorreu um erro ao buscar as patentes ${errorMessage}.`, {
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPatents();
  }, [id]);

  if (!id) {
    return null;
  }

  if (loading) {
    return <CircularProgress />;
  }

  if (!patents || patents.length === 0) {
    return <Typography variant='body1'>Nenhuma patente encontrada</Typography>;
  }

  return (
    <Box display='flex' flexDirection='column' gap={4}>
      {patents
        .sort((a, b) => b.developmentYear - a.developmentYear)
        .map(pat => (
          <PatentItem {...pat} key={pat.registryCode} />
        ))}
    </Box>
  );
}
