import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ItemCarteI } from 'src/interfaces/ItemCarteI';
import { ItemCategorieI } from 'src/interfaces/ItemCategorieI';
import { ItemService } from 'src/services/item.service';

@Injectable()
export class ProductsService {
    itemList$ = new ReplaySubject<ItemCarteI[]>(1);
    categorieList$ = new ReplaySubject<ItemCategorieI[]>(1);
    constructor(private itemService: ItemService) {
        this.initCategories();
        console.log('init Product service');
    }

    async initCategories(): Promise<void> {
        const categorieList = await this.itemService
            .getCategorieList()
            .toPromise();
        this.categorieList$.next(categorieList);
    }

    async initItemList(categorieId): Promise<void> {
        const itemList = await this.itemService
            .getItemCarteListOfCategorie(categorieId)
            .toPromise();
        this.itemList$.next(itemList);
    }
}
