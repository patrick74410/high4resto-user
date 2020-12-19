import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ClientI } from 'src/interfaces/Client';
import { BasketResume } from 'src/interfaces/commande/basketResume';
import { CommandeResume } from 'src/interfaces/commande/commandeResume';
import { MiniBasket } from 'src/interfaces/commande/MiniBasket';
import { MiniCommande } from 'src/interfaces/commande/miniCommande';
import { ItemCarteI } from 'src/interfaces/ItemCarteI';
import { PreOrderI } from 'src/interfaces/tracability/PreOrder';
import { environment as env } from '../environments/environment';

const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);

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

    generateCommande(mode:string):Observable<ClientI>
    {
        return this.http.get<ClientI>( `${env.apiUrl}/client/generateCommande/${this.clientId}/${this.securityKey}/${mode}`)
    }

    generateBasketResume(items:ItemCarteI[]):BasketResume
    {
        var result:BasketResume=new BasketResume();
        var tp:Record<string,ItemCarteI[]>=groupBy(items, i => i.name);
        for (let key in tp)
        {
            var tpMini:MiniBasket=new MiniBasket();
            tpMini.qty=tp[key].length;
            tpMini.productName=key;
            result.items.push(tpMini);
        }
        return result;
    }

    generateCommandeResume(preOrders:PreOrderI[]):CommandeResume
    {
        var result:CommandeResume=new CommandeResume();
        var tp:Record<string,PreOrderI[]>=groupBy(preOrders, i => i.stock.item.longName);
        var totalPrice:number=0.0;
        var totalTva:number=0.0;
        for (let key in tp)
        {
            var tpMini:MiniCommande=new MiniCommande();
            tpMini.priceTTC=tp[key][0].stock.item.priceFN;
            tpMini.priceTVA=(tp[key][0].stock.item.priceFN-tp[key][0].stock.item.priceHT);
            tpMini.productName=key;
            tpMini.qty=tp[key].length;
            tpMini.promotion=tpMini.priceTTC-tp[key][0].stock.item.price;
            result.items.push(tpMini);
            totalPrice+=tpMini.qty*tpMini.priceTTC;
            totalTva+=tpMini.qty*tpMini.priceTVA;
        }
        result.totalPrice=totalPrice;
        result.totalTva=totalTva.toFixed(2);
        return result;
    }

}
