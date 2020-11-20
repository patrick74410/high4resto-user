import { apiUrl, auth0 } from '../../application.config.json';

export const environment = {
  production: true,
  apiUrl,
  auth: {
    domain: auth0.domain,
    clientId: auth0.clientId,
  },
};
