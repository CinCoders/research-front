import { DataGrid, GridColDef, ptBR } from '@mui/x-data-grid';
import { toast, useNavbar } from '@cincoders/cinnamon';
import { useState, useEffect, useCallback } from 'react';
import { Modal, Grow } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { XMLDiv, DataDiv, ButtonsDiv, ImportButton, CardType, AnimatedRefreshButton } from './styles';
import { ImportXmlService } from '../../services/ImportXmlService';
import { ImportJsonService } from '../../services/ImportJsonService';
import { renderImportStatus } from '../../components/ImportStatus';
import ImportCard from '../../components/ImportCard';


type ImportItem = {
  id: string;
  professor?: string;
  name: string;
  status: string;
  includedAt: string;
  importTime?: string;
  user: string;
  storedXml?: boolean;
  storedJson?: boolean;
  type: 'xml' | 'json';
};

function ImportXml() {
  const navbar = useNavbar();
  const [loading, setLoading] = useState<boolean>(true);
  const [rows, setRows] = useState<ImportItem[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [pageState, setPageState] = useState({
    page: 1,
    total: 0,
    isLoading: false,
    pageSize: 25,
  });
  const [rotatingButtons, setRotatingButtons] = useState<{ [id: string]: boolean }>({});

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
      const [xmlRes, jsonRes] = await Promise.all([
        ImportXmlService.findAllImportedXmls(pageSize, page - 1),
        ImportJsonService.findAllJsons(pageSize, page - 1),
      ]);


      const xmls = xmlRes.data.data.map((elem: any): ImportItem => ({
        id: elem.id,
        professor: elem.professor,
        name: elem.name,
        status: elem.status,
        includedAt: dateInFull(new Date(elem.includedAt)),
        importTime: elem.importTime ? `${elem.importTime}s` : '',
        user: elem.user,
        storedXml: elem.storedXml,
        type: 'xml',
      }));


      const jsons = jsonRes.data.data.map((elem: any): ImportItem => ({
        id: elem.id,
        professor: elem.professor ?? '', 
        name: elem.name,
        status: elem.status,
        includedAt: dateInFull(new Date(elem.includedAt)),
        importTime: elem.importTime ? `${elem.importTime}s` : '',
        user: elem.user,
        storedJson: elem.storedJson,
        type: 'json',
      }));

      const combined = [...xmls, ...jsons];

      setRows(combined);
      setPageState(current => ({ ...current, total: xmlRes.data.totalElements + jsonRes.data.totalElements }));
    } catch {
      toast.error('Não foi possível carregar o histórico de importações. Tente novamente mais tarde.', {
        containerId: 'page',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const handleReprocessClick = async (id: string, type: 'xml' | 'json') => {
    setRotatingButtons(prev => ({ ...prev, [id]: true }));
    try {
      if (type === 'xml') {
        await ImportXmlService.reprocessXML(id);
      } else {
        await ImportJsonService.reprocessJson(id);
      }
      await loadPaginatedData(1, pageState.pageSize);
    } catch {
      toast.error('Não foi possível reprocessar o arquivo. Tente novamente mais tarde.', {
        containerId: 'page',
      });
    } finally {
      setRotatingButtons(prev => ({ ...prev, [id]: false }));
    }
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
      description: 'Usuário que realizou a i  mportação',
      flex: 10,
    },
    {
      field: 'reload',
      headerName: '',
      headerAlign: 'center',
      align: 'center',
      flex: 2,
      renderCell: params => {
        const { status, storedXml, id, type } = params.row;
        if (type === 'xml' && storedXml) {
          return (
            <AnimatedRefreshButton
              isrotating={['In Progress', 'Pending'].includes(status) || rotatingButtons[id]}
              onClick={() => handleReprocessClick(id, 'xml')}
              variant='text'
              style={{ pointerEvents: ['In Progress', 'Pending'].includes(status) || rotatingButtons[id] ? 'none' : 'auto' }}
              sx={{ '&:hover': { backgroundColor: 'initial' } }}
              disableRipple
            >
              <RefreshIcon />
            </AnimatedRefreshButton>
          );
        } else if (type === 'json') {
          return (
            <AnimatedRefreshButton
              isrotating={['In Progress', 'Pending'].includes(status) || rotatingButtons[id]}
              onClick={() => handleReprocessClick(id, 'json')}
              variant='text'
              style={{ pointerEvents: ['In Progress', 'Pending'].includes(status) || rotatingButtons[id] ? 'none' : 'auto' }}
              sx={{ '&:hover': { backgroundColor: 'initial' } }}
              disableRipple
            >
              <RefreshIcon />
            </AnimatedRefreshButton>
          );
        }
        return null;
      },
    },
  ];

  useEffect(() => {
    navbar?.setTitle('Importação de XML e JSON');
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
          onPageChange={(newPage: number) => setPageState({ ...pageState, page: newPage + 1 })}
          onPageSizeChange={newPageSize => setPageState({ ...pageState, pageSize: newPageSize })}
          page={pageState.page - 1}
          paginationMode='server'
          pageSize={pageState.pageSize}
          rowsPerPageOptions={[25, 50, 100]}
          sx={{
            '&>.MuiDataGrid-main': {
              '&>.MuiDataGrid-columnHeaders': { outline: 0 },
              '& div div div div >.MuiDataGrid-cell': { outline: 0 },
            },
          }}
          key={pageState.page}
        />
      </DataDiv>
      <ButtonsDiv>
        <ImportButton type='button' variant='contained' size='large' onClick={() => setOpen(!open)}>
          Realizar Importação
        </ImportButton>
      </ButtonsDiv>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Grow in={open} {...(open ? { timeout: 500 } : {})}>
          <CardType>
            <ImportCard handleClose={() => {
              setOpen(false);
              loadPaginatedData(pageState.page, pageState.pageSize);
            }} />
          </CardType>
        </Grow>
      </Modal>
    </XMLDiv>
  );
}

export default ImportXml;
