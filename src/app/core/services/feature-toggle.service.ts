import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IFeatureToggle } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeatureToggleService {
  constructor(protected httpClient: HttpClient) {}

  public create(featureToggle: IFeatureToggle): Observable<IFeatureToggle> {
    return this.httpClient.post<IFeatureToggle>(
      `${environment.uri}/api/feature-toggle/${featureToggle.key}`,
      featureToggle,
    );
  }

  public find(key: string): Observable<IFeatureToggle> {
    return this.httpClient.get<IFeatureToggle>(`${environment.uri}/api/FeatureToggle/${key}`);
  }

  public findAll(includedArchived: boolean = false): Observable<Array<IFeatureToggle>> {
    return this.httpClient.get<Array<IFeatureToggle>>(
      `${environment.uri}/api/feature-toggle?includeArchived=${includedArchived}`,
    );
  }

  public update(featureToggle: IFeatureToggle): Observable<IFeatureToggle> {
    return this.httpClient.put<IFeatureToggle>(
      `${environment.uri}/api/feature-toggle/${featureToggle.key}`,
      featureToggle,
    );
  }
}
