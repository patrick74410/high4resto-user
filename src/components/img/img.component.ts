import { Component, Input, OnInit } from '@angular/core';
import { ImageI } from 'src/interfaces/ImageI';
import { ImageService } from 'src/services/image.service';

@Component({
    selector: 'app-img',
    templateUrl: './img.component.html',
    styleUrls: ['./img.component.scss'],
})
export class ImgComponent implements OnInit {
    @Input() src: ImageI;
    @Input() mini: boolean;
    constructor(private imgService: ImageService) {}

    ngOnInit(): void {}

    resolveSrc() {
        return this.imgService.resolveImageByGridId(
            this.mini ? this.src.miniGridId : this.src.gridId
        );
    }
}
