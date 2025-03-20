import { toast } from '@cincoders/cinnamon';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StudentsService } from '../../../services/StudentsService';
import { ProfessorStudents } from '../../../types/Students.d';
import SupervisionItem from './SupervisionItem';

export default function SupervisionsList() {
  const { id } = useParams();
  const [supervisions, setSupervisions] = useState<ProfessorStudents[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublications = async () => {
      setLoading(true);
      try {
        if (!id) {
          throw new Error('Professor não específicado');
        }
        const data = await StudentsService.getProfessorStudents(Number(id), false);
        setSupervisions(data.data);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : null;
        toast.error(`Ocorreu um erro ao buscar as orientações ${errorMessage}.`, {
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

  if (!supervisions || supervisions.length === 0) {
    return <Typography variant='body1'>Nenhuma orientação encontrada</Typography>;
  }

  return (
    <Box display='flex' flexDirection='column' gap={4}>
      {supervisions
        .sort((a, b) => (b.yearStart ?? 0) - (a.yearStart ?? 0))
        .map(supervision => (
          <SupervisionItem
            {...supervision}
            key={supervision.name + supervision.degree + supervision.type + supervision.yearStart}
          />
        ))}
    </Box>
  );
}
