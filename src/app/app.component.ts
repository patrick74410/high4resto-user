import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, PLATFORM_ID } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { HomePageService } from 'src/services/home.service';
import { ItemService } from 'src/services/item.service';
import { LocalstorageService } from 'src/services/localStorage.service';
import { AppTitleService } from 'src/services/title.service';
import { DrawerService } from '../services/drawer.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    navigationList: NavigationItem[] = [];
    showToolbar$: Observable<boolean>;
    connected: string;
    static isBrowser = new BehaviorSubject<boolean>(null);
    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        public media: MediaObserver,
        public homePageService: HomePageService,
        public auth: AuthService,
        public itemService: ItemService,
        public appTitle: AppTitleService,
        public router: Router,
        private route: ActivatedRoute,
        public drawerService: DrawerService,
        private storage: LocalstorageService,
        private authService: AuthService
    ) {
        AppComponent.isBrowser.next(isPlatformBrowser(platformId));
    }

    ngOnInit() {
        this.connected = this.storage.getItem("connected");
        console.log(this.connected);
        this.homePageService.homePage$.pipe(first()).subscribe((homePage) => {
            this.navigationList.push(
                {
                    label: 'Nos produits',
                    route: 'products',
                    icon: 'basket',
                },
                ...homePage.articleCategorie.map((articleCategorie) => {
                    return {
                        label: articleCategorie.name,
                        route: `blog/${articleCategorie.id}`,
                        icon: 'newspaper-variant',
                    };
                }),
                {
                    label: 'Photos',
                    route: 'photos',
                    icon: 'image-multiple',
                }
            );
        });

        this.showToolbar$ = this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            map((event) => {
                return this.route.snapshot.firstChild.data.overrideToolbar !=
                    null
                    ? !this.route.snapshot.firstChild.data.overrideToolbar
                    : true;
            })
        );

        this.auth.isAuthenticated$
            .pipe(filter((auth) => auth))
            .subscribe(() => {
                setTimeout((params) => {
                    this.authService.user$.subscribe((user) => {
                        this.storage.setItem("key", user['https://high4resto.high4technology.fr/generateKey']);
                        this.storage.setItem("clientId", user['https://high4resto.high4technology.fr/clientId']);
                        this.storage.setItem("connected", "true");
                        this.connected = "true";
                    });

                    const redirectRoute = JSON.parse(
                        sessionStorage.getItem('redirectRoute')
                    );

                    if (redirectRoute) {
                        this.router.navigate([
                            'products',
                            redirectRoute.category,
                        ]);
                    }
                }, 100);
            });
    }

    authenticate() {
        this.auth.loginWithRedirect();
    }

    logout() {
        this.auth.logout();
        this.storage.removeItem("clientId");
        this.storage.removeItem("key");
        this.storage.removeItem("connected");
    }

}

interface NavigationItem {
    label: string;
    route: string;
    icon: string;
}
