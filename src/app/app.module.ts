import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { BrowserModule, DomSanitizer, Meta } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageService } from 'src/services/home.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appInitializer } from './app.initializer';
import { SharedModule } from './shared.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        SharedModule,
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializer, // <- pass your initializer function here
            deps: [HomePageService, Meta],
            multi: true,
        },
    ],
})
export class AppModule {
    constructor(iconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
        iconRegistry.addSvgIconSet(
            domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg')
        );
    }
}
