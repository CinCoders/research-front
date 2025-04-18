import { Divider, FormControl, FormControlLabel, Grid } from '@mui/material';
import { GridColDef, ptBR } from '@mui/x-data-grid';
import { ChangeEvent, useEffect, useState } from 'react';
import { toast, useNavbar } from '@cincoders/cinnamon';
import { CustomToolbar } from '../../../components/CustomToolbar';
import { MainGrid, TableDiv, GridContainer, ProfessorsGrid } from '../../../components/TableStyles/styles';
import { ProjectsService } from '../../../services/ProjectsService';
import { renderHeaderTooltip } from '../../../components/HeaderTooltip/index';
import { LinkButton } from '../../../components/LinkButton';
import { RedSwitch } from '../../../components/RedSwitch';
import { Projects } from '../../../types/Projects.d';
import { Links } from '../../../types/enums';
import { ButtonsGrid } from '../../../components/ButtonsGrid/styles';
import { showErrorStatus } from '../../../utils/showErrorStatus';
import { TextInput, TextInputWrapper } from '../../../components/InputYear/styles';
import useDebouncedState from '../../../utils/useDebouncedState';

const columns: GridColDef[] = [
  {
    field: 'year',
    headerName: 'ANO',
    description: 'Ano do projeto',
    headerAlign: 'center',
    align: 'center',
    flex: 10,
    renderHeader: renderHeaderTooltip,
    type: 'number',
    renderCell: params => params.value,
  },
  {
    field: 'professorName',
    headerName: 'NOME',
    description: 'Nome do professor',
    headerAlign: 'center',
    flex: 30,
    renderCell: params => {
      let route = '';
      if (params.row.professorId) {
        route = Links.PROFESSOR_PROJECTS.replace(':id', (params.row.professorId as number).toString());
      }
      return <LinkButton title={params.value} route={route} />;
    },
    renderHeader: renderHeaderTooltip,
  },
  {
    field: 'total',
    headerName: 'TOTAL',
    description: 'Total de projetos',
    headerAlign: 'center',
    align: 'center',
    flex: 10,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },
  {
    field: 'projectsInProgress',
    headerName: 'EM PROGRESSO',
    headerAlign: 'center',
    align: 'center',
    description: 'Total de projetos em progresso',

    flex: 20,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },
  {
    field: 'concludedProjects',
    headerName: 'CONCLUÍDOS',
    headerAlign: 'center',
    align: 'center',
    description: 'Total de projetos concluídos',

    flex: 20,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },
  {
    field: 'cnpqProjects',
    headerName: 'CNPq',
    headerAlign: 'center',
    align: 'center',
    description: 'Um projeto pode ter mais de um financiador',
    flex: 10,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },
  {
    field: 'facepeProjects',
    headerName: 'FACEPE',
    headerAlign: 'center',
    align: 'center',
    description: 'Um projeto pode ter mais de um financiador',
    flex: 10,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },
  {
    field: 'capesProjects',
    headerName: 'CAPES',
    headerAlign: 'center',
    align: 'center',
    description: 'Um projeto pode ter mais de um financiador',
    flex: 10,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },
  {
    field: 'anotherFinancier',
    headerName: 'OUTROS',
    headerAlign: 'center',
    align: 'center',
    description: 'Um projeto pode ter mais de um financiador',
    flex: 10,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },
  {
    field: 'noFinancier',
    headerName: 'S/F',
    headerAlign: 'center',
    align: 'center',
    description: 'Total de projetos sem financiamento',
    flex: 10,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },
];

function Table() {
  const [rows, setRows] = useState<Projects[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [checkedYear, setCheckedYear] = useState<boolean>(true);
  const [checkedProfessor, setCheckedProfessor] = useState<boolean>(false);
  const [startYear, debouncedStartYear, handleStartYearChange] = useDebouncedState();
  const [endYear, debouncedEndYear, handleEndYearChange] = useDebouncedState();

  useEffect(() => {
    async function loadData() {
      setRows([]);
      setLoading(true);
      try {
        const response = await ProjectsService.getProjects(
          checkedYear,
          checkedProfessor,
          debouncedStartYear || 1950,
          debouncedEndYear || new Date().getFullYear(),
        );
        if (response.status === 200) {
          const { data } = response;

          if (checkedProfessor) {
            const newData: Projects[] = data.map((element, index) => ({
              id: index,
              professorId: element.professorId,
              professorName: element.professorName,
              year: element.year,
              total: element.total,
              cnpqProjects: element.cnpqProjects,
              facepeProjects: element.facepeProjects,
              capesProjects: element.capesProjects,
              concludedProjects: element.concludedProjects,
              projectsInProgress: element.projectsInProgress,
              noFinancier: element.noFinancier,
              anotherFinancier: element.anotherFinancier,
            }));
            setRows(newData);
          } else {
            const newData: Projects[] = data.map((element, index) => ({
              id: index,
              year: element.year,
              total: element.total,
              cnpqProjects: element.cnpqProjects,
              facepeProjects: element.facepeProjects,
              capesProjects: element.capesProjects,
              concludedProjects: element.concludedProjects,
              projectsInProgress: element.projectsInProgress,
              noFinancier: element.noFinancier,
              anotherFinancier: element.anotherFinancier,
            }));
            setRows(newData);
          }
        } else {
          showErrorStatus(response.status);
        }
      } catch {
        toast.error('Não foi possível carregar os projetos. Tente novamente mais tarde.', { containerId: 'page' });
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [checkedYear, checkedProfessor, debouncedEndYear, debouncedStartYear]);

  const handleChangeYear = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedYear(event.target.checked);
  };

  const handleChangeProfessor = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedProfessor(event.target.checked);
  };

  return (
    <GridContainer>
      <ButtonsGrid marginBottom={{ xs: '8px', sm: '0.5rem' }}>
        <Grid sx={{ width: '260px' }}>
          <Divider> Agrupar </Divider>
          <Grid container sx={{ width: '100%' }}>
            <Grid item xs={12} lg={5} sx={{ paddingY: '' }}>
              <FormControlLabel control={<RedSwitch checked={checkedYear} onChange={handleChangeYear} />} label='Ano' />
            </Grid>
            <Grid item xs={12} lg={5} paddingY={{ xs: '5px', md: '0' }}>
              <FormControlLabel
                control={<RedSwitch checked={checkedProfessor} onChange={handleChangeProfessor} />}
                label='Professor'
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid sx={{ paddingX: '5%', display: 'inline-block' }}>
          <Divider> Filtrar </Divider>
          <Grid container columnSpacing={2} rowSpacing={1} sx={{ width: '100%', marginX: '-10px' }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ display: 'block', width: '90px' }}>Ano Inicial:</span>
                  <TextInputWrapper>
                    <TextInput
                      id='start-year'
                      value={startYear}
                      onChange={handleStartYearChange}
                      type='number'
                      min='1950'
                      max={new Date().getFullYear()}
                    />
                  </TextInputWrapper>
                </div>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ display: 'block', width: '90px' }}>Ano Final:</span>
                  <TextInputWrapper>
                    <TextInput
                      id='end-year'
                      value={endYear}
                      onChange={handleEndYearChange}
                      type='number'
                      min='1950'
                      max={new Date().getFullYear()}
                    />
                  </TextInputWrapper>
                </div>
              </FormControl>
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

function ProjectsPage() {
  const navbar = useNavbar();
  useEffect(() => {
    navbar?.setTitle('Projetos de Pesquisa');
  }, [navbar]);
  return (
    <ProfessorsGrid>
      <Table />
    </ProfessorsGrid>
  );
}

export default ProjectsPage;
