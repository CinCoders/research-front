import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { GridColDef, ptBR } from '@mui/x-data-grid';
import { Divider, FormControl, FormControlLabel, Grid, TextField } from '@mui/material';
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
  const [startYear, setStartYear] = useState<number>();
  const [debouncedStartYear, setDebouncedStartYear] = useState<number | null>(null);
  const [debouncedEndYear, setDebouncedEndYear] = useState<number | null>(null);
  const [endYear, setEndYear] = useState<number>();
  const timeoutStartRef = useRef<number | null>(null);
  const timeoutEndRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timeoutStartRef.current) {
        clearTimeout(timeoutStartRef.current);
      }
      if (timeoutEndRef.current) {
        clearTimeout(timeoutEndRef.current);
      }
    },
    [],
  );
  useEffect(() => {
    async function loadData() {
      setRows([]);
      setLoading(true);
      try {
        const response = await StudentsService.getStudents(
          checkedYear,
          checkedProfessor,
          checkedCurrentStudents,
          debouncedStartYear || 1950,
          debouncedEndYear || new Date().getFullYear(),
        );
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
  }, [checkedYear, checkedProfessor, checkedCurrentStudents, debouncedStartYear, debouncedEndYear]);

  const handleChangeYear = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedYear(event.target.checked);
  };

  const handleChangeProfessor = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedProfessor(event.target.checked);
  };

  const handleChangeCurrentStudents = () => {
    setCheckedCurrentStudents(checked => !checked);
  };

  const handleStartYearChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newStartYear = Number(event.target.value);

    setStartYear(newStartYear);

    if (timeoutStartRef.current) {
      clearTimeout(timeoutStartRef.current);
    }
    timeoutStartRef.current = window.setTimeout(() => {
      setDebouncedStartYear(newStartYear);
    }, 2000);
  };

  const handleEndYearChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newEndYear = Number(event.target.value);

    setEndYear(newEndYear);

    if (timeoutEndRef.current) {
      clearTimeout(timeoutEndRef.current);
    }

    timeoutEndRef.current = window.setTimeout(() => {
      setDebouncedEndYear(newEndYear);
    }, 2000);
  };

  return (
    <GridContainer>
      <ButtonsGrid>
        <Grid sx={{ padding: '7px' }}>
          <Divider> Agrupar </Divider>
          <FormControlLabel control={<RedSwitch checked={checkedYear} onChange={handleChangeYear} />} label='Ano' />
          <FormControlLabel
            control={<RedSwitch checked={checkedProfessor} onChange={handleChangeProfessor} />}
            label='Professor'
          />
        </Grid>
        <Grid sx={{ marginLeft: '5%', marginBottom: '0.5rem', padding: '7px' }}>
          <Divider> Filtrar </Divider>
          <Grid container spacing={3} sx={{ width: '100%', marginX: 0 }}>
            <Grid item xs={12} sm={6} lg={5} container>
              <Grid item xs={12} lg={6}>
                <FormControlLabel
                  control={<RedSwitch checked={!checkedCurrentStudents} onChange={handleChangeCurrentStudents} />}
                  label='Orientados'
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormControlLabel
                  control={<RedSwitch checked={checkedCurrentStudents} onChange={handleChangeCurrentStudents} />}
                  label='Orientandos'
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} sm={6} lg={7} spacing={1}>
              <Grid item xs={12} lg={6}>
                <FormControl fullWidth>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ display: 'block', width: '90px' }}>Ano Inicial:</span>
                    <TextField
                      id='start-year'
                      value={startYear}
                      onChange={handleStartYearChange}
                      variant='outlined'
                      type='number'
                      size='small'
                      inputProps={{ min: 1950, max: new Date().getFullYear() }}
                    />
                  </div>
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormControl fullWidth>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ display: 'block', width: '90px' }}>Ano Final:</span>
                    <TextField
                      id='end-year'
                      value={endYear}
                      onChange={handleEndYearChange}
                      size='small'
                      variant='outlined'
                      type='number'
                      inputProps={{ min: 1950, max: new Date().getFullYear() }}
                    />
                  </div>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
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
