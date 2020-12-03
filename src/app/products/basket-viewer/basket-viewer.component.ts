import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemCarteI } from 'src/interfaces/ItemCarteI';
import { ClientService } from 'src/services/client.service';

@Component({
    selector: 'app-basket-viewer',
    templateUrl: './basket-viewer.component.html',
    styleUrls: ['./basket-viewer.component.scss'],
})
export class BasketViewerComponent implements OnInit {
    @Input() set panier(panier: ItemCarteI[]) {
        panier = panier || [];
        this.fullPrice = panier.reduce((sum, itemB) => sum + itemB.price, 0);

        this._panier = panier;
    }
    @Input() price: number;

    @Output() itemClicked = new EventEmitter();
    @Output() payoutClicked = new EventEmitter();
    _panier: ItemCarteI[] = [];
    fullPrice = 0;
    constructor(public clientService: ClientService) {}

    ngOnInit(): void {}
}
