import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AppTitleService {
    appTitle$ = new ReplaySubject<string>(1);
    constructor(private angularTitle: Title) {}

    setTitle(title: string) {
        this.angularTitle.setTitle(title);
        this.appTitle$.next(title);
    }
}
