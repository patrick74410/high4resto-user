import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../environments/environment';
import { ArticleCategorieI } from '../interfaces/ArticleCategorieI';
import { ArticleI } from '../interfaces/ArticleI';

@Injectable({
    providedIn: 'root',
})
export class ArticleService {
    constructor(private http: HttpClient) {}

    getCategorieList() {
        return this.http.get<ArticleCategorieI[]>(
            `${env.apiUrl}/articleCategorie/find/`
        );
    }

    getArticleListOfCategorie(categorieId) {
        return this.http.get<ArticleI[]>(
            `${env.apiUrl}/article/filter/${categorieId}`
        );
    }

    getArticleById(articleId) {
        return this.http.get<ArticleI>(
            `${env.apiUrl}/article/find/${articleId}`
        );
    }
}
