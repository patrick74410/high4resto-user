import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ActivatedRoute } from '@angular/router';
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';
import { ImageService } from 'src/services/image.service';

@Component({
    selector: 'app-photo-list',
    templateUrl: './photo-list.component.html',
    styleUrls: ['./photo-list.component.scss'],
})
export class PhotoListComponent implements OnInit {
    galleryId: string;
    items: GalleryItem[];
    constructor(
        private imageService: ImageService,
        private route: ActivatedRoute,
        public gallery: Gallery,
        public media: MediaObserver,
        private changeDetector: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.initPhotoList();
    }

    async initPhotoList(): Promise<void> {
        this.galleryId = this.route.snapshot.params.albumId;
        const photoList = await this.imageService
            .getImageListOfCategorie(this.galleryId)
            .toPromise();
        const galleryRef = this.gallery.ref(this.galleryId);

        this.items = photoList.map((image) => {
            return new ImageItem({
                src: this.imageService.resolveImageByGridId(image.gridId),
                thumb: this.imageService.resolveImageByGridId(image.miniGridId),
            });
        });
        galleryRef.load(this.items);
        this.changeDetector.detectChanges();
    }
}
