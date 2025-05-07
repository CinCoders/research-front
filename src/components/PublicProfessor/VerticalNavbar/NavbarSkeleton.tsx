import { Skeleton } from '@mui/material';

export default function NavbarSkeleton() {
  return (
    <>
      <Skeleton variant='text' width='70%' height={32} />
      <Skeleton variant='text' width='80%' height={32} />
      <Skeleton variant='text' width='65%' height={32} />
    </>
  );
}
