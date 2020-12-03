import { Injectable } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReplaySubject } from 'rxjs';
import { ItemCarteI } from 'src/interfaces/ItemCarteI';
import { ItemCategorieI } from 'src/interfaces/ItemCategorieI';
import { ClientService } from 'src/services/client.service';
import { ItemService } from 'src/services/item.service';
import { BasketSheetComponent } from './basket-sheet/basket-sheet.component';
import { ItemDetailDialogComponent } from './item-detail-dialog/item-detail-dialog.component';

@Injectable()
export class ProductsService {
    itemList$ = new ReplaySubject<ItemCarteI[]>(1);
    categorieList$ = new ReplaySubject<ItemCategorieI[]>(1);
    basketPrice = 0;
    constructor(
        private itemService: ItemService,
        private clientService: ClientService,
        public media: MediaObserver,
        private dialog: MatDialog,
        private bottomSheet: MatBottomSheet
    ) {
        this.initCategories();
        this.clientService.client$.subscribe((client) => {
            this.basketPrice = client.currentPanier.reduce(
                (sum, itemB) => sum + itemB.price,
                0
            );
        });
    }

    async initCategories(): Promise<void> {
        const categorieList = await this.itemService
            .getCategorieList()
            .toPromise();
        this.categorieList$.next(categorieList);
    }

    async initItemList(categorieId): Promise<ItemCarteI[]> {
        const itemList = await this.itemService
            .getItemCarteListOfCategorie(categorieId)
            .toPromise();

        this.itemList$.next(itemList);
        return itemList;
    }

    openItemDetail(item, mode, itemIndex?): void {
        const config = new MatDialogConfig();
        config.data = {
            item,
            mode,
            itemIndex,
        };
        if (this.media.isActive('lt-md')) {
            config.minWidth = '100%';
            config.minHeight = '100%';
            config.height = '100%';
            config.width = '100%';
            config.panelClass = 'dialog-fullscreen';
            config.closeOnNavigation = false;
        } else {
            config.width = '640px';
            config.maxHeight = '90vh';
        }
        this.dialog.open(ItemDetailDialogComponent, config);
    }

    openBasketSheet(): void {
        this.bottomSheet.open(BasketSheetComponent, {
            data: {
                client$: this.clientService.client$,
                onItemClick: (item, index) => {
                    this.openItemDetail(item, 'edit', index);
                },
            },
        });
    }
}
