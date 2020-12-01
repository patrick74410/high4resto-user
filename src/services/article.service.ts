import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../environments/environment';
import { ArticleCategorieI } from '../interfaces/ArticleCategorieI';
import { ArticleI } from '../interfaces/ArticleI';

const monthMap = {
    1: 'Janvier',
    2: 'Février',
    3: 'Mars',
    4: 'Avril',
    5: 'Mai',
    6: 'Juin',
    7: 'Juillet',
    8: 'Août',
    9: 'Septembre',
    10: 'Octobre',
    11: 'Novembre',
    12: 'Décembre',
};
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
    getDateString(date) {
        const dateSplit = date.split('/');
        return `le ${dateSplit[0]} ${monthMap[dateSplit[1]]} ${dateSplit[2]}`;
    }
}
