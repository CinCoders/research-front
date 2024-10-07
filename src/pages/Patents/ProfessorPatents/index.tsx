import { toast, useNavbar } from '@cincoders/cinnamon';
import { useEffect, useState } from 'react';
import { GridColDef, ptBR } from '@mui/x-data-grid';
import { useParams } from 'react-router-dom';
import { ProfessorPatents } from '../../../types/Patents.d';
import { PatentService } from '../../../services/PatentService';
import { showErrorStatus } from '../../../utils/showErrorStatus';
import { GridContainer, MainGrid, ProfessorDiv, ProfessorGrid, TableDiv } from '../../../components/TableStyles/styles';
import { CustomToolbar } from '../../../components/CustomToolbar';
import ProfessorInfo from '../../../components/ProfessorInfo';
import { renderHeaderTooltip } from '../../../components/HeaderTooltip';
import { renderCellExpand } from '../../../components/EllipsisText';

interface ParamsProps {
  paramId: number;
}

const columns: GridColDef[] = [
  {
    field: 'developmentYear',
    headerName: 'ANO',
    headerAlign: 'center',
    align: 'center',
    description: 'Ano de desenvolvimento da patente',
    flex: 5,
    renderHeader: renderHeaderTooltip,
    type: 'number',
    renderCell: params => params.value,
  },
  {
    field: 'title',
    headerName: 'TÍTULO',
    headerAlign: 'center',
    align: 'center',
    description: 'Título da patente',
    flex: 30,
    renderCell: renderCellExpand,
    renderHeader: renderHeaderTooltip,
  },
  {
    field: 'authors',
    headerName: 'AUTORES',
    headerAlign: 'center',
    description: 'Autores da patente',
    flex: 20,
    renderHeader: renderHeaderTooltip,
    renderCell: renderCellExpand,
  },
  {
    field: 'country',
    headerName: 'PAÍS',
    headerAlign: 'center',
    description: 'País da patente',
    flex: 10,
    align: 'center',
    renderHeader: renderHeaderTooltip,
    renderCell: params => params.value,
  },
  {
    field: 'category',
    headerName: 'CATEGORIA',
    headerAlign: 'center',
    description: 'Categoria da patente',
    flex: 10,
    align: 'center',
    renderHeader: renderHeaderTooltip,
    renderCell: params => params.value,
  },
  {
    field: 'patentType',
    headerName: 'TIPO DE PATENTE',
    headerAlign: 'center',
    align: 'center',
    description: 'Tipo de patente',
    flex: 10,
    renderHeader: renderHeaderTooltip,
    renderCell: params => params.value,
  },
  {
    field: 'registryCode',
    headerName: 'CÓDIGO DE REGISTRO',
    headerAlign: 'center',
    description: 'Código de registro da patente',
    flex: 10,
    align: 'center',
    renderHeader: renderHeaderTooltip,
    renderCell: params => params.value,
  },
];

export function ProfessorPatentsTable({ paramId }: ParamsProps) {
  const [rows, setRows] = useState<ProfessorPatents[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  function formatString(input: string) {
    let formatted = '';
    if (input === 'PRIVILEGIO_DE_INOVACAO_PI') {
      formatted = 'Privilégio de Inovação';
    } else if (input === 'MODELO_DE_UTILIDADE_MU') {
      formatted = 'Modelo de Utilidade';
    }
    return formatted;
  }
  useEffect(() => {
    async function loadData() {
      setRows([]);
      setLoading(true);
      try {
        const response = await PatentService.getProfessorPatents(paramId);
        if (response.status === 200) {
          const { data } = response;

          const newData: ProfessorPatents[] = data.map((patent, index) => ({
            id: index,
            title: patent.title,
            authors: patent.authors,
            developmentYear: patent.developmentYear,
            country: patent.country,
            category: patent.category,
            patentType: formatString(patent.patentType),
            registryCode: patent.registryCode,
          }));
          setRows(newData);
        } else {
          showErrorStatus(response.status);
        }
      } catch (error) {
        toast.error('Não foi possível carregar as patentes. Tente novamente mais tarde.', { containerId: 'page' });
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

function ProfessorPatentsPage() {
  const navbar = useNavbar();
  const { id } = useParams();

  useEffect(() => {
    navbar?.setTitle('Patentes');
  }, [navbar]);
  return (
    <ProfessorDiv>
      <ProfessorInfo paramId={Number(id)} />
      <ProfessorGrid>
        <ProfessorPatentsTable paramId={Number(id)} />
      </ProfessorGrid>
    </ProfessorDiv>
  );
}

export default ProfessorPatentsPage;
