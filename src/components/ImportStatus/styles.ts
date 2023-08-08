import { styled } from '@mui/material';

interface StatusDivProps {
  statusColor: string;
}

export const StatusBox = styled('div')({
  position: 'relative',
  width: '80%',
  margin: 'auto',
});

export const StatusDiv = styled('div')(({ statusColor }: StatusDivProps) => ({
  lineHeight: 'initial',
  fontWeight: 500,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '@media(max-width: 1230px)': {
    fontSize: 15,
    fontWeight: '450',
  },
  color: statusColor,
}));
