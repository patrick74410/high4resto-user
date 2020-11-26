import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { AuthService } from '@auth0/auth0-angular';
import { first } from 'rxjs/operators';
import { HomePageService } from 'src/services/home.service';
import { ItemService } from 'src/services/item.service';
import { AppTitleService } from 'src/services/title.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    navigationList: NavigationItem[] = [];
    constructor(
        public media: MediaObserver,
        public homePageService: HomePageService,
        public auth: AuthService,
        public itemService: ItemService,
        public appTitle: AppTitleService
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
    }
}

interface NavigationItem {
    label: string;
    route: string;
    icon: string;
}
