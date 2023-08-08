import { memo } from 'react';
import { GridRenderCellParams } from '@mui/x-data-grid';
import CheckIcon from '@mui/icons-material/Check';

interface CheckIconProps {
  check: boolean | undefined;
}

const CheckCell = memo((props: CheckIconProps) => {
  const { check } = props;
  return check ? <CheckIcon /> : <div />;
});

export function renderCheckIcon(params: GridRenderCellParams<boolean>) {
  const element: CheckIconProps = {
    check: params.value,
  };
  return <CheckCell check={element.check} />;
}
