import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DrawerService } from 'src/services/drawer.service';
import { ItemService } from 'src/services/item.service';
import { AppTitleService } from 'src/services/title.service';
import { ProductsService } from '../products.service';

@Component({
    selector: 'app-category-view',
    templateUrl: './category-view.component.html',
    styleUrls: ['./category-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryViewComponent implements OnInit {
    constructor(
        private itemService: ItemService,
        public productsService: ProductsService,
        public drawerService: DrawerService,
        public appTitle: AppTitleService
    ) {}

    ngOnInit(): void {}
}
