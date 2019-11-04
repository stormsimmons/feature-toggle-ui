import { HttpClient } from '@angular/common/http';
import { IFeatureToggle } from '../models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FeatureToggleService {
  constructor(protected httpClient: HttpClient) { }

  public create(featureToggle: IFeatureToggle): Observable<IFeatureToggle> {
    return this.httpClient.post<IFeatureToggle>(`/feature-toggle/${featureToggle.key}`, featureToggle);
  }

  public find(key: string): Observable<IFeatureToggle> {
    return this.httpClient.get<IFeatureToggle>(`/feature-toggle/${key}`);
  }

  public findAll(includedArchived: boolean = false): Observable<Array<IFeatureToggle>> {
    return this.httpClient.get<Array<IFeatureToggle>>(`/feature-toggle?includeArchived=${includedArchived}`);
  }

  public update(featureToggle: IFeatureToggle): Observable<IFeatureToggle> {
    return this.httpClient.put<IFeatureToggle>(`/feature-toggle/${featureToggle.key}`, featureToggle);
  }

  public search(searchTerm: string, includedArchived: boolean = true): Observable<Array<IFeatureToggle>> {
    return this.httpClient.get<Array<IFeatureToggle>>(`/feature-toggle?includeArchived=${includedArchived}`)
      .pipe(map(x => x.filter(x => {
        if (searchTerm) {
          return x.name.toLowerCase()
            .includes(searchTerm.toLowerCase())
        } else {
          return true;
        };
      })));
  }
}
