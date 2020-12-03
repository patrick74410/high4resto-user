import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { ClientService } from 'src/services/client.service';
import { HomePageService } from 'src/services/home.service';
import { ItemService } from 'src/services/item.service';
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
    constructor(
        public media: MediaObserver,
        public homePageService: HomePageService,
        public auth: AuthService,
        public itemService: ItemService,
        public appTitle: AppTitleService,
        public router: Router,
        private route: ActivatedRoute,
        public drawerService: DrawerService,
        private clientService: ClientService
    ) {}

    ngOnInit() {
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
}

interface NavigationItem {
    label: string;
    route: string;
    icon: string;
}
