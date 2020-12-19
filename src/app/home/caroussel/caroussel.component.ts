import { Component, Input, OnInit } from '@angular/core';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { ImageI } from 'src/interfaces/ImageI';
import { ImageService } from 'src/services/image.service';

@Component({
    selector: 'app-caroussel',
    templateUrl: './caroussel.component.html',
    styleUrls: ['./caroussel.component.scss'],
})
export class CarousselComponent implements OnInit {
    galleryItemList: GalleryItem[];
    @Input() set imageList(imageList: ImageI[]) {
        const galleryItemList = [];
        imageList.forEach((image) => {
            galleryItemList.push(
                new ImageItem({
                    src: this.resolveGridId(image.gridId),
                    thumb: this.resolveGridId(image.miniGridId),
                    description: image.description,
                } as any)
            );
        });
        this.galleryItemList = galleryItemList;
    }

    constructor(private imgService: ImageService) { }
    ngOnInit(): void { }
    resolveGridId(gridId): string {
        return this.imgService.resolveImageByGridId(gridId);
    }
}
