import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Observable } from 'rxjs';
import { ClientI } from 'src/interfaces/Client';

@Component({
    selector: 'app-basket-sheet',
    templateUrl: './basket-sheet.component.html',
    styleUrls: ['./basket-sheet.component.scss'],
})
export class BasketSheetComponent implements OnInit {
    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA)
        public data: {
            client$: Observable<ClientI>;
            onItemClick: any;
        }
    ) { }

    ngOnInit(): void { }
}
