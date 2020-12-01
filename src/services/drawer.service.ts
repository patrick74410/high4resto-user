import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DrawerService {
    opened = false;
    constructor() {}
    open() {
        this.opened = true;
    }
}
