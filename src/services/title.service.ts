import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AppTitleService {
    appTitle$ = new BehaviorSubject<string>('');
    constructor(private angularTitle: Title) {}

    setTitle(title: string) {
        this.angularTitle.setTitle(title);
        this.appTitle$.next(title);
    }
}
