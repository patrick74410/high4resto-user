import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { WebConfigI } from 'src/interfaces/webConfigI.interface';
import { environment as env } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebConfigService {
  webConfig$ = new ReplaySubject<WebConfigI>(1);
  constructor(private http: HttpClient) {
    this.http
      .get<WebConfigI[]>(`${env.apiUrl}/webConfig/find/`)
      .subscribe((webConfigList) => {
        this.webConfig$.next(webConfigList[0]);
      });
  }
}
