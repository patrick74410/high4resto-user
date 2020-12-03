import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MapService {
    apiLoaded$ = new BehaviorSubject(false);
    constructor(private http: HttpClient) {}
    loadApi(apiKey): void {
        this.http
            .jsonp(
                `https://maps.googleapis.com/maps/api/js?key=${apiKey}`,
                'callback'
            )
            .subscribe(() => {
                this.apiLoaded$.next(true);
            });
    }
}
