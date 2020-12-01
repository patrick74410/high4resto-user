import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { ProductsService } from '../products.service';

@Component({
    selector: 'app-item-view',
    templateUrl: './item-view.component.html',
    styleUrls: ['./item-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemViewComponent implements OnInit {
    title: string;
    constructor(
        private route: ActivatedRoute,
        public productsService: ProductsService
    ) {}

    async ngOnInit(): Promise<void> {
        this.title = await this.getCategorieTitle();
    }

    async getCategorieTitle(): Promise<string> {
        const categorieList = await this.productsService.categorieList$
            .pipe(first())
            .toPromise();
        const categorie = categorieList.find(
            (categorie) => categorie.id === this.route.snapshot.params.category
        );
        console.log(categorie);
        return categorie.name;
    }
}
