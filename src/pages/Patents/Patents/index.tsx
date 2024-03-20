import { toast, useNavbar } from '@cincoders/cinnamon';
import { GridColDef, ptBR } from '@mui/x-data-grid';
import { Divider, FormControlLabel, Grid } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { PatentsDTO } from '../../../types/Patents.d';
import { PatentService } from '../../../services/PatentService';
import { showErrorStatus } from '../../../utils/showErrorStatus';
import { GridContainer, MainGrid, ProfessorsGrid, TableDiv } from '../../../components/TableStyles/styles';
import { ButtonsGrid } from '../../../components/ButtonsGrid/styles';
import { RedSwitch } from '../../../components/RedSwitch';
import { renderHeaderTooltip } from '../../../components/HeaderTooltip';
import { CustomToolbar } from '../../../components/CustomToolbar';
import { Links } from '../../../types/enums';
import { LinkButton } from '../../../components/LinkButton';

const columns: GridColDef[] = [
  {
    field: 'year',
    headerName: 'ANO',
    description: 'Ano da patente',
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
        route = Links.PROFESSOR_PATENTS.replace(':id', (params.row.professorId as number).toString());
      }
      return <LinkButton title={params.value} route={route} />;
    },
    renderHeader: renderHeaderTooltip,
  },
  {
    field: 'total',
    headerName: 'TOTAL',
    description: 'Total de patentes',
    headerAlign: 'center',
    align: 'center',
    flex: 20,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },

  {
    field: 'totalInventionPatents',
    headerName: 'PATENTES DE INVENÇÃO',
    description: 'Total de patentes de invenção',
    headerAlign: 'center',
    align: 'center',
    flex: 20,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },
  {
    field: 'totalUtilityModelPatents',
    headerName: 'MODELOS DE UTILIDADE',
    description: 'Total de modelos de utilidade',
    headerAlign: 'center',
    align: 'center',
    flex: 20,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },

  {
    field: 'totalDepositPatents',
    headerName: 'DEPÓSITOS',
    description: 'Total de depósitos',
    headerAlign: 'center',
    align: 'center',
    flex: 20,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },
  {
    field: 'totalGrantPatents',
    headerName: 'CONCESSÕES',
    description: 'Total de concessões',
    headerAlign: 'center',
    align: 'center',
    flex: 20,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },
  {
    field: 'totalLicensePatents',
    headerName: 'LICENÇAS',
    description: 'Total de licenças',
    headerAlign: 'center',
    align: 'center',
    flex: 20,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },
  {
    field: 'brazilianPatents',
    headerName: 'BRASILEIRAS',
    description: 'Total de patentes brasileiras',
    headerAlign: 'center',
    align: 'center',
    flex: 20,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },
  {
    field: 'internationalPatents',
    headerName: 'INTERNACIONAIS',
    description: 'Total de patentes internacionais',
    headerAlign: 'center',
    align: 'center',
    flex: 20,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },
];

function PatentsTable() {
  const [rows, setRows] = useState<PatentsDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [checkedYear, setCheckedYear] = useState<boolean>(true);
  const [checkedProfessor, setCheckedProfessor] = useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      setRows([]);
      setLoading(true);
      try {
        const response = await PatentService.getPatents(checkedYear, checkedProfessor);
        console.log(response.data);
        if (response.status === 200) {
          const { data } = response;

          if (checkedProfessor) {
            const newPatentData: PatentsDTO[] = data.map((patent, index) => ({
              id: index,
              year: patent.year,
              professorId: patent.professorId,
              professorName: patent.professorName,
              total: patent.total,
              totalInventionPatents: patent.totalInventionPatents,
              totalUtilityModelPatents: patent.totalUtilityModelPatents,
              totalDepositPatents: patent.totalDepositPatents,
              totalGrantPatents: patent.totalGrantPatents,
              totalLicensePatents: patent.totalLicensePatents,
              brazilianPatents: patent.brazilianPatents,
              internationalPatents: patent.internationalPatents,
            }));
            setRows(newPatentData);
          } else {
            const newPatentData: PatentsDTO[] = data.map((patent, index) => ({
              id: index,
              year: patent.year,
              total: patent.total,
              totalInventionPatents: patent.totalInventionPatents,
              totalUtilityModelPatents: patent.totalUtilityModelPatents,
              totalDepositPatents: patent.totalDepositPatents,
              totalGrantPatents: patent.totalGrantPatents,
              totalLicensePatents: patent.totalLicensePatents,
              brazilianPatents: patent.brazilianPatents,
              internationalPatents: patent.internationalPatents,
            }));
            setRows(newPatentData);
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
      {/* <h1>Patents Table</h1> */}
    </GridContainer>
  );
}

function PatentsPage() {
  const navbar = useNavbar();

  useEffect(() => {
    navbar?.setTitle('Patentes');
  }, [navbar]);
  return (
    <ProfessorsGrid>
      <PatentsTable />
    </ProfessorsGrid>
  );
}

export default PatentsPage;
