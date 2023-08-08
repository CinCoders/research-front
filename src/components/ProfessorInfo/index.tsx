import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { toast } from '@cincoders/cinnamon';
import { ProfessorService } from '../../services/ProfessorService';
import { Professor } from '../../types/Professor.d';
import { showErrorStatus } from '../../utils/showErrorStatus';

interface ParamsProps {
  paramId: number;
}

function ProfessorInfo({ paramId }: ParamsProps) {
  const [professor, setProfessor] = useState<Professor>();

  useEffect(() => {
    async function loadData() {
      try {
        const response = await ProfessorService.getProfessor(paramId);
        if (response.status === 200) {
          setProfessor(response.data);
        } else {
          showErrorStatus(response.status);
        }
      } catch {
        toast.error('Não foi possível carregar os professores. Tente novamente mais tarde.', { containerId: 'page' });
      }
    }
    loadData();
  }, [paramId]);

  return (
    <Box
      sx={{
        justifyContent: 'left',
        display: 'flex',
        paddingLeft: '5%',
      }}
    >
      {professor ? <h3>{professor?.name}</h3> : ''}
    </Box>
  );
}

export default ProfessorInfo;
