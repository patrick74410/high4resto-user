import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { ArticlePreviewComponent } from './article-preview/article-preview.component';
import { ArticleComponent } from './article/article.component';
import { BlogComponent } from './blog.component';

@NgModule({
    declarations: [BlogComponent, ArticlePreviewComponent, ArticleComponent],
    imports: [CommonModule, SharedModule],
    exports: [ArticlePreviewComponent],
})
export class BlogModule { }
