import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './blog/article/article.component';
import { ArticleResolver } from './blog/article/article.resolver';
import { BlogComponent } from './blog/blog.component';
import { HomeComponent } from './home/home.component';
import { PhotoListComponent } from './photo/photo-list/photo-list.component';
import { PhotoComponent } from './photo/photo.component';
import { CategoryViewComponent } from './products/category-view/category-view.component';
import { ItemViewComponent } from './products/item-view/item-view.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'products',
        component: ProductsComponent,
        data: {
            overrideToolbar: true,
        },
        children: [
            {
                path: '',
                component: CategoryViewComponent,
            },
            {
                path: ':category',
                component: ItemViewComponent,
            },
        ],
    },
    {
        path: 'blog/:id',
        component: BlogComponent,
    },
    {
        path: 'blog/:id/article/:articleId',
        component: ArticleComponent,
        data: {
            overrideToolbar: true,
        },
        resolve: {
            article: ArticleResolver,
        },
    },
    {
        path: 'photos',
        component: PhotoComponent,
    },
    {
        path: 'photos/:albumId',
        component: PhotoListComponent,
        data: {
            overrideToolbar: true,
        },
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            initialNavigation: 'enabled',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule { }
