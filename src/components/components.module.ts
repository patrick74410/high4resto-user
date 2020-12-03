import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LightboxModule } from 'ng-gallery/lightbox';
import { ImgComponent } from './img/img.component';
import { MapModule } from './map/map.module';

@NgModule({
    declarations: [ImgComponent],
    imports: [CommonModule, LightboxModule],
    exports: [MapModule, ImgComponent],
})
export class ComponentsModule {}
