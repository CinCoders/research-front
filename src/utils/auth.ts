import { AuthProviderProps } from 'react-oidc-context';

export const keycloakConfig = JSON.parse(process.env.REACT_APP_KEYCLOAK_JSON ?? '');

export const authProviderProps: AuthProviderProps = {
  authority: `${keycloakConfig['auth-server-url']}/realms/${keycloakConfig.realm}`,
  client_id: keycloakConfig.resource,
  redirect_uri: window.location.origin + process.env.PUBLIC_URL,
  post_logout_redirect_uri: window.location.origin + process.env.PUBLIC_URL,
  accessTokenExpiringNotificationTimeInSeconds: 30,
  client_authentication: 'client_secret_post',
  automaticSilentRenew: true,
  checkSessionIntervalInSeconds: 2,
  monitorSession: false,
};
