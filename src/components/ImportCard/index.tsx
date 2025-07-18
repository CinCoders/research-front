import { Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Dialog, toast, ToastContainer } from '@cincoders/cinnamon';
import { useState, FormEvent, ChangeEvent, ReactText } from 'react';
import { ImportXmlService } from '../../services/ImportXmlService';
import { ImportXmlProps, XMLProps } from '../../types/Xml.d';
import { XMLDiv, FilesButton, ImportButton, DataDiv, ButtonsDiv } from './styles';
import CircularWithValueLabel from '../CircularProgressWithLabel';
import { ImportJsonService } from '../../services/ImportJsonService';

interface CustomDialog {
  title: string;
  type: 'information' | 'alert' | 'decision' | 'confirmation' | 'error';
  content: string;
}

function ImportCard(props: { handleClose: () => void }) {
  const { handleClose } = props;
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dialogOptions, setDialogOptions] = useState<CustomDialog>({
    title: '',
    type: 'information',
    content: '',
  });
  const [progressValue, setProgressValue] = useState<number>(0);
  const [blockImport, setBlockImport] = useState(false);
  const [importXml, setImportXml] = useState<ImportXmlProps>({
    xmlFiles: undefined,
  });
  const [rows, setRows] = useState<XMLProps[]>([]);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Arquivo',
      headerAlign: 'center',
      description: 'Nome do arquivo',
      flex: 10,
    },
    {
      field: 'size',
      headerName: 'Tamanho',
      align: 'center',
      headerAlign: 'center',
      description: 'Tamanho do arquivo em KB',
      flex: 10,
      type: 'number',
      renderCell: params => `${params.value}KB`,
    },
  ];
  let id: ReactText | undefined;

  function showDialog(
    title: string,
    type: 'information' | 'alert' | 'decision' | 'confirmation' | 'error',
    content: string,
  ) {
    setOpenDialog(true);
    setDialogOptions({
      title,
      type,
      content,
    });
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    let flag = true;
    if (e.target.files && e.target.files?.length >= 1) {
      for (let i = 0; e.target.files.length > i; i += 1) {
        if (
          e.target.files[i].type !== 'text/xml' &&
          e.target.files[i].type !== 'application/x-zip-compressed' &&
          e.target.files[i].type !== 'application/zip' &&
          e.target.files[i].type !== 'application/json' 
        ) {
          flag = false;
          showDialog('Tipo do arquivo incorreto', 'alert', 'O tipo do arquivo deve ser XML ou ZIP');
        }
      }
      if (flag) {
        const newRows: XMLProps[] = [];
        setImportXml({
          ...importXml,
          xmlFiles: e.target.files,
        });
        for (let i = 0; i < e.target.files.length; i += 1) {
          // bytes to kb
          const fileSize = Math.round(e.target.files[i].size / 1024);
          newRows.push({
            id: i,
            name: e.target.files[i].name,
            size: fileSize,
          });
        }
        setRows(newRows);
        setProgressValue(0);
      }
    }
  }

  async function updateProgress(progress: number) {
    if (id) {
      setProgressValue(progress);
      toast.update(id, {
        render: () => <CircularWithValueLabel progressValue={progress} text='Os arquivos estão sendo enviados!' />,
        icon: false,
        closeOnClick: false,
        closeButton: false,
        containerId: 'popup',
        type: 'info',
      });
    }
  }

  function toastMessage(message: string, type: 'success' | 'error' | 'info', hideProgressBar: boolean) {
    if (id) {
      toast.update(id, {
        render: message,
        icon: true,
        hideProgressBar,
        type,
        autoClose: 5000,
        closeOnClick: true,
        onClose: () => handleClose(),
        containerId: 'popup',
      });
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBlockImport(true);
    if (!importXml.xmlFiles?.length) {
      showDialog('Nenhum arquivo selecionado', 'alert', 'Não há arquivos para serem importados');
      setBlockImport(false);
      setProgressValue(0);
      return;
    }
    id = toast(
      () => <CircularWithValueLabel progressValue={progressValue} text='Os arquivos estão sendo enviados!' />,
      {
        icon: false,
        closeOnClick: false,
        closeButton: false,
        hideProgressBar: true,
        containerId: 'popup',
        type: 'info',
      },
    );
    const file = importXml.xmlFiles?.[0];
    let response;
    if (file.type === 'application/json') {
      response = await ImportJsonService.importJson(updateProgress, { jsonFile: file });
    } else {
      response = await ImportXmlService.importXml(updateProgress, { xmlFiles: importXml.xmlFiles });
    }

    if (response && response.status === 201) {
      toastMessage('Arquivos enviados com sucesso!', 'success', false);
    } else if (response.status === 406) {
      toastMessage(
        'Formato inválido: o arquivo JSON deve conter um array de objetos.',
        'error',
        true,
      );
    } else {
      toastMessage('Ocorreu um erro ao tentar enviar os arquivos.', 'error', true);
    }
    setBlockImport(false);
    setProgressValue(0);
  }

  return (
    <>
      <Dialog
        visibility={openDialog}
        setVisibility={setOpenDialog}
        title={dialogOptions.title}
        type={dialogOptions.type}
      >
        {dialogOptions.content}
      </Dialog>

      <XMLDiv m='auto' mt='2em' mb='2em' pl='30px' pr='30px' sx={{ minWidth: '50vw' }}>
        <ToastContainer
          topInitialPosition={0}
          toastProps={{ position: 'top-center', enableMultiContainer: true, containerId: 'popup' }}
        />
        <form onSubmit={e => handleSubmit(e)}>
          <DataDiv>
            <DataGrid columns={columns} rows={rows} />
          </DataDiv>
          <p style={{ fontSize: '0.7em' }}>**Apenas arquivos do tipo xml, json ou zip de xmls são permitidos</p>
          <ButtonsDiv>
            <label htmlFor='contained-button-file'>
              <input
                style={{ display: 'none' }}
                type='file'
                id='contained-button-file'
                multiple
                accept='.zip, .xml, .json'
                onChange={e => {
                  onChange(e);
                }}
              />
              <Button variant='outlined' component='span' style={FilesButton}>
                <UploadFileIcon fontSize='medium' />
              </Button>
            </label>
            <ImportButton type='submit' variant='contained' size='large' disabled={blockImport}>
              Importar
            </ImportButton>
          </ButtonsDiv>
        </form>
      </XMLDiv>
    </>
  );
}

export default ImportCard;
