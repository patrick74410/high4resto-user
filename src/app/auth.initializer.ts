import { AuthClientConfig } from '@auth0/auth0-angular';
import { first } from 'rxjs/operators';
import { HomePageService } from 'src/services/home.service';
import { environment as env } from '../environments/environment';

// Provide an initializer function that returns a Promise
export function authInitializer(
    homePageService: HomePageService,
    config: AuthClientConfig
) {
    return () =>
        homePageService.homePage$
            .pipe(first())
            .toPromise()
            .then((homePage) =>
                config.set({
                    domain: homePage.webConfig.auth0Domain,
                    clientId: homePage.webConfig.auth0Key,
                    redirectUri: window.location.origin,
                    httpInterceptor: {
                        allowedList: [`${env.apiUrl}`],
                    },
                })
            ); // Set the config that was loaded asynchronously here
}
