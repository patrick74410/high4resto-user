import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImgComponent } from './img/img.component';
import { MapModule } from './map/map.module';

@NgModule({
    declarations: [ImgComponent],
    imports: [CommonModule],
    exports: [MapModule, ImgComponent],
})
export class ComponentsModule {}
