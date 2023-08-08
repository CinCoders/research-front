import { CircularProgress, CircularProgressProps, Typography, Box } from '@mui/material';

function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
  const { value } = props;
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', margin: 'auto' }}>
      <CircularProgress variant='determinate' {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant='caption' component='div' color='text.secondary'>
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default function CircularWithValueLabel(props: { progressValue: number; text: string }) {
  const { progressValue, text } = props;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem', minWidth: '5rem' }}>
      <CircularProgressWithLabel value={progressValue} />
      <Typography sx={{ alignSelf: 'center' }}>{text}</Typography>
    </Box>
  );
}
