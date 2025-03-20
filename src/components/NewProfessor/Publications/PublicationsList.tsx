import { toast } from '@cincoders/cinnamon';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PublicationsService } from '../../../services/PublicationsService';
import { ProfessorPublications } from '../../../types/Publications.d';
import PublicationItem from './PublicationItem';

export default function PublicationList() {
  const { id } = useParams();
  const [publications, setPublications] = useState<ProfessorPublications[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublications = async () => {
      setLoading(true);
      try {
        if (!id) {
          throw new Error('Professor não específicado');
        }
        const data = await PublicationsService.getProfessorPublications(id, true, true);
        setPublications(data.data);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : null;
        toast.error(`Ocorreu um erro ao buscar as publicações ${errorMessage}.`, {
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, [id]);

  if (!id) {
    return null;
  }

  if (loading) {
    return <CircularProgress />;
  }

  if (!publications || publications.length === 0) {
    return <Typography variant='body1'>Nenhuma publicação encontrada</Typography>;
  }

  return (
    <Box display='flex' flexDirection='column' gap={4}>
      {publications
        .sort((a, b) => b.year - a.year)
        .map(pub => (
          <PublicationItem {...pub} key={pub.doi} />
        ))}
    </Box>
  );
}
