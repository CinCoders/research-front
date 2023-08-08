import { GridColDef, ptBR } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, useNavbar } from '@cincoders/cinnamon';
import { CustomToolbar } from '../../../components/CustomToolbar';
import { MainGrid, TableDiv, ProfessorGrid, GridContainer, ProfessorDiv } from '../../../components/TableStyles/styles';
import { ProjectsService } from '../../../services/ProjectsService';
import { renderCheckIcon } from '../../../components/CheckIcon/index';
import { renderCellExpand } from '../../../components/EllipsisText/index';
import { renderHeaderTooltip } from '../../../components/HeaderTooltip';
import { ProfessorProjects } from '../../../types/Projects.d';
import ProfessorInfo from '../../../components/ProfessorInfo';
import { showErrorStatus } from '../../../utils/showErrorStatus';

interface ParamsProps {
  paramId: number;
}

const columns: GridColDef[] = [
  {
    field: 'year',
    headerName: 'ANO',
    headerAlign: 'center',
    align: 'center',
    description: 'Ano do projeto',
    flex: 10,
    renderHeader: renderHeaderTooltip,
    type: 'number',
    renderCell: params => params.value,
  },
  {
    field: 'name',
    headerName: 'NOME',
    headerAlign: 'center',
    description: 'Nome do projeto',
    flex: 50,
    renderCell: renderCellExpand,
    renderHeader: renderHeaderTooltip,
  },
  {
    field: 'inProgress',
    headerName: 'EM PROGRESSO',
    headerAlign: 'center',
    align: 'center',
    description: 'Indica se o projeto está em progresso',
    flex: 15,
    renderCell: renderCheckIcon,
    renderHeader: renderHeaderTooltip,
    type: 'boolean',
  },
  {
    field: 'cnpqProject',
    headerName: 'CNPq',
    headerAlign: 'center',
    align: 'center',
    description: 'Indica se o projeto é financiado pelo CNPq',
    flex: 10,
    renderCell: renderCheckIcon,
    renderHeader: renderHeaderTooltip,
    type: 'boolean',
  },
  {
    field: 'facepeProject',
    headerName: 'FACEPE',
    headerAlign: 'center',
    align: 'center',
    description: 'Indica se o projeto é financiado pela FACEPE',
    flex: 10,
    renderCell: renderCheckIcon,
    renderHeader: renderHeaderTooltip,
    type: 'boolean',
  },
  {
    field: 'capesProject',
    headerName: 'CAPES',
    headerAlign: 'center',
    align: 'center',
    description: 'Indica se o projeto é financiado pela CAPES',
    flex: 10,
    renderCell: renderCheckIcon,
    renderHeader: renderHeaderTooltip,
    type: 'boolean',
  },
  {
    field: 'anotherFinanciers',
    headerName: 'OUTROS',
    headerAlign: 'center',
    align: 'center',
    description: 'Indica se o projeto tem outros financiadores',
    flex: 10,
    renderCell: renderCheckIcon,
    renderHeader: renderHeaderTooltip,
    type: 'boolean',
  },
];

export function ProfessorProjectsTable({ paramId }: ParamsProps) {
  const [rows, setRows] = useState<ProfessorProjects[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      setRows([]);
      setLoading(true);
      try {
        const response = await ProjectsService.getProfessorProjects(paramId);
        if (response.status === 200) {
          const { data } = response;

          const newData: ProfessorProjects[] = data.map((element, index) => ({
            id: index,
            name: element.name,
            year: element.year,
            inProgress: element.inProgress,
            cnpqProject: element.cnpqProject,
            facepeProject: element.facepeProject,
            capesProject: element.capesProject,
            anotherFinanciers: element.anotherFinanciers,
          }));
          setRows(newData);
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
  }, [paramId]);

  return (
    <GridContainer>
      <TableDiv>
        <MainGrid
          rows={rows}
          columns={columns}
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

function ProfessorProjectsPage() {
  const navbar = useNavbar();
  useEffect(() => {
    navbar?.setTitle('Projetos de Pesquisa');
  }, [navbar]);
  const { id } = useParams();

  return (
    <ProfessorDiv>
      <ProfessorInfo paramId={Number(id)} />
      <ProfessorGrid>
        <ProfessorProjectsTable paramId={Number(id)} />
      </ProfessorGrid>
    </ProfessorDiv>
  );
}

export default ProfessorProjectsPage;
