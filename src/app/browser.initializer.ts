import { AuthClientConfig } from '@auth0/auth0-angular';
import { first } from 'rxjs/operators';
import { HomePageService } from 'src/services/home.service';
import { MapService } from 'src/services/map.service';
import { environment as env } from '../environments/environment';

// Provide an initializer function that returns a Promise
export const browserInitializer = (
    homePageService: HomePageService,
    config: AuthClientConfig,
    mapService: MapService
) => {
    return () =>
        homePageService.homePage$
            .pipe(first())
            .toPromise()
            .then((homePage) => {
                config.set({
                    domain: homePage.webConfig.auth0Domain,
                    clientId: homePage.webConfig.auth0Key,
                    redirectUri: window.location.origin,
                    httpInterceptor: {
                        allowedList: [`${env.apiUrl}`],
                    },
                });
                mapService.loadApi(homePage.webConfig.googleMapApi);
            }); // Set the config that was loaded asynchronously here
};
