import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ClientI } from 'src/interfaces/Client';
import { CommandeI } from 'src/interfaces/CommandeI';
import { ItemCarteI } from 'src/interfaces/ItemCarteI';
import { environment as env } from '../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ClientService {
    client$ = new ReplaySubject<ClientI>(1);
    securityKey: string;
    clientId: string;
    constructor(private http: HttpClient, private authService: AuthService) {
        this.authService.user$.subscribe((user) => {
            this.securityKey =
                user['https://high4resto.high4technology.fr/generateKey'];
            this.clientId =
                user['https://high4resto.high4technology.fr/clientId'];
            this.getClient().subscribe((client) => {
                this.client$.next(client);
            });
        });
    }

    getClient() {
        return this.http.get<ClientI>(
            `${env.apiUrl}/client/get/${this.clientId}/${this.securityKey}`
        );
    }

    updateClient(client) {
        return this.http
            .put<ClientI>(
                `${env.apiUrl}/client/update/${this.securityKey}`,
                client
            )
            .pipe(
                tap((clientUpdated) => {
                    this.client$.next(clientUpdated);
                })
            );
    }

    calculateItemPrice(item: ItemCarteI): number {
        return (
            item.price +
            item.options.reduce((sum, option) => {
                return (
                    sum +
                    option.options.reduce((sum2, choice) => {
                        return sum2 + (choice.selected ? choice.price : 0);
                    }, 0)
                );
            }, 0)
        );
    }

    generateCommande():Observable<ClientI>
    {
        return this.http.get<ClientI>( `${env.apiUrl}/client/generateCommande/${this.clientId}/${this.securityKey}`)
    }

}
