import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapComponent } from './map.component';

@NgModule({
    declarations: [MapComponent],
    imports: [
        CommonModule,
        GoogleMapsModule,
        HttpClientModule,
        HttpClientJsonpModule,
    ],
    exports: [MapComponent],
})
export class MapModule {}
