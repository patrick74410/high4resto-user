/**
 * This service is a SHIM for Angular Universal Server Side for Auth0
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ServerAuthService {
  isAuthenticated$ = new BehaviorSubject(false);
}
