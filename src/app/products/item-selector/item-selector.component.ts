import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit
} from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ItemCarteI } from 'src/interfaces/ItemCarteI';
import { ProductsService } from '../products.service';

@Component({
    selector: 'app-item-selector',
    templateUrl: './item-selector.component.html',
    styleUrls: ['./item-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemSelectorComponent implements OnInit {
    @Input() itemList: ItemCarteI;
    constructor(
        public media: MediaObserver,
        public productService: ProductsService
    ) { }

    ngOnInit(): void { }
}
