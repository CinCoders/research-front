import { GridColDef, ptBR } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import { Dialog, toast, useNavbar } from '@cincoders/cinnamon';
import { CustomToolbar } from '../../components/CustomToolbar';
import { MainGrid, ProfessorsGrid, TableDiv } from '../../components/TableStyles/styles';
import { ProfessorService } from '../../services/ProfessorService';
import { renderHeaderTooltip } from '../../components/HeaderTooltip';
import { ProfessorDetails } from '../../types/Professor.d';
import { LinkButton } from '../../components/LinkButton';
import { Links } from '../../types/enums';
import lattesLogo from '../../assets/icons/lattesLogo.svg';
import { showErrorStatus } from '../../utils/showErrorStatus';
import { LattesText } from '../../components/LattesText';
import { DeleteButton } from './deleteButton';

function Table() {
  const [rows, setRows] = useState<ProfessorDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [currentProfessor, setcurrentProfessor] = useState<ProfessorDetails | undefined>(undefined);

  function onClickDelete(professor: ProfessorDetails) {
    setShowDialog(!showDialog);
    setcurrentProfessor(professor);
  }

  const columns: GridColDef[] = [
    {
      field: 'professorName',
      headerName: 'NOME',
      headerAlign: 'center',
      description: 'Nome do professor',
      flex: 25,
      renderCell: params => {
        const link = Links.PROFESSOR_INFO.replace(':id', params.row.professorId as unknown as string);
        return <LinkButton title={params.value} route={link} />;
      },
      renderHeader: renderHeaderTooltip,
    },
    {
      field: 'computerArticles',
      headerName: 'ARTIGOS',
      headerAlign: 'center',
      align: 'center',
      description: 'Nº de artigos de computação do professor',
      flex: 9,
      renderHeader: renderHeaderTooltip,
    },
    {
      field: 'computerPublications',
      headerName: 'PUBLICAÇÕES',
      headerAlign: 'center',
      align: 'center',
      description: 'Nº de publicações de computação do professor',
      flex: 8,
      renderHeader: renderHeaderTooltip,
    },
    {
      field: 'books',
      headerName: 'LIVROS',
      headerAlign: 'center',
      align: 'center',
      description: 'Nº de livros escritos pelo professor',
      flex: 8,
      renderHeader: renderHeaderTooltip,
    },
    {
      field: 'patents',
      headerName: 'PATENTES',
      headerAlign: 'center',
      align: 'center',
      description: 'Nº de patentes feitos pelo professor',
      flex: 8,
      renderHeader: renderHeaderTooltip,
    },
    {
      field: 'artisticProductions',
      headerName: 'PROD. ARTÍSTICAS',
      headerAlign: 'center',
      align: 'center',
      description: 'Nº de produções artísticas feitas pelo professor',
      flex: 8,
      renderHeader: renderHeaderTooltip,
    },
    {
      field: 'identifier',
      headerName: 'CÓDIGO LATTES',
      headerAlign: 'center',
      align: 'center',
      description: 'Código lattes do professor',
      flex: 15,
      renderCell: params => <LattesText text={params.row.identifier as string} />,
      valueFormatter: params => params.value as string,
      renderHeader: renderHeaderTooltip,
    },
    {
      field: 'linkLattes',
      headerName: 'LATTES',
      headerAlign: 'center',
      align: 'center',
      description: 'Currículo Lattes do professor',
      flex: 10,
      renderCell: params => (
        <LinkButton
          route={params.row.linkLattes as string}
          newTab
          image={lattesLogo}
          width='100%'
          height='50%'
          description='Consulta o currículo do professor na plataforma Lattes.'
        />
      ),
      renderHeader: renderHeaderTooltip,
    },
    {
      field: 'xmlDownloadLink',
      headerName: 'DOWNLOAD XML',
      headerAlign: 'center',
      align: 'center',
      description: 'Link para download do Currículo Lattes do professor em formato XML',
      flex: 10,
      renderCell: params => {
        const xmlLink = params.row.xmlDownloadLink as string;
        return (
          <LinkButton
            iconComponent={<DownloadIcon color='primary' />}
            route={xmlLink}
            newTab
            width='60%'
            height='60%'
            description='Download do XML do currículo lattes'
          />
        );
      },

      renderHeader: renderHeaderTooltip,
    },
    {
      field: 'excluir',
      disableExport: true,
      headerName: 'EXCLUIR',
      headerAlign: 'center',
      align: 'center',
      description: 'Excluir Professor',
      flex: 7,
      minWidth: 10,
      renderCell: params => {
        const professor = params.row;
        return (
          <DeleteButton
            onClick={() => {
              onClickDelete(professor);
            }}
          />
        );
      },
      renderHeader: renderHeaderTooltip,
    },
  ];

  async function loadData() {
    setRows([]);
    setLoading(true);
    try {
      const response = await ProfessorService.getProfessors();

      if (response.status === 200) {
        const { data } = response;
        const newData: ProfessorDetails[] = data.map((element, index) => ({
          id: index,
          professorId: element.professorId,
          professorName: element.professorName,
          identifier: element.identifier,
          artisticProductions: element.artisticProductions,
          books: element.books,
          computerArticles: element.computerArticles,
          computerPublications: element.computerPublications,
          patents: element.patents,
          linkLattes: Links.LATTES.replace(':id', element.identifier),
          xmlDownloadLink: Links.PROFESSOR_XML.replace(':id', element.identifier),
        }));
        setRows(newData);
      } else {
        showErrorStatus(response.status);
      }
    } catch {
      toast.error('Não foi possível carregar os professores. Tente novamente mais tarde.', { containerId: 'page' });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function removeProfessor(id: number) {
    try {
      const response = await ProfessorService.deleteProfessor(id);
      if (response.status === 200) {
        loadData();
      } else {
        showErrorStatus(response.status);
      }
    } catch {
      toast.error('Não foi possível deletar as informações do professor', { containerId: 'page' });
    }
  }

  function confirmRemoveProfessor() {
    if (currentProfessor?.professorId) {
      removeProfessor(currentProfessor.professorId);
      setShowDialog(!showDialog);
    }
  }

  return (
    <>
      <TableDiv sx={{ margin: 'auto' }}>
        <MainGrid
          rows={rows}
          columns={columns}
          loading={loading}
          components={{
            Toolbar: CustomToolbar,
          }}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        />
      </TableDiv>
      <Dialog
        type='decision'
        title='Excluir Professor'
        visibility={showDialog}
        setVisibility={setShowDialog}
        acceptLabel='Deletar'
        rejectFunction={() => {
          setShowDialog(!showDialog);
        }}
        acceptFunction={() => confirmRemoveProfessor()}
      >
        {`Tem certeza que deseja
             remover o professor "${currentProfessor?.professorName}" e todos os seus dados de pesquisa?`}
      </Dialog>
    </>
  );
}

function ProfessorsListPage() {
  const navbar = useNavbar();
  useEffect(() => {
    navbar?.setTitle('Professores');
  }, [navbar]);

  return (
    <ProfessorsGrid>
      <Table />
    </ProfessorsGrid>
  );
}

export default ProfessorsListPage;
