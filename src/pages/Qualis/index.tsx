import { Divider, FormControlLabel, Grid } from '@mui/material';
import { DataGrid, GridColumns, ptBR } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { AuthUtils, useNavbar, toast } from '@cincoders/cinnamon';
import { useAuth } from 'react-oidc-context';
import { CustomToolbar } from '../../components/CustomToolbar';
import { QualisService } from '../../services/QualisService';
import { RedSwitch } from '../../components/RedSwitch';
import { TableDiv, GridContainer, ProfessorsGrid } from '../../components/TableStyles/styles';
import { ButtonsGrid } from '../../components/ButtonsGrid/styles';
import { showErrorStatus } from '../../utils/showErrorStatus';
import { ConferencesQualis, JournalQualis, qualisValuesList, checkValue, QualisTypeDTO } from '../../types/Qualis.d';
import { ModalForm } from '../../components/ModalForm';
import { Roles } from '../../types/enums';

const handleQualisCreate = async (qualis: QualisTypeDTO, isConferenceQualis: boolean) => {
  let response;
  if (isConferenceQualis) {
    response = await QualisService.createConferenceQualis(qualis);
  } else {
    response = await QualisService.createJournalQualis(qualis);
  }
  const type = isConferenceQualis ? 'Conferência' : 'Periódico';
  const artigo = isConferenceQualis ? 'a' : 'o';
  if (response.status === 201) {
    toast.success(`${type} criad${artigo} com sucesso!`, {
      position: 'top-right',
      autoClose: 5000,
      closeOnClick: true,
      containerId: 'page',
    });
  } else {
    toast.error(`Ocorreu um erro ao criar ${artigo} ${type}. Tente novamente mais tarde`, {
      position: 'top-right',
      closeOnClick: true,
      autoClose: false,
      containerId: 'page',
    });
  }
};

function Table() {
  const auth = useAuth();
  const hasAccess = AuthUtils.hasAccess(auth, [Roles.ADMIN]);
  const columns: GridColumns = [
    {
      field: 'name',
      headerName: 'Nome',
      headerAlign: 'center',
      align: 'left',
      description: 'Indica o nome da conferência ou do periódico',
      minWidth: 60,
      flex: 10,
      editable: hasAccess,
    },
    {
      field: 'acronym',
      headerName: 'Sigla',
      headerAlign: 'center',
      align: 'center',
      description: 'Indica a sigla da conferência',
      minWidth: 60,
      flex: 4,
      editable: hasAccess,
    },
    {
      field: 'issn',
      headerName: 'ISSN',
      headerAlign: 'center',
      align: 'center',
      description: 'Indica o ISSN do periódico',
      minWidth: 60,
      flex: 4,
      editable: hasAccess,
    },
    {
      field: 'qualis',
      headerName: 'Qualis',
      headerAlign: 'center',
      align: 'center',
      description: 'Indica o Qualis da conferência',
      minWidth: 60,
      flex: 2,
      editable: hasAccess,
      type: 'singleSelect',
      valueOptions: ['', 'A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4', 'B5', 'C'],
    },
    {
      field: 'isTop',
      headerName: 'TOP',
      headerAlign: 'center',
      align: 'center',
      description: 'Indica se a conferência é top',
      minWidth: 60,
      flex: 2,
      editable: hasAccess,
      type: 'boolean',
    },
    {
      field: 'official',
      headerName: 'Oficial',
      headerAlign: 'center',
      align: 'center',
      description: 'Indica se a conferência é oficial',
      minWidth: 60,
      flex: 2,
      editable: hasAccess,
      type: 'boolean',
    },
    {
      field: 'derivedFrom',
      headerName: 'Derivada de',
      headerAlign: 'center',
      align: 'center',
      description: 'Indica se o periódico ou a conferência são derivados e qual é o original',
      minWidth: 60,
      flex: 4,
      editable: false,
      renderCell: params => {
        if (params.value) {
          if (params.value.acronym) return params.value.acronym;
          return params.value.issn;
        }
        return '';
      },
    },
  ];
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => setOpen(false);
  const [rows, setRows] = useState<ConferencesQualis[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [checkedConferences, setCheckedConferences] = useState<boolean>(true);

  const handleCreateClick = () => setOpen(true);

  const handleUpdateClick = async () => {
    const [conferencesResp, journalsResp] = await Promise.all([
      QualisService.refreshConferences(),
      QualisService.refreshJournals(),
    ]);
    if (conferencesResp.status === 201 && journalsResp.status === 201) {
      toast.success('Conferências e Periódicos atualizados com sucesso!', { containerId: 'page' });
    } else {
      showErrorStatus(conferencesResp.status);
      showErrorStatus(journalsResp.status);
    }
  };

  const handleCellEditCommit = React.useCallback(
    async params => {
      const { id, field, value } = params;

      let validation = false;
      if (checkedConferences && ['acronym', 'name', 'qualis', 'isTop'].includes(field)) {
        if (
          (field === 'acronym' && checkValue(value)) ||
          (field === 'name' && checkValue(value)) ||
          (field === 'qualis' && qualisValuesList.includes(value)) ||
          (field === 'isTop' && (value === true || value === false))
        ) {
          validation = true;
        }
      } else if (['issn', 'name', 'qualis', 'isTop'].includes(field)) {
        if (
          (field === 'issn' && checkValue(value)) ||
          (field === 'name' && checkValue(value)) ||
          (field === 'qualis' && qualisValuesList.includes(value)) ||
          (field === 'isTop' && (value === true || value === false))
        ) {
          validation = true;
        }
      }

      if (validation) {
        if (checkedConferences) {
          const conferenceQualis: ConferencesQualis = { id, [field]: value };
          await QualisService.updateConferenceQualis(conferenceQualis);
        } else {
          const journalQualis: JournalQualis = { id, [field]: value };
          await QualisService.updateJournalQualis(journalQualis);
        }
      }
    },
    [checkedConferences],
  );

  const toolbarClick = () => <CustomToolbar onCreateClick={handleCreateClick} onUpdateClick={handleUpdateClick} />;

  useEffect(() => {
    async function loadData() {
      setRows([]);
      setLoading(true);
      try {
        const response = await QualisService.getPublicationsQualis(checkedConferences);

        if (response.status === 200) {
          const { data } = response;
          setRows(data);
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
  }, [checkedConferences]);

  const handleChangeConferences = () => {
    setCheckedConferences(checked => !checked);
  };

  return (
    <GridContainer>
      <ButtonsGrid>
        <Grid>
          <Divider> Filtrar </Divider>
          <FormControlLabel
            control={<RedSwitch checked={checkedConferences} onChange={handleChangeConferences} />}
            label='Conferencias'
          />
          <FormControlLabel
            control={<RedSwitch checked={!checkedConferences} onChange={handleChangeConferences} />}
            label='Periódicos'
          />
        </Grid>
      </ButtonsGrid>
      <TableDiv>
        <DataGrid
          columns={columns}
          rows={rows}
          editMode='cell'
          onCellEditCommit={handleCellEditCommit}
          columnVisibilityModel={{
            acronym: checkedConferences,
            issn: !checkedConferences,
          }}
          loading={loading}
          components={{
            Toolbar: toolbarClick,
          }}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        />
      </TableDiv>
      <ModalForm
        key='qualisForm'
        onQualisCreate={handleQualisCreate}
        open={open}
        handleClose={handleClose}
        allQualis={rows}
        qualisType={checkedConferences}
        ariaLabelledby='Modal form'
        ariaDescribedby='Modal para cadastro do qualis'
      />
    </GridContainer>
  );
}

function QualisPage() {
  const navbar = useNavbar();
  useEffect(() => {
    navbar?.setTitle('Qualis');
  }, [navbar]);
  return (
    <ProfessorsGrid>
      <Table />
    </ProfessorsGrid>
  );
}

export default QualisPage;
