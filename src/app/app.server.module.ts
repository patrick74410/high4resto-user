import { NgModule } from '@angular/core';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { ServerModule } from '@angular/platform-server';
import { AuthService } from '@auth0/auth0-angular';
import { ServerAuthService } from 'src/services/auth.service.server';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
    imports: [AppModule, ServerModule, FlexLayoutServerModule],
    providers: [
        {
            provide: AuthService,
            useClass: ServerAuthService,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppServerModule {}
