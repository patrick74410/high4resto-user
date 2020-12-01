import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { ArticleI } from 'src/interfaces/ArticleI';
import { ArticleService } from 'src/services/article.service';
import { AppTitleService } from 'src/services/title.service';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
    article$ = new ReplaySubject<ArticleI>(1);
    shareLinks = [
        {
            icon: 'facebook',
            label: 'facebook',
            url: `https://www.facebook.com/sharer/sharer.php?u=${location.href}`,
        },
        {
            icon: 'twitter',
            label: 'twitter',
            url: `https://twitter.com/intent/tweet?text=${location.href}`,
        },
    ];
    constructor(
        private appTitle: AppTitleService,
        private route: ActivatedRoute,
        public articleService: ArticleService,
        public media: MediaObserver
    ) {}

    ngOnInit(): void {
        this.initArticle();
    }

    async initArticle(): Promise<void> {
        const article = this.route.snapshot.data.article;
        this.article$.next(article);
        this.appTitle.setTitle(article.title);
    }

    shareCopy() {
        navigator.clipboard.writeText(location.href);
    }
}
