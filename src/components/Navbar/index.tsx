import { SideMenuLink } from '@cincoders/cinnamon';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import GavelIcon from '@mui/icons-material/Gavel';
import SchoolIcon from '@mui/icons-material/School';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import UploadIcon from '@mui/icons-material/Upload';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import StarIcon from '@mui/icons-material/Star';
import { Links } from '../../types/enums';

export const links: SideMenuLink[] = [
  {
    id: 1,
    title: 'Home',
    href: Links.HOME,
    IconComponent: () => <HomeIcon />,
  },
  {
    id: 2,
    title: 'Publicações',
    href: Links.PUBLICATIONS,
    IconComponent: () => <NewspaperIcon />,
  },
  {
    id: 3,
    title: 'Projetos',
    href: Links.PROJECTS,
    IconComponent: () => <BookIcon />,
  },
  {
    id: 4,
    title: 'Patentes',
    href: Links.PATENTS,
    IconComponent: () => <GavelIcon />,
  },
  {
    id: 5,
    title: 'Orientações',
    href: Links.STUDENTS,
    IconComponent: () => <SchoolIcon />,
  },
  {
    id: 6,
    title: 'Qualis',
    href: Links.QUALIS,
    IconComponent: () => <StarIcon />,
  },
  {
    id: 7,
    title: 'Professores',
    href: Links.PROFESSORS_LIST,
    IconComponent: () => <AssignmentIndIcon />,
  },
  {
    id: 8,
    title: 'Importar XMLs/Json',
    href: Links.IMPORT_XML,
    IconComponent: () => <UploadIcon />,
  },
];
