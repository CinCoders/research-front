import { toast } from '@cincoders/cinnamon';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectsService } from '../../../services/ProjectsService';
import { ProfessorProjects } from '../../../types/Projects.d';
import ProjectItem from './ProjectItem';

export default function ProjectsList() {
  const { id } = useParams();
  const [projects, setProjects] = useState<ProfessorProjects[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        if (!id) {
          throw new Error('Professor não específicado');
        }

        const data = await ProjectsService.getProfessorProjects(Number(id));
        setProjects(data.data);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : null;

        toast.error(`Ocorreu um erro ao buscar os projetos ${errorMessage}.`, {
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [id]);

  if (!id) {
    return null;
  }

  if (loading) {
    return <CircularProgress />;
  }

  if (!projects || projects.length === 0) {
    return <Typography variant='body1'>Nenhum projeto encontrado</Typography>;
  }

  return (
    <Box display='flex' flexDirection='column' gap={4}>
      {projects
        .sort((a, b) => b.year - a.year)
        ?.map(proj => (
          <ProjectItem project={proj} key={proj.id} />
        ))}
    </Box>
  );
}
