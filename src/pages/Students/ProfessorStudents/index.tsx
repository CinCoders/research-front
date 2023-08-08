import { useEffect, useState } from 'react';
import { GridColDef, ptBR } from '@mui/x-data-grid';
import { Divider, FormControlLabel, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { toast, useNavbar } from '@cincoders/cinnamon';
import { CustomToolbar } from '../../../components/CustomToolbar';
import { MainGrid, TableDiv, GridContainer, ProfessorGrid, ProfessorDiv } from '../../../components/TableStyles/styles';
import { renderHeaderTooltip } from '../../../components/HeaderTooltip';
import { RedSwitch } from '../../../components/RedSwitch';
import { ProfessorStudents } from '../../../types/Students.d';
import { StudentsService } from '../../../services/StudentsService';
import { ButtonsGrid } from '../../../components/ButtonsGrid/styles';
import ProfessorInfo from '../../../components/ProfessorInfo';
import { showErrorStatus } from '../../../utils/showErrorStatus';

interface ParamsProps {
  paramId: number;
}

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'ALUNO',
    headerAlign: 'center',
    description: 'Nome do aluno',
    flex: 15,
    renderHeader: renderHeaderTooltip,
  },
  {
    field: 'degree',
    headerName: 'NATUREZA',
    headerAlign: 'center',
    align: 'center',
    description: 'Indica a natureza da orientação',
    flex: 20,
    renderHeader: renderHeaderTooltip,
  },
  {
    field: 'type',
    headerName: 'TIPO DE ORIENTAÇÃO',
    headerAlign: 'center',
    align: 'center',
    description: 'Indica o tipo da orientação',
    flex: 20,
    renderHeader: renderHeaderTooltip,
  },
  {
    field: 'yearStart',
    headerName: 'ANO DE INÍCIO',
    headerAlign: 'center',
    align: 'center',
    description: 'Indica o ano início',
    flex: 20,
    renderHeader: renderHeaderTooltip,
    type: 'number',
    renderCell: params => params.value,
  },
  {
    field: 'yearEnd',
    headerName: 'ANO DE TÉRMINO',
    headerAlign: 'center',
    align: 'center',
    description: 'Indica o ano término',
    flex: 20,
    renderHeader: renderHeaderTooltip,
    type: 'number',
    renderCell: params => params.value,
  },
];

export function ProfessorStudentsTable({ paramId }: ParamsProps) {
  const [rows, setRows] = useState<ProfessorStudents[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [checkedCurrentStudents, setCheckedCurrentStudents] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      setRows([]);
      setLoading(true);
      try {
        const response = await StudentsService.getProfessorStudents(paramId, checkedCurrentStudents);
        if (response.status === 200) {
          const { data } = response;
          const newData: ProfessorStudents[] = data.map((element, index) => ({
            id: index,
            name: element.name,
            degree: element.degree,
            type: element.type,
            yearStart: element.yearStart,
            yearEnd: element.yearEnd,
          }));
          setRows(newData);
        } else {
          showErrorStatus(response.status);
        }
      } catch {
        toast.error('Não foi possível carregar os professores. Tente novamente mais tarde.', { containerId: 'page' });
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [checkedCurrentStudents, paramId]);

  const handleChangeCurrentStudents = () => {
    setCheckedCurrentStudents(checked => !checked);
  };

  return (
    <GridContainer>
      <ButtonsGrid>
        <Grid>
          <Divider> Filtrar </Divider>
          <FormControlLabel
            control={<RedSwitch checked={!checkedCurrentStudents} onChange={handleChangeCurrentStudents} />}
            label='Orientados'
          />
          <FormControlLabel
            control={<RedSwitch checked={checkedCurrentStudents} onChange={handleChangeCurrentStudents} />}
            label='Orientandos'
          />
        </Grid>
      </ButtonsGrid>
      <TableDiv>
        <MainGrid
          rows={rows}
          columns={columns}
          columnVisibilityModel={{
            yearStart: checkedCurrentStudents,
            yearEnd: !checkedCurrentStudents,
          }}
          loading={loading}
          components={{
            Toolbar: CustomToolbar,
          }}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        />
      </TableDiv>
    </GridContainer>
  );
}

function ProfessorStudentsPage() {
  const navbar = useNavbar();
  useEffect(() => {
    navbar?.setTitle('Alunos orientados por Professor');
  }, [navbar]);
  const { id } = useParams();
  return (
    <ProfessorDiv>
      <ProfessorInfo paramId={Number(id)} />
      <ProfessorGrid>
        <ProfessorStudentsTable paramId={Number(id)} />
      </ProfessorGrid>
    </ProfessorDiv>
  );
}

export default ProfessorStudentsPage;
