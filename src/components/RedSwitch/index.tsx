import { alpha, styled, Switch } from '@mui/material';

export const RedSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#dc412f',
    '&:hover': {
      backgroundColor: alpha('#dc412f', theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#dc412f',
  },
}));
