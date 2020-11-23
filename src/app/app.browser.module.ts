import { HttpClientJsonpModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AuthClientConfig, AuthModule } from '@auth0/auth0-angular';
import { HomePageService } from 'src/services/home.service';
import { MapService } from 'src/services/map.service';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { browserInitializer } from './browser.initializer';

@NgModule({
    imports: [AppModule, AuthModule.forRoot(), HttpClientJsonpModule],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: browserInitializer, // <- pass your initializer function here
            deps: [HomePageService, AuthClientConfig, MapService],
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppBrowserModule {}
