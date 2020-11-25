import { Component, OnInit } from '@angular/core';
import { AppTitleService } from 'src/services/title.service';

@Component({
    selector: 'app-photo',
    templateUrl: './photo.component.html',
    styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent implements OnInit {
    constructor(private appTitle: AppTitleService) {}

    ngOnInit(): void {
        this.appTitle.setTitle('Photos');
    }
}
