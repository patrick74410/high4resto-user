import { Component, OnInit } from '@angular/core';
import { AppTitleService } from 'src/services/title.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    constructor(private appTitle: AppTitleService) {}

    ngOnInit(): void {
        this.appTitle.setTitle('Accueil');
    }
}
