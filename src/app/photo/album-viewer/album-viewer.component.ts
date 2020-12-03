import { Component, Input, OnInit } from '@angular/core';
import { ImageCategorieI } from 'src/interfaces/ImageCategorie';

@Component({
    selector: 'app-album-viewer',
    templateUrl: './album-viewer.component.html',
    styleUrls: ['./album-viewer.component.scss'],
})
export class AlbumViewerComponent implements OnInit {
    @Input() album: ImageCategorieI;
    constructor() {}

    ngOnInit(): void {}
}
