/**
 * This service is a SHIM for Angular Universal Server Side for Auth0
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ServerAuthService {
    isAuthenticated$ = new BehaviorSubject(false);
    user$ = new Observable();
}
