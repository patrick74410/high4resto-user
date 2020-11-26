import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HomePageService } from 'src/services/home.service';
import { MapService } from 'src/services/map.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
    apiLoaded: Observable<boolean>;
    center: google.maps.LatLngLiteral = { lat: 48.864716, lng: 2.349014 };
    display: any;
    option: google.maps.MapOptions = {};
    constructor(
        private homePageService: HomePageService,
        public mapService: MapService
    ) {}

    ngOnInit() {}
}
