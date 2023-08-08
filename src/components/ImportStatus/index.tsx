import { GridCellParams } from '@mui/x-data-grid';
import { memo } from 'react';
import { StatusBox, StatusDiv } from './styles';
import { Status } from '../../types/enums';

function getStatusDescription(status: string): string {
  switch (status) {
    case Status.CONCLUDED:
      return 'Concluído';
    case Status.NOT_IMPORTED:
      return 'Não importado';
    case Status.PROGRESS:
      return 'Em progresso';
    default:
      return 'Pendente';
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case Status.CONCLUDED:
      return '#418101';
    case Status.NOT_IMPORTED:
      return '#D50022';
    case Status.PROGRESS:
      return '#1791cc';
    default:
      return '#ecbe44';
  }
}

interface ImportStatusProps {
  importStatus: string;
}

const ImportStatus = memo(({ importStatus }: ImportStatusProps) => (
  <StatusBox>
    <StatusDiv statusColor={getStatusColor(importStatus)}>{`${getStatusDescription(importStatus)}`}</StatusDiv>
  </StatusBox>
));

export function renderImportStatus(params: GridCellParams): JSX.Element {
  return <ImportStatus importStatus={params.row.status} />;
}
