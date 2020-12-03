import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { AlbumViewerComponent } from './album-viewer/album-viewer.component';
import { PhotoComponent } from './photo.component';
import { PhotoListComponent } from './photo-list/photo-list.component';

@NgModule({
    declarations: [PhotoComponent, AlbumViewerComponent, PhotoListComponent],
    imports: [CommonModule, SharedModule],
})
export class PhotoModule {}
