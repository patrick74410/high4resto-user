import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GpsI } from 'src/interfaces/GpsI';
import { HomePageService } from 'src/services/home.service';
import { MapService } from 'src/services/map.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
    @Input() coordinate: GpsI;
    apiLoaded: Observable<boolean>;
    center: google.maps.LatLngLiteral;
    display: any;
    option: google.maps.MapOptions = {
        fullscreenControl: false,
        gestureHandling: 'none',
        mapTypeControl: false,
    };
    constructor(
        private homePageService: HomePageService,
        public mapService: MapService
    ) { }

    ngOnInit() {
        this.center = {
            lat: this.coordinate.latitude,
            lng: this.coordinate.longitude,
        };
    }
}
