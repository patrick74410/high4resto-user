import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ItemCarteI } from 'src/interfaces/ItemCarteI';
import { ItemService } from 'src/services/item.service';
import { ItemDetailDialogComponent } from '../item-detail-dialog/item-detail-dialog.component';

@Component({
    selector: 'app-item-selector',
    templateUrl: './item-selector.component.html',
    styleUrls: ['./item-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemSelectorComponent implements OnInit {
    @Input() itemList: ItemCarteI;
    constructor(
        private itemService: ItemService,
        public media: MediaObserver,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {}

    openItemDetail(item) {
        const config = new MatDialogConfig();
        config.data = {
            item,
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
}
