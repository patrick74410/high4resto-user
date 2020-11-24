import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { ArticlePreviewComponent } from './article-preview/article-preview.component';
import { ArticleComponent } from './article/article.component';



@NgModule({
  declarations: [BlogComponent, ArticlePreviewComponent, ArticleComponent],
  imports: [
    CommonModule
  ]
})
export class BlogModule { }
