import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  const { value } = props;
  return (
    <Box
      sx={{
        width: '80%',
        alignItems: 'center',
        display: 'flex',
        margin: '3rem auto',
      }}
    >
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress color='error' variant='determinate' value={value} />
      </Box>
      <Box sx={{ minWidth: 20 }}>
        <Typography sx={{ margin: '-0.5rem 0.5rem' }} variant='body2' color='text.secondary'>
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default function LinearWithValueLabel(props: { progressValue: number }) {
  const { progressValue } = props;
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={progressValue} />
    </Box>
  );
}
