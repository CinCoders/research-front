import { Box, Skeleton } from '@mui/material';

export function SideMenuSkeleton() {
  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Skeleton variant='rounded' width={112} height={112} sx={{ borderRadius: '0.5rem' }} />
      <Skeleton variant='text' width='80%' height={32} />
      <Skeleton variant='text' width='60%' height={24} />
      <Skeleton variant='text' width='40%' height={24} />

      <Box display='flex' gap={1}>
        <Skeleton variant='circular' width={40} height={40} />
        <Skeleton variant='circular' width={40} height={40} />
        <Skeleton variant='circular' width={40} height={40} />
      </Box>

      <Skeleton variant='rounded' width='100%' height={48} />
      <Skeleton variant='rounded' width='100%' height={48} />
      <Skeleton variant='rounded' width='100%' height={48} />
    </Box>
  );
}
