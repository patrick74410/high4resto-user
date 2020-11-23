import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { HomePageService } from 'src/services/home.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'high4resto-frontEnd';
    constructor(
        public homePageService: HomePageService,
        public auth: AuthService
    ) {}
}
