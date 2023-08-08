import { CssBaseline } from '@mui/material';
import { AuthProvider } from 'react-oidc-context';
import RoutesApp from './routes';
import { authProviderProps } from './utils/auth';

function App() {
  return (
    <AuthProvider {...authProviderProps}>
      <CssBaseline />
      <RoutesApp />
    </AuthProvider>
  );
}

export default App;
