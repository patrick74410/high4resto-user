import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { ArticleCategorieI } from 'src/interfaces/ArticleCategorieI';
import { ArticleI } from 'src/interfaces/ArticleI';
import { ArticleService } from 'src/services/article.service';
import { HomePageService } from 'src/services/home.service';
import { AppTitleService } from 'src/services/title.service';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent implements OnInit {
    articleCategorie: ArticleCategorieI;
    articleList$ = new ReplaySubject<ArticleI[]>(1);
    constructor(
        private appTitle: AppTitleService,
        private homePageService: HomePageService,
        private route: ActivatedRoute,
        private articleService: ArticleService,
        public media: MediaObserver
    ) {}

    ngOnInit(): void {
        this.initBlog();
    }

    async initBlog(): Promise<void> {
        const homePage = await this.homePageService.homePage$
            .pipe(first())
            .toPromise();

        this.articleCategorie = homePage.articleCategorie.find(
            (articleCategorie) =>
                articleCategorie.id === this.route.snapshot.paramMap.get('id')
        );

        this.articleService
            .getArticleListOfCategorie(this.articleCategorie.id)
            .subscribe((val) => {
                this.articleList$.next(val);
            });
        this.appTitle.setTitle(this.articleCategorie.name);
    }
}
