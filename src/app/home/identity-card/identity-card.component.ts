import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { HoraireI } from 'src/interfaces/HoraireI';
import { IdentiteI } from 'src/interfaces/IdentiteI';

@Component({
    selector: 'app-identity-card',
    templateUrl: './identity-card.component.html',
    styleUrls: ['./identity-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentityCardComponent implements OnInit {
    @Input() identite: IdentiteI;
    @Input() horaire: HoraireI;

    constructor() {}

    ngOnInit(): void {}

    get fullAddress(): string {
        return `${this.identite.adresse}, ${this.identite.zip} ${this.identite.city}`;
    }

    getContactIcon(key) {
        const map = {
            email: 'email',
            tel: 'phone',
        };

        let icon = map[key];
        if (!icon) {
            icon = 'card-account-phone';
        }
        return icon;
    }
}
