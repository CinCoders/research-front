import { ChangeEvent, useEffect, useState } from 'react';
import { GridColDef, ptBR } from '@mui/x-data-grid';
import { Divider, FormControl, FormControlLabel, Grid } from '@mui/material';
import { toast, useNavbar } from '@cincoders/cinnamon';
import { showErrorStatus } from '../../../utils/showErrorStatus';
import { CustomToolbar } from '../../../components/CustomToolbar';
import { MainGrid, TableDiv, GridContainer, ProfessorsGrid } from '../../../components/TableStyles/styles';
import { renderHeaderTooltip } from '../../../components/HeaderTooltip';
import { LinkButton } from '../../../components/LinkButton';
import { PublicationsService } from '../../../services/PublicationsService';
import { RedSwitch } from '../../../components/RedSwitch';
import { Publications } from '../../../types/Publications.d';
import { ButtonsGrid } from '../../../components/ButtonsGrid/styles';
import { Links } from '../../../types/enums';
import { TextInput, TextInputWrapper } from '../../../components/InputYear/styles';
import useDebouncedState from '../../../utils/useDebouncedState';

const columns: GridColDef[] = [
  {
    field: 'year',
    headerName: 'ANO',
    headerAlign: 'center',
    align: 'center',
    flex: 10,
    description: 'Ano',
    renderHeader: renderHeaderTooltip,
    type: 'number',
    renderCell: params => params.value,
  },
  {
    field: 'professorName',
    headerName: 'PROFESSOR',
    headerAlign: 'center',
    description: 'Nome do professor',
    flex: 40,
    renderCell: params => (
      <LinkButton
        title={params.value}
        route={Links.PROFESSOR_PUBLICATIONS.replace(':id', params.row.professorId as string)}
      />
    ),
    renderHeader: renderHeaderTooltip,
  },
  {
    field: 'total',
    headerName: 'TOTAL',
    headerAlign: 'center',
    align: 'center',
    description: 'Total',
    flex: 15,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },
  {
    field: 'top',
    headerName: 'TOP',
    headerAlign: 'center',
    align: 'center',
    description: 'Total de TOP',
    flex: 10,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },
  {
    field: 'a1',
    headerName: 'A1',
    headerAlign: 'center',
    align: 'center',
    description: 'Total de A1',
    flex: 10,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },
  {
    field: 'a2',
    headerName: 'A2',
    headerAlign: 'center',
    align: 'center',
    description: 'Total de A2',
    flex: 10,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },
  {
    field: 'a3',
    headerName: 'A3',
    headerAlign: 'center',
    align: 'center',
    description: 'Total de A3',
    flex: 10,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },
  {
    field: 'a4',
    headerName: 'A4',
    headerAlign: 'center',
    align: 'center',
    description: 'Total de A4',
    flex: 10,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },
  {
    field: 'b1',
    headerName: 'B1',
    headerAlign: 'center',
    align: 'center',
    description: 'Total de B1',
    flex: 10,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },
  {
    field: 'b2',
    headerName: 'B2',
    headerAlign: 'center',
    align: 'center',
    description: 'Total de B2',
    flex: 10,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },
  {
    field: 'b3',
    headerName: 'B3',
    headerAlign: 'center',
    align: 'center',
    description: 'Total de B3',
    flex: 10,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },
  {
    field: 'b4',
    headerName: 'B4',
    headerAlign: 'center',
    align: 'center',
    description: 'Total de B4',
    flex: 10,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },
  {
    field: 'b5',
    headerName: 'B5',
    headerAlign: 'center',
    align: 'center',
    description: 'Total de B5',
    flex: 10,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },
  {
    field: 'c',
    headerName: 'C',
    headerAlign: 'center',
    align: 'center',
    description: 'Total de C',
    flex: 10,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },
  {
    field: 'noQualis',
    headerName: 'S/Q',
    headerAlign: 'center',
    align: 'center',
    description: 'Total sem Qualis',
    flex: 10,
    renderHeader: renderHeaderTooltip,
    type: 'number',
  },
];

function Table() {
  const [rows, setRows] = useState<Publications[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [checkedProfessor, setCheckedProfessor] = useState<boolean>(false);
  const [checkedYear, setCheckedYear] = useState<boolean>(true);
  const [checkedArticles, setCheckedArticles] = useState<boolean>(true);
  const [checkedConferences, setCheckedConferences] = useState<boolean>(true);

  const [startYear, debouncedStartYear, handleStartYearChange] = useDebouncedState();
  const [endYear, debouncedEndYear, handleEndYearChange] = useDebouncedState();

  useEffect(() => {
    async function loadData() {
      setRows([]);
      setLoading(true);
      try {
        const response = await PublicationsService.getPublications(
          checkedYear,
          checkedProfessor,
          checkedArticles,
          checkedConferences,
          debouncedStartYear || 1950,
          debouncedEndYear || new Date().getFullYear(),
        );
        if (response.status === 200) {
          const { data } = response;
          if (checkedProfessor) {
            const newData: Publications[] = data.map((element, index) => ({
              id: index,
              professorId: element.professorId,
              professorName: element.professorName,
              year: element.year,
              total: element.total,
              top: element.top,
              a1: element.a1,
              a2: element.a2,
              a3: element.a3,
              a4: element.a4,
              b1: element.b1,
              b2: element.b2,
              b3: element.b3,
              b4: element.b4,
              b5: element.b5,
              c: element.c,
              noQualis: element.noQualis,
            }));
            setRows(newData);
          } else {
            const newData: Publications[] = data.map((element, index) => ({
              id: index,
              professorId: element.professorId,
              professorName: element.professorName,
              year: element.year,
              total: element.total,
              top: element.top,
              a1: element.a1,
              a2: element.a2,
              a3: element.a3,
              a4: element.a4,
              b1: element.b1,
              b2: element.b2,
              b3: element.b3,
              b4: element.b4,
              b5: element.b5,
              c: element.c,
              noQualis: element.noQualis,
            }));
            setRows(newData);
          }
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
  }, [checkedYear, checkedProfessor, checkedArticles, checkedConferences, debouncedEndYear, debouncedStartYear]);

  const handleChangeYear = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedYear(event.target.checked);
  };

  const handleChangeProfessor = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedProfessor(event.target.checked);
  };

  const handleChangeArticles = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedArticles(event.target.checked);
  };

  const handleChangeConferences = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedConferences(event.target.checked);
  };

  return (
    <GridContainer>
      <ButtonsGrid>
        <Grid marginBottom={{ xs: '90px', sm: '0.5rem' }}>
          <Divider> Agrupar </Divider>
          <Grid container sx={{ width: '100%' }}>
            <Grid item xs={12} lg={5} padding={{ sm: '2px', md: '0' }}>
              <FormControlLabel control={<RedSwitch checked={checkedYear} onChange={handleChangeYear} />} label='Ano' />
            </Grid>
            <Grid item xs={12} lg={7}>
              <FormControlLabel
                control={<RedSwitch checked={checkedProfessor} onChange={handleChangeProfessor} />}
                label='Professor'
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid sx={{ marginX: '5%' }}>
          <Divider> Filtrar </Divider>
          <Grid container sx={{ width: '100%', marginX: 0 }}>
            <Grid item container columnSpacing={1} xs={12} sm={6}>
              <FormControlLabel
                control={<RedSwitch checked={checkedArticles} onChange={handleChangeArticles} />}
                label='Periódicos'
              />
              <FormControlLabel
                control={<RedSwitch checked={checkedConferences} onChange={handleChangeConferences} />}
                label='Conferências'
              />
            </Grid>
            <Grid
              rowSpacing={1}
              item
              container
              columnSpacing={1}
              alignItems='center'
              justifyContent='center'
              xs={12}
              sm={6}
            >
              <Grid item xs={12} lg={6}>
                <FormControl fullWidth>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ display: 'block', width: '100px' }}>Ano Inicial:</span>
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
              <Grid item xs={12} lg={6}>
                <FormControl fullWidth>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ display: 'block', width: '100px' }}>Ano Final:</span>
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

function PublicationsPage() {
  const navbar = useNavbar();
  useEffect(() => {
    navbar?.setTitle('Publicações');
  }, [navbar]);
  return (
    <ProfessorsGrid>
      <Table />
    </ProfessorsGrid>
  );
}

export default PublicationsPage;
