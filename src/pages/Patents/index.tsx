import { toast, useNavbar } from '@cincoders/cinnamon';
import { GridColDef, ptBR } from '@mui/x-data-grid';
import { Divider, FormControlLabel, Grid } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { PatentsDTO } from '../../types/Patents.d';
import { PatentService } from '../../services/PatentService';
import { showErrorStatus } from '../../utils/showErrorStatus';
import { GridContainer, MainGrid, ProfessorsGrid, TableDiv } from '../../components/TableStyles/styles';
import { ButtonsGrid } from '../../components/ButtonsGrid/styles';
import { RedSwitch } from '../../components/RedSwitch';
import { renderHeaderTooltip } from '../../components/HeaderTooltip';
import { CustomToolbar } from '../../components/CustomToolbar';

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
    headerName: 'PROFESSOR',
    description: 'Nome do professor',
    headerAlign: 'center',
    flex: 30,
    renderCell: params => params.value,
    renderHeader: renderHeaderTooltip,
  },
  {
    field: 'title',
    headerName: 'TÍTULO',
    description: 'Título da patente',
    headerAlign: 'center',
    flex: 30,
    renderCell: params => params.value,
    renderHeader: renderHeaderTooltip,
  },
  {
    field: 'authors',
    headerName: 'AUTORES',
    description: 'Autores da patente',
    headerAlign: 'center',
    flex: 30,
    renderCell: params => params.value,
    renderHeader: renderHeaderTooltip,
  },
  {
    field: 'country',
    headerName: 'PAÍS',
    description: 'País da patente',
    headerAlign: 'center',
    flex: 10,
    renderCell: params => params.value,
    renderHeader: renderHeaderTooltip,
  },
  {
    field: 'category',
    headerName: 'CATEGORIA',
    description: 'Categoria da patente',
    headerAlign: 'center',
    flex: 10,
    renderCell: params => params.value,
    renderHeader: renderHeaderTooltip,
  },
  {
    field: 'patentType',
    headerName: 'TIPO',
    description: 'Tipo da patente',
    headerAlign: 'center',
    flex: 10,
    renderCell: params => params.value,
    renderHeader: renderHeaderTooltip,
  },
  {
    field: 'registryCode',
    headerName: 'CÓDIGO',
    description: 'Código de registro da patente',
    headerAlign: 'center',
    flex: 10,
    renderCell: params => params.value,
    renderHeader: renderHeaderTooltip,
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
            const newPatentData: PatentsDTO[] = data.map(patent => ({
              id: patent.id,
              year: patent.year,
              professorId: patent.professorId,
              professorName: patent.professorName,
              total: patent.total,
              title: patent.title,
              authors: patent.authors,
              country: patent.country,
              category: patent.category,
              patentType: patent.patentType,
              registryCode: patent.registryCode,
            }));
            setRows(newPatentData);
          } else {
            const newPatentData: PatentsDTO[] = data.map(patent => ({
              id: patent.id,
              year: patent.year,
              total: patent.total,
              title: patent.title,
              authors: patent.authors,
              country: patent.country,
              category: patent.category,
              patentType: patent.patentType,
              registryCode: patent.registryCode,
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

  // const columns = [
  //   { field: 'id', headerName: 'ID', width: 70 },
  //   { field: 'year', headerName: 'Year', width: 130 },
  //   { field: 'professorId', headerName: 'Professor ID', width: 130 },
  //   { field: 'professorName', headerName: 'Professor Name', width: 130 },
  //   { field: 'title', headerName: 'Title', width: 130 },
  //   { field: 'authors', headerName: 'Authors', width: 130 },
  //   { field: 'country', headerName: 'Country', width: 130 },
  //   { field: 'category', headerName: 'Category', width: 130 },
  //   { field: 'patentType', headerName: 'Patent Type', width: 130 },
  //   { field: 'registryCode', headerName: 'Registry Code', width: 130 },
  //   { field: 'total', headerName: 'Total', width: 130 },
  // ];
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
