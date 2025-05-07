import { Box, Skeleton } from '@mui/material';

export default function GenericListSkeleton() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(v => (
        <Box key={v} width='100%' display='flex' flexDirection='column' mb={2}>
          <Skeleton variant='text' width='10%' height={30} />

          <Skeleton variant='text' width='100%' height={40} />

          <Skeleton variant='text' width='60%' height={25} />

          <Box>
            <Skeleton variant='text' width='80%' height={25} />
          </Box>
        </Box>
      ))}
    </>
  );
}
