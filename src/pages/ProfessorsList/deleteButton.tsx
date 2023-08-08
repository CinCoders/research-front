import { memo } from 'react';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { IconButton, Tooltip } from '@mui/material';
import { DeleteButtonProps } from '../../types/componentsTypes/DeleteButtonProps.d';

export const DeleteButton = memo((props: DeleteButtonProps) => {
  const { onClick } = props;

  return (
    <Tooltip title='Excluir professor'>
      <IconButton
        aria-label='Delete'
        onClick={async () => {
          onClick();
        }}
        sx={{ color: '#db1e2f' }}
      >
        <HighlightOffRoundedIcon />
      </IconButton>
    </Tooltip>
  );
});
