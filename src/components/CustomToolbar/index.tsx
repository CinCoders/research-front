import { Button, Grid } from '@mui/material';
import {
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from '@mui/x-data-grid';
import { AuthUtils } from '@cincoders/cinnamon';
import { useAuth } from 'react-oidc-context';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { RotatingIcon } from './styles';
import { Roles } from '../../types/enums';
// import { RotatingIcon } from './styles';

interface CustomToolbarProps {
  onCreateClick: () => void;
  onUpdateClick: () => Promise<void>;
}
interface CreateButtonProps {
  onCreateClick: () => void;
}

interface UpdateButtonProps {
  onUpdateClick: () => Promise<void>;
}

export function UpdateButton({ onUpdateClick }: UpdateButtonProps) {
  const [isRotating, setIsRotating] = useState(false);

  const handleClick = () => {
    setIsRotating(true);
    onUpdateClick().then(() => setIsRotating(false));
  };

  return (
    <Button type='button' onClick={handleClick}>
      <RotatingIcon
        sx={{
          animation: isRotating ? 'rotation 1s infinite linear' : 'none',
          '@keyframes rotation': {
            from: {
              transform: 'rotate(0deg)',
            },
            to: {
              transform: 'rotate(359deg)',
            },
          },
          fontSize: '24px',
        }}
      />
      Atualizar
      <span className='css-8je8zh-MuiTouchRipple-root' />
    </Button>
  );
}

export function CreateButton({ onCreateClick }: CreateButtonProps) {
  return (
    <Button type='button' onClick={onCreateClick}>
      <AddIcon style={{ color: '#DC412F', fontSize: '24px' }} />
      Criar
      <span className='css-8je8zh-MuiTouchRipple-root' />
    </Button>
  );
}

export function CustomToolbar({ onCreateClick, onUpdateClick }: CustomToolbarProps) {
  const auth = useAuth();
  return (
    <GridToolbarContainer>
      <Grid>
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <GridToolbarColumnsButton />
      </Grid>
      <Grid sx={{ marginLeft: 'auto' }}>
        {onCreateClick && AuthUtils.hasAccess(auth, [Roles.ADMIN]) && <CreateButton onCreateClick={onCreateClick} />}
        {onUpdateClick && AuthUtils.hasAccess(auth, [Roles.ADMIN]) && <UpdateButton onUpdateClick={onUpdateClick} />}
      </Grid>
    </GridToolbarContainer>
  );
}
