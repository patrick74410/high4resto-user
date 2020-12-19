import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { ArticleI } from 'src/interfaces/ArticleI';
import { ArticleService } from 'src/services/article.service';
import { environment as env } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ArticleResolver implements Resolve<ArticleI> {
    constructor(
        private articleService: ArticleService,
        private metaService: Meta
    ) { }

    async resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<any> {
        const article = await this.articleService
            .getArticleById(route.paramMap.get('articleId'))
            .toPromise();
        this.metaService.updateTag({
            name: 'og:title',
            content: article.title,
        });
        this.metaService.updateTag({
            name: 'twitter:title',
            content: article.title,
        });
        this.metaService.updateTag({
            name: 'og:description',
            content: article.resume,
        });
        this.metaService.updateTag({
            name: 'twitter:description',
            content: article.resume,
        });
        this.metaService.updateTag({
            name: 'og:image',
            content: `${env.apiUrl}/images/download/${article.image.gridId}`,
        });
        this.metaService.updateTag({
            name: 'twitter:image',
            content: `${env.apiUrl}/images/download/${article.image.gridId}`,
        });
        return article;
    }
}
