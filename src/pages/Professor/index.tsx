import { useNavbar } from '@cincoders/cinnamon';
import { Box, Tab, Tabs } from '@mui/material';
import { ReactNode, SyntheticEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfessorData from '../../components/ProfessorData';
import { TitleBox } from '../../components/ProfessorData/styles';
import { ProfessorGrid } from '../../components/TableStyles/styles';
import { ProfessorService } from '../../services/ProfessorService';
import { Professor } from '../../types/Professor.d';
import { ProfessorPatentsTable } from '../Patents/ProfessorPatents';
import { ProfessorProjectsTable } from '../Projects/ProfessorProjects';
import { ProfessorPublicationsTable } from '../Publications/ProfessorPublications';
import { ProfessorStudentsTable } from '../Students/ProfessorStudents';

interface TabPanelProps {
  children: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div
      hidden={value !== index}
      id={`dataGrid-${index}`}
      aria-labelledby={`dataGrid-${index}`}
      style={{ display: 'flex', flexDirection: 'column', flexGrow: value === index ? '1' : 0 }}
    >
      {value === index && <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: '1' }}>{children}</Box>}
    </div>
  );
}

function ProfessorInfo() {
  const navbar = useNavbar();
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const [professor, setProfessor] = useState<Professor>({
    id: Number(id),
    name: '',
    identifier: '',
  });

  useEffect(() => {
    navbar?.setTitle('Projetos de Pesquisa');
  }, [navbar]);

  useEffect(() => {
    async function getProfessorName() {
      const response = await ProfessorService.getProfessor(professor.id);
      if (response.status === 200) {
        setProfessor(currentValue => ({
          ...currentValue,
          name: response.data.name,
          identifier: response.data.identifier,
        }));
      }
      return response;
    }
    getProfessorName();
  }, [professor.id]);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '1',
        width: '100%',
      }}
    >
      <ProfessorData id={Number(id)} name={professor.name} lattesCode={professor.identifier} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: '1',
          border: 0.1,
          borderRadius: 1,
          borderColor: '#f6c7cb',
          width: '100%',
          marginBottom: '1em',
        }}
      >
        <TitleBox>
          <h3>Pesquisa</h3>
        </TitleBox>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: '1', width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label='datagrid tab'>
              <Tab label='Publicações' id='datagridTab-0' />
              <Tab label='Projetos' id='datagridTab-1' />
              <Tab label='Orientações' id='datagridTab-2' />
              <Tab label='Patentes' id='datagridTab-3' />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <ProfessorGrid>
              <ProfessorPublicationsTable paramId={Number(id)} />
            </ProfessorGrid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ProfessorGrid sx={{ marginTop: '59.5px', marginBottom: '0.31em' }}>
              <ProfessorProjectsTable paramId={Number(id)} />
            </ProfessorGrid>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ProfessorGrid>
              <ProfessorStudentsTable paramId={Number(id)} />
            </ProfessorGrid>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <ProfessorGrid>
              <ProfessorPatentsTable paramId={Number(id)} />
            </ProfessorGrid>
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
}

export default ProfessorInfo;
