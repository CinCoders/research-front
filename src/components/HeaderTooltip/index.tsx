import { memo } from 'react';
import { GridColumnHeaderParams } from '@mui/x-data-grid';
import { Tooltip } from '@mui/material';
import { HeaderDiv } from './styles';

interface HeaderTooltipProps {
  name: string;
  tip: string;
}

const HeaderTooltip = memo((props: HeaderTooltipProps) => {
  const { name, tip } = props;
  return (
    <Tooltip placement='top' title={tip} arrow>
      <HeaderDiv>{name}</HeaderDiv>
    </Tooltip>
  );
});

export function renderHeaderTooltip(params: GridColumnHeaderParams) {
  return <HeaderTooltip name={params.colDef.headerName as string} tip={params.colDef.description as string} />;
}
