import { ChangeEvent, useEffect, useState } from 'react';
import { GridColDef, ptBR } from '@mui/x-data-grid';
import { Divider, FormControlLabel, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { toast, useNavbar } from '@cincoders/cinnamon';
import { showErrorStatus } from '../../../utils/showErrorStatus';
import { CustomToolbar } from '../../../components/CustomToolbar';
import { MainGrid, TableDiv, GridContainer, ProfessorGrid, ProfessorDiv } from '../../../components/TableStyles/styles';
import { renderHeaderTooltip } from '../../../components/HeaderTooltip';
import { PublicationsService } from '../../../services/PublicationsService';
import { RedSwitch } from '../../../components/RedSwitch';
import { renderCellExpand } from '../../../components/EllipsisText';
import { renderCheckIcon } from '../../../components/CheckIcon';
import { ProfessorPublications } from '../../../types/Publications.d';
import { ButtonsGrid } from '../../../components/ButtonsGrid/styles';
import ProfessorInfo from '../../../components/ProfessorInfo';

interface ParamsProps {
  paramId: number;
}

const columns: GridColDef[] = [
  {
    field: 'year',
    headerName: 'ANO',
    headerAlign: 'center',
    align: 'center',
    description: 'Ano da publicação',
    flex: 7,
    maxWidth: 60,
    renderHeader: renderHeaderTooltip,
    type: 'number',
    renderCell: params => params.value,
  },
  {
    field: 'title',
    headerName: 'TÍTULO',
    headerAlign: 'center',
    description: 'Título da publicação',
    flex: 30,
    renderCell: renderCellExpand,
    renderHeader: renderHeaderTooltip,
  },
  {
    field: 'eventJournal',
    headerName: 'EVENTO / PERIÓDICO',
    headerAlign: 'center',
    description: 'O nome do evento da conferência ou do periódico do artigo',
    flex: 30,
    renderCell: renderCellExpand,
    renderHeader: renderHeaderTooltip,
  },
  {
    field: 'acronymIssn',
    headerName: 'Sigla / ISSN',
    headerAlign: 'center',
    description: 'O nome da sigla da conferência ou do issn do artigo',
    maxWidth: 130,
    flex: 10,
    renderCell: renderCellExpand,
    renderHeader: renderHeaderTooltip,
  },
  {
    field: 'qualis',
    headerName: 'QUALIS',
    headerAlign: 'center',
    align: 'center',
    description: 'Indica o Qualis da publicação',
    flex: 7,
    maxWidth: 60,
    renderHeader: renderHeaderTooltip,
  },
  {
    field: 'isTop',
    headerName: 'TOP',
    headerAlign: 'center',
    align: 'center',
    description: 'Indica se a publicação é TOP',
    flex: 7,
    maxWidth: 60,
    renderCell: renderCheckIcon,
    renderHeader: renderHeaderTooltip,
    type: 'boolean',
  },
];

export function ProfessorPublicationsTable({ paramId }: ParamsProps) {
  const [rows, setRows] = useState<ProfessorPublications[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [checkedArticles, setCheckedArticles] = useState<boolean>(true);
  const [checkedConferences, setCheckedConferences] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      setRows([]);
      setLoading(true);
      try {
        const response = await PublicationsService.getProfessorPublications(
          paramId.toString(),
          checkedArticles,
          checkedConferences,
        );
        if (response.status === 200) {
          const { data } = response;
          const newData = data.map((element, index) => ({
            id: index,
            year: element.year,
            title: element.title,
            eventJournal: element.eventJournal,
            acronymIssn: element.acronymIssn,
            qualis: element.qualis,
            isTop: element.isTop,
          }));
          setRows(newData);
        } else {
          showErrorStatus(response.status);
        }
      } catch {
        toast.error('Não foi possível carregar as publicações. Tente novamente mais tarde.', { containerId: 'page' });
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [checkedArticles, checkedConferences, paramId]);

  const handleChangeArticles = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedArticles(event.target.checked);
  };

  const handleChangeConferences = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedConferences(event.target.checked);
  };

  return (
    <GridContainer>
      <ButtonsGrid>
        <Grid>
          <Divider> Filtrar </Divider>
          <FormControlLabel
            control={<RedSwitch checked={checkedArticles} onChange={handleChangeArticles} />}
            label='Periódicos'
          />
          <FormControlLabel
            control={<RedSwitch checked={checkedConferences} onChange={handleChangeConferences} />}
            label='Conferências'
          />
        </Grid>
      </ButtonsGrid>
      <TableDiv>
        <MainGrid
          rows={rows}
          columns={columns}
          loading={loading}
          columnVisibilityModel={{
            event: checkedConferences,
          }}
          components={{
            Toolbar: CustomToolbar,
          }}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        />
      </TableDiv>
    </GridContainer>
  );
}

function ProfessorPublicationsPage() {
  const navbar = useNavbar();
  const { id } = useParams();

  useEffect(() => {
    navbar?.setTitle('Publicações de Professor');
  }, [navbar]);

  return (
    <ProfessorDiv>
      <ProfessorInfo paramId={Number(id)} />
      <ProfessorGrid>
        <ProfessorPublicationsTable paramId={Number(id)} />
      </ProfessorGrid>
    </ProfessorDiv>
  );
}

export default ProfessorPublicationsPage;
