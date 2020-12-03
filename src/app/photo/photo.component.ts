import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ImageCategorieI } from 'src/interfaces/ImageCategorie';
import { ImageService } from 'src/services/image.service';
import { AppTitleService } from 'src/services/title.service';

@Component({
    selector: 'app-photo',
    templateUrl: './photo.component.html',
    styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent implements OnInit {
    albumList$ = new ReplaySubject<ImageCategorieI[]>(1);

    constructor(
        private appTitle: AppTitleService,
        private imageService: ImageService
    ) {
        this.appTitle.setTitle('Photos');
    }

    ngOnInit(): void {
        this.initPhoto();
    }

    async initPhoto(): Promise<void> {
        const albumList = await this.imageService
            .getCategorieList()
            .toPromise();
        this.albumList$.next(albumList);
    }
}
