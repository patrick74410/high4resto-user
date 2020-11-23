import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ItemCarteI } from 'src/interfaces/ItemCarteI';
import { ItemCategorieI } from 'src/interfaces/ItemCategorieI';
import { HomePageService } from 'src/services/home.service';
import { ItemService } from 'src/services/item.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'high4resto-frontEnd';
    categorieList$: Observable<ItemCategorieI[]>;
    itemCarteList$: Observable<ItemCarteI[]>;

    constructor(
        public homePageService: HomePageService,
        public auth: AuthService,
        public itemService: ItemService
    ) {}
    ngOnInit() {
        this.categorieList$ = this.itemService.getCategorieList().pipe(
            tap((categorieList) => {
                this.itemCarteList$ = this.itemService.getItemCarteListOfCategorie(
                    categorieList[0].id
                );
            })
        );
    }
}
