import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { HomePageService } from 'src/services/home.service';
import { AppTitleService } from 'src/services/title.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
    constructor(
        private appTitle: AppTitleService,
        public homePageService: HomePageService,
        public media: MediaObserver
    ) {}

    ngOnInit(): void {
        this.appTitle.setTitle('Accueil');
    }
}
