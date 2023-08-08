import EventIcon from '@mui/icons-material/Event';
import DashboardIcon from '@mui/icons-material/Dashboard';
import School from '@mui/icons-material/School';
import FactCheck from '@mui/icons-material/FactCheck';
import HowToReg from '@mui/icons-material/HowToReg';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import Print from '@mui/icons-material/Print';
import { System } from '@cincoders/cinnamon';

export const listSystem: System[] = [
  {
    title: 'Dashboard SIPAC',
    IconComponent: () => <DashboardIcon fontSize='large' htmlColor='#DB1E2F' />,
    description: 'Sistema de gerenciamento de processos do SIPAC',
    href: '/sipacdash',
  },
  {
    title: 'Allocation',
    IconComponent: () => <EventIcon fontSize='large' htmlColor='#DB1E2F' />,
    description: 'Sistema para alocação e planejamento de disciplinas',
    href: 'https://allocation.cin.ufpe.br/',
  },
  {
    title: 'Seleção Pós-Graduação',
    IconComponent: () => <HowToReg fontSize='large' htmlColor='#DB1E2F' />,
    description: 'Sistema de seleção para pós-graduação',
    href: 'https://selecao.cin.ufpe.br/',
  },
  {
    title: 'FrequenCIn',
    IconComponent: () => <FactCheck fontSize='large' htmlColor='#DB1E2F' />,
    description: 'Sistema para realizar a frequência dos alunos',
    href: 'https://frequencin.cin.ufpe.br/',
  },
  {
    title: 'Gestão de Recursos Humanos',
    IconComponent: () => <RecentActorsIcon fontSize='large' htmlColor='#DB1E2F' />,
    description: 'Sistema para alocação e planejamento de disciplinas',
    href: '/hr',
  },
  {
    title: 'Prints',
    IconComponent: () => <Print fontSize='large' htmlColor='#DB1E2F' />,
    description: 'Sistema para consulta de saldo e logs de impressão.',
    href: '/prints',
  },
  {
    title: 'SGA',
    IconComponent: () => <School fontSize='large' htmlColor='#DB1E2F' />,
    description: 'Sistema para levantamento e análise de dados de demanda de seleção.',
    href: '/sga',
  },
];
