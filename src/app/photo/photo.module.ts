import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { AlbumViewerComponent } from './album-viewer/album-viewer.component';
import { PhotoComponent } from './photo.component';

@NgModule({
    declarations: [PhotoComponent, AlbumViewerComponent],
    imports: [CommonModule, SharedModule],
})
export class PhotoModule {}
