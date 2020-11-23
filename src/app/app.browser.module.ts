import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AuthClientConfig, AuthModule } from '@auth0/auth0-angular';
import { HomePageService } from 'src/services/home.service';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { authInitializer } from './auth.initializer';

@NgModule({
    imports: [AppModule, AuthModule.forRoot()],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: authInitializer, // <- pass your initializer function here
            deps: [HomePageService, AuthClientConfig],
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppBrowserModule {}
