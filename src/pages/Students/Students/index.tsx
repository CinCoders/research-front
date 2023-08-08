import { ChangeEvent, useEffect, useState } from 'react';
import { GridColDef, ptBR } from '@mui/x-data-grid';
import { Divider, FormControlLabel, Grid } from '@mui/material';
import { toast, useNavbar } from '@cincoders/cinnamon';
import { CustomToolbar } from '../../../components/CustomToolbar';
import { MainGrid, TableDiv, GridContainer, ProfessorsGrid } from '../../../components/TableStyles/styles';
import { renderHeaderTooltip } from '../../../components/HeaderTooltip';
import { RedSwitch } from '../../../components/RedSwitch';
import { Students } from '../../../types/Students.d';
import { StudentsService } from '../../../services/StudentsService';
import { Links } from '../../../types/enums';
import { ButtonsGrid } from '../../../components/ButtonsGrid/styles';
import { LinkButton } from '../../../components/LinkButton';
import { showErrorStatus } from '../../../utils/showErrorStatus';

const columns: GridColDef[] = [
  {
    field: 'year',
    headerName: 'ANO',
    headerAlign: 'center',
    align: 'center',
    description: 'Ano',
    flex: 10,
    renderHeader: renderHeaderTooltip,
    type: 'number',
    renderCell: params => params.value,
  },
  {
    field: 'professorName',
    headerName: 'PROFESSOR',
    headerAlign: 'center',
    description: 'Nome do professor',
    flex: 30,
    renderCell: params => {
      let route = '';
      if (params.row.professorId) {
        route = Links.PROFESSOR_STUDENTS.replace(':id', (params.row.professorId as number).toString());
      }

      return <LinkButton title={params.value} route={route} />;
    },
    renderHeader: renderHeaderTooltip,
  },
  {
    field: 'total',
    headerName: 'TOTAL',
    headerAlign: 'center',
    align: 'center',
    description: 'Total de alunos',
    flex: 10,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },
  {
    field: 'undergradResearchAdvisor',
    headerName: 'ORIEN. IC',
    headerAlign: 'center',
    align: 'center',
    description: 'Total de alunos de orientação de IC',
    flex: 15,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },
  {
    field: 'mastersMainAdvisor',
    headerName: 'ORIEN. MSC.',
    headerAlign: 'center',
    align: 'center',
    description: 'Total de alunos de orientação mestrado',
    flex: 16,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },
  {
    field: 'mastersCoAdvisor',
    headerName: 'COORIEN. MSC.',
    headerAlign: 'center',
    align: 'center',
    description: 'Total de alunos de coorientação de mestrado',
    flex: 16,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },
  {
    field: 'phdMainAdvisor',
    headerName: 'ORIEN. PHD.',
    headerAlign: 'center',
    align: 'center',
    description: 'Total de alunos de orientação de doutorado',
    flex: 17,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },
  {
    field: 'phdCoAdvisor',
    headerName: 'COORIEN. PHD.',
    headerAlign: 'center',
    align: 'center',
    description: 'Total de alunos de coorientação de doutorado',
    flex: 17,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },
  {
    field: 'postdocAdvisor',
    headerName: 'ORIEN. PÓS-DOC.',
    headerAlign: 'center',
    align: 'center',
    description: 'Total de alunos de orientação de pós-doutorado',
    flex: 18,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },
];

function Table() {
  const [rows, setRows] = useState<Students[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [checkedProfessor, setCheckedProfessor] = useState<boolean>(false);
  const [checkedYear, setCheckedYear] = useState<boolean>(true);
  const [checkedCurrentStudents, setCheckedCurrentStudents] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      setRows([]);
      setLoading(true);
      try {
        const response = await StudentsService.getStudents(checkedYear, checkedProfessor, checkedCurrentStudents);
        if (response.status === 200) {
          const { data } = response;
          const newData: Students[] = data.map((element, index) => ({
            id: index,
            professorId: element.professorId,
            professorName: element.professorName,
            year: element.year,
            total: element.total,
            undergradResearchAdvisor: element.undergradResearchAdvisor,
            mastersMainAdvisor: element.mastersMainAdvisor,
            phdMainAdvisor: element.phdMainAdvisor,
            postdocAdvisor: element.postdocAdvisor,
            mastersCoAdvisor: element.mastersCoAdvisor,
            phdCoAdvisor: element.phdCoAdvisor,
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
  }, [checkedYear, checkedProfessor, checkedCurrentStudents]);

  const handleChangeYear = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedYear(event.target.checked);
  };

  const handleChangeProfessor = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedProfessor(event.target.checked);
  };

  const handleChangeCurrentStudents = () => {
    setCheckedCurrentStudents(checked => !checked);
  };

  return (
    <GridContainer>
      <ButtonsGrid>
        <Grid>
          <Divider> Agrupar </Divider>
          <FormControlLabel control={<RedSwitch checked={checkedYear} onChange={handleChangeYear} />} label='Ano' />
          <FormControlLabel
            control={<RedSwitch checked={checkedProfessor} onChange={handleChangeProfessor} />}
            label='Professor'
          />
        </Grid>
        <Grid sx={{ marginLeft: '5%' }}>
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
            year: checkedYear,
            professorName: checkedProfessor,
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

function StudentsPage() {
  const navbar = useNavbar();
  useEffect(() => {
    navbar?.setTitle('Orientações');
  }, [navbar]);
  return (
    <ProfessorsGrid>
      <Table />
    </ProfessorsGrid>
  );
}

export default StudentsPage;
