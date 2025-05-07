import { Box } from '@mui/material';
import ImageWithLoading from '../../share/ImageWithLoading';
import LinkItem from '../LinkItem';

interface EmployeeLinksProps {
  links: { href: string; iconUrl: string; alt: string }[];
}

export default function EmployeeLinks({ links }: EmployeeLinksProps) {
  return (
    <Box display='flex' flexWrap='wrap' gap={1}>
      {links.map(link => (
        <LinkItem to={link.href} key={link.href}>
          <ImageWithLoading src={link.iconUrl} alt={link.alt} width={24} height={24} />
        </LinkItem>
      ))}
    </Box>
  );
}
