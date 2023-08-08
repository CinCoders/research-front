import { PageWithAuth, ToastContainer } from '@cincoders/cinnamon';
import AccountBalance from '@mui/icons-material/AccountBalance';
import { useCallback } from 'react';
import { AuthContextProps } from 'react-oidc-context';
import { links } from '../Navbar';
import logoCin from '../../assets/icons/cin-logo.svg';
import { listSystem } from '../../utils/systemsList';
import { Links } from '../../types/enums';

interface PageCinProps {
  auth: AuthContextProps;
  children: JSX.Element | JSX.Element[];
  permittedRoles: string[];
}

export default function PageCin({ children, auth, permittedRoles }: PageCinProps) {
  const AccountBalanceComponent = useCallback(
    () => <AccountBalance sx={{ display: 'center', marginLeft: '2rem' }} fontSize='large' htmlColor='#DB1E2F' />,
    [],
  );
  return (
    <PageWithAuth
      authProps={{ auth, permittedRoles }}
      navbar={{
        sideMenuLinks: links,
        auth,
        logoSrc: logoCin,
        accountManagementUrl: Links.ACCOUNT_MANAGEMENT,
        logoRedirectUrl: Links.INTRANET_HOME,
        systemsList: listSystem,
        IconComponent: AccountBalanceComponent,
      }}
      footer={{
        title: 'SUPORTE TÉCNICO',
        telephone: '(81) 2126-8430',
        telephoneComplement: 'Ramal: 4017 / 4748',
        email: 'helpdesk@cin.ufpe.br',
        link: 'https://helpdesk.cin.ufpe.br',
        textLink: 'Site',
        description: 'Helpdesk - Gerência de Sistemas \n Sala B011',
        copyrightText: 'CIn UFPE | Todos os direitos reservados',
      }}
      haveToast
      createNavbarContext
      centralized
      components={{
        toastContainer: (
          <ToastContainer
            toastProps={{
              position: 'top-right',
              enableMultiContainer: true,
              containerId: 'page',
            }}
            topInitialPosition={64}
          />
        ),
      }}
    >
      {children}
    </PageWithAuth>
  );
}
