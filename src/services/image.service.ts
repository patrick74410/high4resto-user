import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../environments/environment';
import { ImageCategorieI } from '../interfaces/ImageCategorie';
import { ImageI } from '../interfaces/ImageI';

@Injectable({
    providedIn: 'root',
})
export class ImageService {
    constructor(private http: HttpClient) {}

    getCategorieList() {
        return this.http.get<ImageCategorieI[]>(
            `${env.apiUrl}/imageCategorie/find/`
        );
    }

    getImageListOfCategorie(categorieId) {
        return this.http.get<ImageI[]>(
            `${env.apiUrl}/image/filter/${categorieId}`
        );
    }

    getImageById(imageId) {
        return this.http.get<ImageI>(
            `${env.apiUrl}/image/find/${imageId}`
        );
    }
}
