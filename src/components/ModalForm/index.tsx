import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  Box,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  TextField,
  FormControlLabel,
  Checkbox,
  SelectChangeEvent,
  Autocomplete,
  TextFieldProps,
  createFilterOptions,
} from '@mui/material';
import { ModalStyled, FooterStyled } from './styles';
import { ConferencesQualis, JournalQualis, QualisTypeDTO } from '../../types/Qualis.d';

export interface ModalFormProps {
  open: boolean;
  allQualis: Partial<JournalQualis & ConferencesQualis>[];
  onQualisCreate: (qualis: QualisTypeDTO, publicationType: boolean) => Promise<void>;
  handleClose?: () => void;
  ariaLabelledby?: string | undefined;
  ariaDescribedby?: string | undefined;
  qualisType: boolean;
}

export function ModalForm(props: ModalFormProps) {
  const { open, handleClose, onQualisCreate, ariaLabelledby, ariaDescribedby, allQualis, qualisType: qType } = props;

  const [newQualis, setNewQualis] = useState<QualisTypeDTO>({
    derivedFromId: null,
    isTop: true,
    official: true,
    qualis: '',
  });

  const [invalidName, setInvalidName] = useState<boolean>(true);
  const [invalidAcronym, setInvalidAcronym] = useState<boolean>(true);
  const qualisList: string[] = ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4', 'B5', 'C'];

  const title = qType ? 'Cadastro de conferência' : 'Cadastro de periódico';
  const [inputValue, setInputValue] = React.useState<string>('');

  const listOptions = allQualis.map(el => {
    const newData = {
      id: el.id,
      sigla: el.issn ?? el.acronym,
      label: el.name,
    };
    return newData;
  });

  useEffect(() => {
    setNewQualis({
      name: '',
      acronym: '',
      issn: '',
      derivedFromId: null,
      isTop: true,
      official: true,
      qualis: '',
    });
    setInputValue('');
  }, [open]);

  const handleChangeAcronym = (newData: React.ChangeEvent<HTMLInputElement>) => {
    if (qType) setNewQualis({ ...newQualis, acronym: newData.target.value });
    else setNewQualis({ ...newQualis, issn: newData.target.value });
    if (invalidAcronym) setInvalidAcronym(false);
  };

  const handleChangeName = (newData: React.ChangeEvent<HTMLInputElement>) => {
    setNewQualis({
      ...newQualis,
      name: newData.target.value,
    });
    if (invalidName) {
      setInvalidName(false);
    }
  };

  const handleChangeQualis = (newData: SelectChangeEvent<string>) => {
    setNewQualis({
      ...newQualis,
      qualis: newData.target.value,
    });
  };

  const handleChangeIsTop = () => {
    setNewQualis({
      ...newQualis,
      isTop: !newQualis.isTop,
    });
  };

  const handleChangeIsOficial = () => {
    setNewQualis({
      ...newQualis,
      official: !newQualis.official,
    });
  };

  const HandleSubmit = async () => {
    onQualisCreate(newQualis, qType);
    setNewQualis({
      name: '',
      acronym: '',
      issn: '',
      derivedFromId: null,
      isTop: true,
      official: true,
      qualis: '',
    });
    setInputValue('');
    if (handleClose) handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      keepMounted
    >
      <form
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <ModalStyled display='grid' gap={2}>
          <FooterStyled>
            <h2>{title}</h2>
            <hr style={{ marginLeft: '8px' }} />
          </FooterStyled>
          <TextField label='Nome' value={newQualis.name || ''} fullWidth id='Nome' onChange={handleChangeName} />
          <Box display='flex' gap={1}>
            <TextField
              label={qType ? 'Sigla' : 'ISSN'}
              value={qType ? newQualis.acronym || '' : newQualis.issn || ''}
              fullWidth
              id='Sigla/ISSN'
              onChange={handleChangeAcronym}
            />
          </Box>
          <Box display='flex' gap={1}>
            <FormControl fullWidth>
              <InputLabel>Qualis</InputLabel>
              <Select labelId='qualis' label='qualis' value={newQualis.qualis} onChange={handleChangeQualis}>
                {qualisList.map(element => (
                  <MenuItem key={element} value={element}>
                    {element}
                  </MenuItem>
                ))}
                <MenuItem key='S/Q' value='S/Q'>
                  Sem qualis
                </MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={<Checkbox defaultChecked value={newQualis.isTop} onClick={handleChangeIsTop} />}
              label='TOP'
            />
            <FormControlLabel
              control={<Checkbox defaultChecked value={newQualis.official} onClick={handleChangeIsOficial} />}
              label='Oficial'
            />
          </Box>
          <Autocomplete
            disablePortal
            id='derived_from'
            fullWidth
            getOptionLabel={option => option.id?.toString() ?? ''}
            isOptionEqualToValue={(el, value) => el.id === value.id}
            options={listOptions}
            filterOptions={createFilterOptions({
              stringify: option => (option?.label as string) + (option?.sigla as string) ?? '',
            })}
            renderOption={(params, option) => <li {...params}>{option.label}</li>}
            inputValue={inputValue}
            onInputChange={(event, option, reason) => {
              if (reason !== 'reset') setInputValue(option);
              if (reason === 'clear') {
                setNewQualis({ ...newQualis, derivedFromId: null });
              } else if (reason === 'input') {
                if (newQualis.derivedFromId !== null) {
                  setNewQualis({ ...newQualis, derivedFromId: null });
                }
              }
            }}
            renderInput={(params: TextFieldProps) => <TextField {...params} label='Derivado de' />}
            onChange={(event: React.SyntheticEvent, option) => {
              if (option) {
                setNewQualis({ ...newQualis, derivedFromId: option.id });
                setInputValue(option.label ?? '');
              }
            }}
            noOptionsText='Não encontrado'
            selectOnFocus
            autoComplete
            autoHighlight
          />
          <FooterStyled>
            <hr style={{ marginLeft: '8px' }} />
            <Button
              sx={{ marginRight: '4em', float: 'right' }}
              variant='contained'
              type='submit'
              onClick={HandleSubmit}
              disabled={!!invalidName || !!invalidAcronym}
            >
              Criar
            </Button>
          </FooterStyled>
        </ModalStyled>
      </form>
    </Modal>
  );
}
