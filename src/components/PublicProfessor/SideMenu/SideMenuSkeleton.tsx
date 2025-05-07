import { Box, Skeleton } from '@mui/material';

export function SideMenuSkeleton() {
  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Skeleton variant='rounded' width={112} height={112} sx={{ borderRadius: '0.5rem' }} />
      <Skeleton variant='text' width='80%' height={32} />
      <Skeleton variant='text' width='60%' height={24} />
      <Skeleton variant='text' width='40%' height={24} />
    </Box>
  );
}
