import { Divider, FormControlLabel, Grid } from '@mui/material';
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

  useEffect(() => {
    async function loadData() {
      setRows([]);
      setLoading(true);
      try {
        const response = await ProjectsService.getProjects(checkedYear, checkedProfessor);
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
  }, [checkedYear, checkedProfessor]);

  const handleChangeYear = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedYear(event.target.checked);
  };

  const handleChangeProfessor = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedProfessor(event.target.checked);
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
