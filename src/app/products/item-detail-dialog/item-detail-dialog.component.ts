import { Component, Inject, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatListOption } from '@angular/material/list';
import { AuthService } from '@auth0/auth0-angular';
import { first } from 'rxjs/operators';
import { ItemCarteI } from 'src/interfaces/ItemCarteI';
import { OptionsItemI } from 'src/interfaces/OptionsItem';
import { ClientService } from 'src/services/client.service';

@Component({
    selector: 'app-item-detail-dialog',
    templateUrl: './item-detail-dialog.component.html',
    styleUrls: ['./item-detail-dialog.component.scss'],
})
export class ItemDetailDialogComponent implements OnInit {
    item: ItemCarteI = JSON.parse(JSON.stringify(this.data.item));
    loading = false;
    price = 0;
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: {
            item: ItemCarteI;
            mode: 'add' | 'edit';
            itemIndex?: number;
        },
        private dialogRef: MatDialogRef<ItemDetailDialogComponent>,
        private dialog: MatDialog,
        public media: MediaObserver,
        public auth: AuthService,
        private clientService: ClientService
    ) {}

    ngOnInit(): void {
        this.updateItemPrice();
    }
    updateItemPrice(): void {
        this.price = this.clientService.calculateItemPrice(this.item);
    }

    optionsFilled(): boolean {
        return this.item.options.every((option) => {
            return (
                !option.unique ||
                option.options.some((choice) => {
                    return choice.selected;
                })
            );
        });
    }

    applyChoiceToItem(option: OptionsItemI, selection: MatListOption[]): void {
        option.options.forEach((choice) => {
            choice.selected = false;
        });
        selection.forEach((listOption) => {
            option.options[listOption.value].selected = true;
        });
        this.updateItemPrice();
    }

    async addItem(): Promise<void> {
        return this.updateClient(
            (client) => {
                client.currentPanier.push(this.item);
                this.data.item.stock -= 1;
            },
            () => {
                this.data.item.stock += 1;
            }
        );
    }

    async removeItem(): Promise<void> {
        return this.updateClient(
            (client) => {
                client.currentPanier.splice(this.data.itemIndex, 1);
                this.data.item.stock += 1;
            },
            (client) => {
                client.currentPanier.splice(0, 1, this.data.item);
                this.data.item.stock -= 1;
            }
        );
    }

    async updateItem(): Promise<void> {
        return this.updateClient(
            (client) => {
                client.currentPanier[this.data.itemIndex] = this.item;
            },
            (client) => {
                client.currentPanier[this.data.itemIndex] = this.data.item;
            }
        );
    }

    async updateClient(action, error): Promise<void> {
        this.loading = true;
        const client = await this.clientService.client$
            .pipe(first())
            .toPromise();
        action(client);
        const res = await this.clientService
            .updateClient(client)
            .toPromise()
            .catch((e) => error(client, e));
        this.loading = false;
        this.data.item.stock += 1;
        this.dialogRef.close();
    }

    authenticate() {
        sessionStorage.setItem(
            'redirectRoute',
            JSON.stringify({
                category: this.item.categorie.id,
                item: this.item.id,
            })
        );
        this.auth.loginWithRedirect();
    }
}
