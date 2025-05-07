import { Box } from '@mui/material';
import { getMenuOptions, PublicProfessorContext } from '../../../types/PublicProfessor.d';
import NavbarItem from './NavbarItem';
import NavbarSkeleton from './NavbarSkeleton';

interface VerticalNavbarProps {
  professorData: PublicProfessorContext;
}

export default function VerticalNavbar({ professorData }: VerticalNavbarProps) {
  const anyIsNull = Object.values(professorData).some(v => v === null);
  const menuOptions = getMenuOptions(professorData);

  return (
    <Box display={{ xs: 'none', md: 'flex' }} flexDirection='column' gap={0.5}>
      {professorData.isLoading || anyIsNull ? (
        <NavbarSkeleton />
      ) : (
        menuOptions.map(option => <NavbarItem {...option} key={option.href} />)
      )}
    </Box>
  );
}
