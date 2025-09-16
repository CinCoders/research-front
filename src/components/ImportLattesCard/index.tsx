import { useState, FormEvent, useEffect, useCallback } from 'react';
import { Dialog, toast, ToastContainer } from '@cincoders/cinnamon';
import { DataGrid, GridColDef, ptBR } from '@mui/x-data-grid';
import { Modal, Grow } from '@mui/material';
import { ProfessorService } from '../../services/ProfessorService';
import { ImportButton, DataDiv, CardType, ImportLattesButton } from './styles';
import { ImportXmlService } from '../../services/ImportXmlService';
import type { ProfessorDetails } from '../../types/Professor';

interface CustomDialog {
  title: string;
  type: 'information' | 'alert' | 'decision' | 'confirmation' | 'error';
  content: string;
}

interface ImportLattesCardProps {
  loadPaginatedData: (page: number, pageSize: number) => void;
  pageState: { page: number; pageSize: number };
}

function ImportLattesCard({ loadPaginatedData, pageState }: Readonly<ImportLattesCardProps>) {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<{ id: string; identifier: string; professorName: string }[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dialogOptions, setDialogOptions] = useState<CustomDialog>({
    title: '',
    type: 'information',
    content: '',
  });
  const [blockImport, setBlockImport] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState<string | null>(null);

  const columns: GridColDef[] = [
    { field: 'identifier', headerName: 'Código Lattes', headerAlign: 'center', align: 'center', flex: 1 },
    { field: 'professorName', headerName: 'Professor', headerAlign: 'center', align: 'center', flex: 2 },
  ];

  function toastMessage(message: string, type: 'success' | 'error' | 'info', hideProgressBar: boolean) {
    toast(message, {
      icon: true,
      hideProgressBar,
      type,
      autoClose: 5000,
      closeOnClick: true,
      onClose: () => {
        setOpen(false);
        setBlockImport(false);
      },
      containerId: 'popup',
    });
  }

  function showDialog(
    title: string,
    type: 'information' | 'alert' | 'decision' | 'confirmation' | 'error',
    content: string,
  ) {
    setOpenDialog(true);
    setDialogOptions({ title, type, content });
  }

  const findAllProfessors = useCallback(async () => {
    setRows([]);
    try {
      const response = await ProfessorService.getProfessors();
      if (response.status === 200) {
        const data = response.data.map((prof: ProfessorDetails) => ({
          id: prof.identifier,
          identifier: prof.identifier,
          professorName: prof.professorName,
        }));
        setRows(data);
      }
    } catch {
      toastMessage('Erro ao carregar a lista de professores.', 'error', true);
    }
  }, []);

  useEffect(() => {
    if (open) findAllProfessors();
  }, [open, findAllProfessors]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedProfessor) {
      showDialog('Nenhum professor selecionado', 'alert', 'Selecione um professor para importar o currículo.');
      return;
    }
    setBlockImport(true);

    const response = await ImportXmlService.importProfessorById(selectedProfessor);
    if (response.status === 200) {
      toastMessage('Currículo importado com sucesso!', 'success', false);
    } else if (response.status === 404) {
      toastMessage('Professor não encontrado.', 'error', true);
    } else {
      toastMessage('Erro ao importar o currículo.', 'error', true);
    }
    loadPaginatedData(pageState.page, pageState.pageSize);
  }

  return (
    <>
      <ImportLattesButton type='button' variant='contained' size='large' onClick={() => setOpen(true)}>
        Importar Lattes
      </ImportLattesButton>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Grow in={open} {...(open ? { timeout: 500 } : {})}>
          <CardType>
            <Dialog
              visibility={openDialog}
              setVisibility={setOpenDialog}
              title={dialogOptions.title}
              type={dialogOptions.type}
            >
              {dialogOptions.content}
            </Dialog>

            <form onSubmit={handleSubmit}>
              <DataDiv m='auto' mt='2em' mb='2em' pl='30px' pr='30px' sx={{ minWidth: '50vw' }}>
                <ToastContainer
                  topInitialPosition={0}
                  toastProps={{ position: 'top-center', enableMultiContainer: true, containerId: 'popup' }}
                />
                <DataGrid
                  columns={columns}
                  rows={rows}
                  localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                  rowHeight={55}
                  autoHeight
                  pageSize={5}
                  onSelectionModelChange={ids => {
                    setSelectedProfessor(ids.length > 0 ? ids[0].toString() : null);
                  }}
                  sx={{
                    '&>.MuiDataGrid-main': {
                      '&>.MuiDataGrid-columnHeaders': { outline: 0 },
                      '& div div div div >.MuiDataGrid-cell': { outline: 0 },
                    },
                  }}
                />
                <ImportButton type='submit' variant='contained' size='large' disabled={blockImport}>
                  Importar
                </ImportButton>
              </DataDiv>
            </form>
          </CardType>
        </Grow>
      </Modal>
    </>
  );
}

export default ImportLattesCard;
