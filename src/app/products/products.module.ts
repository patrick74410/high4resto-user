import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared.module';
import { BasketSheetComponent } from './basket-sheet/basket-sheet.component';
import { BasketViewerComponent } from './basket-viewer/basket-viewer.component';
import { CategorySelectorComponent } from './category-selector/category-selector.component';
import { CategoryViewComponent } from './category-view/category-view.component';
import { ItemDetailDialogComponent } from './item-detail-dialog/item-detail-dialog.component';
import { ItemSelectorComponent } from './item-selector/item-selector.component';
import { ItemViewComponent } from './item-view/item-view.component';
import { ProductsComponent } from './products.component';
import { CommandComponent } from './command/command.component';
const routes: Routes = [
    {
        path: '',
        component: ProductsComponent,
    },
];
@NgModule({
    declarations: [
        ProductsComponent,
        CategorySelectorComponent,
        ItemSelectorComponent,
        CategoryViewComponent,
        ItemViewComponent,
        ItemDetailDialogComponent,
        BasketViewerComponent,
        BasketSheetComponent,
        CommandComponent,
    ],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class ProductsModule {}
