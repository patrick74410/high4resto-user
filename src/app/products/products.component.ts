import { Component, OnInit } from '@angular/core';
import { AppTitleService } from 'src/services/title.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
    constructor(private appTitle: AppTitleService) {}

    ngOnInit(): void {
        this.appTitle.setTitle('Nos produits');
    }
}
