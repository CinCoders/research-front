import { Dialog, toast, ToastContainer } from '@cincoders/cinnamon';
import { Grow, Modal, TextField } from '@mui/material';
import { FormEvent, useState } from 'react';
import { ImportXmlService } from '../../services/ImportXmlService';
import { CardType, DataDiv, ImportButton, ImportLattesButton } from './styles';

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
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dialogOptions, setDialogOptions] = useState<CustomDialog>({
    title: '',
    type: 'information',
    content: '',
  });
  const [blockImport, setBlockImport] = useState(false);
  const [lattesProfessor, setLattesProfessor] = useState<string | null>(null);

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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!lattesProfessor || String(lattesProfessor).length !== 16) {
      showDialog('Código inválido', 'alert', 'O código Lattes deve conter 16 dígitos.');
      return;
    }
    setBlockImport(true);

    const response = await ImportXmlService.importProfessorById(lattesProfessor);
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
                <TextField
                  placeholder='Digite o código Lattes do professor'
                  type='number'
                  fullWidth
                  onChange={e => setLattesProfessor(e.target.value)}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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
