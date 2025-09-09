import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { ReactText, useState } from 'react';
import { toast } from '@cincoders/cinnamon';
import { ImportButton } from './styles';
import { ImportXmlService } from '../../services/ImportXmlService';

function ImportCardAll() {
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let id: ReactText | undefined;
  function toastMessage(message: string, type: 'success' | 'error' | 'info', hideProgressBar: boolean) {
    if (!id) {
      id = toast(message, {
        type,
        hideProgressBar,
        autoClose: 5000,
        closeOnClick: true,
        containerId: 'popup',
      });
    }
  }

  async function handleSubmit() {
    const response = await ImportXmlService.importAllProfessors();
    if (response.status === 200) {
      toastMessage('Importação iniciada com sucesso!', 'success', true);
    } else {
      toastMessage('Erro ao iniciar a importação!', 'error', true);
    }
    handleClose();
  }

  return (
    <>
      <ImportButton type='button' variant='contained' size='large' onClick={handleClickOpen}>
        Importar Todos
      </ImportButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Tem certeza?</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Ao clicar em confirmar, os CVs Lattes de todos os professores serão importados.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ImportCardAll;
