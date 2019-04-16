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
export class FeatureToggleService {
  constructor(protected httpClient: HttpClient, protected openIDService: OpenIDService) {}

  public create(featureToggle: IFeatureToggle): Observable<IFeatureToggle> {
    return this.openIDService.getUser().pipe(
      mergeMap((user) =>
        this.httpClient.post<IFeatureToggle>(
          `${environment.uri}/api/feature-toggle/${featureToggle.key}`,
          featureToggle,
          {
            headers: new HttpHeaders({
              authorization: `Bearer ${user.id_token}`,
            }),
          },
        ),
      ),
    );
  }

  public find(key: string): Observable<IFeatureToggle> {
    return this.openIDService.getUser().pipe(
      mergeMap((user) =>
        this.httpClient.get<IFeatureToggle>(`${environment.uri}/api/FeatureToggle/${key}`, {
          headers: new HttpHeaders({
            authorization: `Bearer ${user.id_token}`,
          }),
        }),
      ),
    );
  }

  public findAll(includedArchived: boolean = false): Observable<Array<IFeatureToggle>> {
    return this.openIDService.getUser().pipe(
      mergeMap((user) =>
        this.httpClient.get<Array<IFeatureToggle>>(
          `${environment.uri}/api/feature-toggle?includeArchived=${includedArchived}`,
          {
            headers: new HttpHeaders({
              authorization: `Bearer ${user.id_token}`,
            }),
          },
        ),
      ),
    );
  }

  public update(featureToggle: IFeatureToggle): Observable<IFeatureToggle> {
    return this.openIDService.getUser().pipe(
      mergeMap((user) =>
        this.httpClient.put<IFeatureToggle>(
          `${environment.uri}/api/feature-toggle/${featureToggle.key}`,
          featureToggle,
          {
            headers: new HttpHeaders({
              authorization: `Bearer ${user.id_token}`,
            }),
          },
        ),
      ),
    );
  }
}
