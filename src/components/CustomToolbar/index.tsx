import { Button, Grid } from '@mui/material';
import {
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from '@mui/x-data-grid';
import { AuthUtils } from '@cincoders/cinnamon';
import { useAuth } from 'react-oidc-context';
import AddIcon from '../../assets/icons/AddIcon.svg';
import { Roles } from '../../types/enums';

interface CustomToolbarProps {
  onCreateClick: () => void;
}

export function CreateButton({ onCreateClick }: CustomToolbarProps) {
  return (
    <Button type='button' onClick={onCreateClick}>
      <span className='MuiButton-startIcon MuiButton-iconSizeSmall css-y6rp3m-MuiButton-startIcon'>
        <img src={AddIcon} alt='Icone criar' style={{ width: '18px', height: '18px', marginBottom: 1 }} />
      </span>
      Criar
      <span className='css-8je8zh-MuiTouchRipple-root' />
    </Button>
  );
}

export function CustomToolbar({ onCreateClick }: CustomToolbarProps) {
  const auth = useAuth();
  return (
    <GridToolbarContainer>
      <Grid>
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </Grid>
      {onCreateClick && AuthUtils.hasAccess(auth, [Roles.ADMIN]) && (
        <Grid sx={{ marginLeft: 'auto' }}>
          <CreateButton onCreateClick={onCreateClick} />
        </Grid>
      )}
    </GridToolbarContainer>
  );
}
