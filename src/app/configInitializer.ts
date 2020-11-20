import { AuthClientConfig } from '@auth0/auth0-angular';
import { first } from 'rxjs/operators';
import { WebConfigI } from 'src/interfaces/webConfigI.interface';
import { WebConfigService } from 'src/services/webConfig.service';
import { environment as env } from '../environments/environment';

// Provide an initializer function that returns a Promise
export function configInitializer(
  webConfigService: WebConfigService,
  config: AuthClientConfig
) {
  return () =>
    webConfigService.webConfig$
      .pipe(first())
      .toPromise()
      .then((loadedConfig: WebConfigI) =>
        config.set({
          domain: loadedConfig.auth0Domain,
          clientId: loadedConfig.auth0Key,
          redirectUri: window.location.origin,
          httpInterceptor: {
            allowedList: [`${env.apiUrl}`],
          },
        })
      ); // Set the config that was loaded asynchronously here
}
