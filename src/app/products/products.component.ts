import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, first, map } from 'rxjs/operators';
import { ItemService } from 'src/services/item.service';
import { AppTitleService } from 'src/services/title.service';
import { ProductsService } from './products.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ProductsService],
})
export class ProductsComponent implements OnInit {
    productCategory$ = this.route.firstChild.paramMap.pipe(
        map((paramsMap) => paramsMap.get('category'))
    );
    constructor(
        private appTitle: AppTitleService,
        private itemService: ItemService,
        public media: MediaObserver,
        private route: ActivatedRoute,
        private router: Router,
        public productsService: ProductsService
    ) {
        this.appTitle.setTitle('Nos produits');
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((res) => {
                this.productsService.initItemList(
                    this.route.snapshot.firstChild.params.category
                );
            });
    }

    ngOnInit(): void {
        this.productsService.categorieList$
            .pipe(first())
            .subscribe((categorieList) => {
                if (this.media.isActive('gt-md')) {
                    this.router.navigate(['products', categorieList[0].id]);
                }
            });
    }
}
