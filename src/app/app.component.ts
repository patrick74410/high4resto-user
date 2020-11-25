import { Component } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ItemCarteI } from 'src/interfaces/ItemCarteI';
import { ItemCategorieI } from 'src/interfaces/ItemCategorieI';
import { HomePageService } from 'src/services/home.service';
import { ItemService } from 'src/services/item.service';
import { AppTitleService } from 'src/services/title.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'high4resto-frontEnd';
    categorieList$: Observable<ItemCategorieI[]>;
    itemCarteList$: Observable<ItemCarteI[]>;
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
        /* this.categorieList$ = this.itemService.getCategorieList().pipe(
            tap((categorieList) => {
                this.itemCarteList$ = this.itemService.getItemCarteListOfCategorie(
                    categorieList[0].id
                );
            })
        ); */
    }
}

interface NavigationItem {
    label: string;
    route: string;
    icon: string;
}
