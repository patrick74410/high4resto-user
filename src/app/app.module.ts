import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { BrowserModule, DomSanitizer, Meta } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageService } from 'src/services/home.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appInitializer } from './app.initializer';
import { BlogModule } from './blog/blog.module';
import { HomeModule } from './home/home.module';
import { PhotoModule } from './photo/photo.module';
import { ProductsModule } from './products/products.module';
import { SharedModule } from './shared.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        SharedModule,
        HomeModule,
        ProductsModule,
        BlogModule,
        PhotoModule,
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializer, // <- pass your initializer function here
            deps: [HomePageService, Meta, MatIconRegistry, DomSanitizer],
            multi: true,
        },
    ],
})
export class AppModule {}
