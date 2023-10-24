import { DataGrid, GridColDef, ptBR } from '@mui/x-data-grid';
import { toast, useNavbar } from '@cincoders/cinnamon';
import { useState, useEffect, useCallback } from 'react';
import { Modal, Grow } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { XMLDiv, DataDiv, ButtonsDiv, ImportButton, CardType, AnimatedRefreshButton } from './styles';
import { ImportXmlService } from '../../services/ImportXmlService';
import { renderImportStatus } from '../../components/ImportStatus';
// import { renderReprocess } from 'ImportXml';

import ImportCard from '../../components/ImportCard';
import { ImportXmlRows } from '../../types/Xml.d';

function ImportXml() {
  const navbar = useNavbar();
  const [loading, setLoading] = useState<boolean>(true);
  const [rows, setRows] = useState<ImportXmlRows[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [pageState, setPageState] = useState({
    page: 1,
    total: 0,
    isLoading: false,
    pageSize: 25,
  });
  const [firstRowByProfessor, setFirstRowByProfessor] = useState<{ [professor: string]: ImportXmlRows }>({});
  const [isRotating, setIsRotating] = useState(false);

  const handleButtonClick = () => {
    setIsRotating(true);

    // Add your custom logic or API call here

    // Reset the rotation after a delay (e.g., 2 seconds)
    setTimeout(() => {
      setIsRotating(false);
    }, 2000);
  };
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Arquivo',
      headerAlign: 'center',
      align: 'center',
      description: 'Nome do arquivo',
      flex: 7,
    },
    {
      field: 'professor',
      headerName: 'Professor',
      headerAlign: 'center',
      align: 'center',
      description: 'Professor cujo XML foi importado',
      flex: 11,
      type: 'string',
    },
    {
      field: 'status',
      headerName: 'Status',
      renderCell: renderImportStatus,
      headerAlign: 'center',
      align: 'center',
      description: 'Status da importação',
      flex: 6,
    },
    {
      field: 'importTime',
      headerName: 'Tempo da importação',
      headerAlign: 'center',
      align: 'center',
      description: 'Duração de tempo que o XML foi importado',
      flex: 7,
      type: 'string',
    },
    {
      field: 'includedAt',
      headerName: 'Data da importação',
      headerAlign: 'center',
      align: 'center',
      description: 'Data que o XML foi importado',
      flex: 10,
    },
    {
      field: 'user',
      headerName: 'Usuário',
      headerAlign: 'center',
      align: 'center',
      description: 'Usuário que realizou a importação',
      flex: 10,
    },
    {
      field: 'reload',
      headerName: '',
      headerAlign: 'center',
      align: 'center',
      flex: 2,
      renderCell: params => {
        // Check if the professor from the current row exists in firstRowByProfessor
        // console.log(params);
        if (params.row && params.row.professor) {
          const { professor } = params.row;
          // console.log(firstRowByProfessor);
          // console.log(professor);
          console.log(firstRowByProfessor);
          // console.log(professor);
          if (firstRowByProfessor[professor] === params.row) {
            return (
              <AnimatedRefreshButton
                isRotating={isRotating} // Pass the isRotating prop
                onClick={handleButtonClick}
                variant='text'
                startIcon={isRotating ? <RefreshIcon /> : null}
              >
                <RefreshIcon />
              </AnimatedRefreshButton>
            );
          }
        }
        return null;
      },
    },
  ];

  // function renderReprocess() {
  //   return (
  //     <button
  //       type='button'
  //       onClick={() => console.log('hey')}
  //       style={{ background: 'none', border: 'none', cursor: 'pointer' }}
  //     >
  //       <RefreshIcon />
  //     </button>
  //   );
  // }

  function dateInFull(date: Date) {
    const fullDate = date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    return fullDate;
  }
  const loadPaginatedData = useCallback(async (page: number, pageSize: number) => {
    setRows([]);
    setLoading(true);
    try {
      const { data } = await ImportXmlService.findAllImportedXmls(pageSize, page - 1);
      const xmls = data.data.map((elem, i) => ({
        id: i,
        professor: elem.professor,
        name: elem.name,
        status: elem.status,
        includedAt: dateInFull(new Date(elem.includedAt)),
        importTime: elem.importTime ? `${elem.importTime}s` : '',
        user: elem.user,
      }));

      await xmls.forEach(xml => {
        const { professor } = xml;

        if (professor && !(professor in firstRowByProfessor)) {
          // firstRowByProfessor[professor] = xml;
          // Instead of modifying `firstRowByProfessor` directly, update it using `setFirstRowByProfessor`.
          setFirstRowByProfessor(prevData => {
            const newData = { ...prevData };

            if (professor) {
              if (!(professor in newData)) {
                newData[professor] = xml;
              }
            }

            return newData;
          });
        }
      });
      console.log(firstRowByProfessor);
      setPageState(currentValue => ({ ...currentValue, total: data.totalElements }));
      setRows(xmls);
    } catch {
      toast.error('Não foi possível carregar o histórico de importações. Tente novamente mais tarde.', {
        containerId: 'page',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    navbar?.setTitle('Importação de XML');
  }, [navbar]);

  useEffect(() => {
    loadPaginatedData(pageState.page, pageState.pageSize);
  }, [pageState.pageSize, pageState.page, loadPaginatedData]);

  return (
    <XMLDiv>
      <DataDiv>
        <DataGrid
          columns={columns}
          rows={rows}
          loading={loading}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          rowCount={pageState.total}
          rowHeight={55}
          onPageChange={(newPage: number) => {
            setPageState({ ...pageState, page: newPage + 1 });
          }}
          onPageSizeChange={newPageSize => {
            setPageState({ ...pageState, pageSize: newPageSize });
          }}
          page={pageState.page - 1}
          paginationMode='server'
          pageSize={pageState.pageSize}
          rowsPerPageOptions={[25, 50, 100]}
          sx={{
            '&>.MuiDataGrid-main': {
              '&>.MuiDataGrid-columnHeaders': {
                outline: 0,
              },
              '& div div div div >.MuiDataGrid-cell': {
                outline: 0,
              },
            },
          }}
        />
      </DataDiv>
      <ButtonsDiv>
        <ImportButton
          type='button'
          variant='contained'
          size='large'
          onClick={() => {
            setOpen(!open);
          }}
        >
          Realizar Importação
        </ImportButton>
      </ButtonsDiv>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Grow in={open} {...(open ? { timeout: 500 } : {})}>
          <CardType>
            <ImportCard
              handleClose={() => {
                setOpen(false);
                loadPaginatedData(pageState.page, pageState.pageSize);
              }}
            />
          </CardType>
        </Grow>
      </Modal>
    </XMLDiv>
  );
}

export default ImportXml;
