import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFeatureToggle } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OpenIDService } from './open-id.service';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuditService {
  constructor(protected httpClient: HttpClient, protected openIDService: OpenIDService) {}

  public findAll(): Observable<Array<any>> {
    return this.openIDService.getUser().pipe(
      mergeMap((user) =>
        this.httpClient.get<Array<IFeatureToggle>>(`${environment.uri}/api/audit`, {
          headers: new HttpHeaders({
            authorization: `Bearer ${user.id_token}`,
          }),
        }),
      ),
    );
  }
}
