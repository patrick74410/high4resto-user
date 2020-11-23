import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemCarteI } from 'src/interfaces/ItemCarteI';
import { ItemCategorieI } from 'src/interfaces/ItemCategorieI';
import { environment as env } from '../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ItemService {
    constructor(private http: HttpClient) {}

    getCategorieList() {
        return this.http.get<ItemCategorieI[]>(`${env.apiUrl}/categorie/find/`);
    }

    getItemCarteListOfCategorie(categorieId) {
        return this.http.get<ItemCarteI[]>(
            `${env.apiUrl}/itemCarte/filter/${categorieId}`
        );
    }
}
