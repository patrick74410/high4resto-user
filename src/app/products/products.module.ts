import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared.module';
import { ProductsComponent } from './products.component';
import { CategorySelectorComponent } from './category-selector/category-selector.component';
import { ItemSelectorComponent } from './item-selector/item-selector.component';
import { CategoryViewComponent } from './category-view/category-view.component';
import { ItemViewComponent } from './item-view/item-view.component';
const routes: Routes = [
    {
        path: '',
        component: ProductsComponent,
    },
];
@NgModule({
    declarations: [ProductsComponent, CategorySelectorComponent, ItemSelectorComponent, CategoryViewComponent, ItemViewComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class ProductsModule {}
