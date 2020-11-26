import { Component, Input, OnInit } from '@angular/core';
import { ArticleI } from 'src/interfaces/ArticleI';

@Component({
    selector: 'app-article-preview',
    templateUrl: './article-preview.component.html',
    styleUrls: ['./article-preview.component.scss'],
})
export class ArticlePreviewComponent implements OnInit {
    @Input() article: ArticleI;
    @Input() vertical = false;
    constructor() {}

    ngOnInit(): void {}
}
