import { Component, Input, OnInit } from '@angular/core';
import { ArticleI } from 'src/interfaces/ArticleI';
import { ArticleService } from 'src/services/article.service';

@Component({
    selector: 'app-article-preview',
    templateUrl: './article-preview.component.html',
    styleUrls: ['./article-preview.component.scss'],
})
export class ArticlePreviewComponent implements OnInit {
    @Input() article: ArticleI;
    @Input() vertical = false;
    constructor(public articleService: ArticleService) { }

    ngOnInit(): void { }
}
