import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { ItemCategorieI } from 'src/interfaces/ItemCategorieI';
import { ItemService } from 'src/services/item.service';

@Component({
    selector: 'app-category-selector',
    templateUrl: './category-selector.component.html',
    styleUrls: ['./category-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategorySelectorComponent implements OnInit {
    @Input() categorieList: ItemCategorieI[];

    constructor(private itemService: ItemService) { }

    ngOnInit(): void { }
}
