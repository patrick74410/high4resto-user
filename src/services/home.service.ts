import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { environment as env } from '../environments/environment';
import { HomePageI } from '../interfaces/HomePage';

@Injectable({
    providedIn: 'root',
})
export class HomePageService {
    homePage$ = new ReplaySubject<HomePageI>(1);
    constructor(private http: HttpClient) {
        this.http
            .get<HomePageI>(`${env.apiUrl}/homePage/get/`)
            .subscribe((homePage) => {
                this.homePage$.next(homePage);
            });
    }
}
