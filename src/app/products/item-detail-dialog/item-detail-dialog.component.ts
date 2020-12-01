import { Component, Inject, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ItemCarteI } from 'src/interfaces/ItemCarteI';

@Component({
    selector: 'app-item-detail-dialog',
    templateUrl: './item-detail-dialog.component.html',
    styleUrls: ['./item-detail-dialog.component.scss'],
})
export class ItemDetailDialogComponent implements OnInit {
    item: ItemCarteI = this.data.item;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<ItemDetailDialogComponent>,
        private dialog: MatDialog,
        public media: MediaObserver
    ) {}

    ngOnInit(): void {}
}
