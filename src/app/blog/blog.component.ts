import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { ArticleCategorieI } from 'src/interfaces/ArticleCategorieI';
import { HomePageService } from 'src/services/home.service';
import { AppTitleService } from 'src/services/title.service';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
    articleCategorie: ArticleCategorieI;
    constructor(
        private appTitle: AppTitleService,
        private homePageService: HomePageService,
        private route: ActivatedRoute
    ) {
        this.initBlog();
    }

    ngOnInit(): void {}

    async initBlog(): Promise<void> {
        const homePage = await this.homePageService.homePage$
            .pipe(first())
            .toPromise();

        this.articleCategorie = homePage.articleCategorie.find(
            (articleCategorie) =>
                articleCategorie.id === this.route.snapshot.paramMap.get('id')
        );

        this.appTitle.setTitle(this.articleCategorie.name);
    }
}
