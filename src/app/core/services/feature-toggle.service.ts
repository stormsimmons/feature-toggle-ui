import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IFeatureToggle } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeatureToggleService {
  protected featureToggles: Array<IFeatureToggle> = [
    {
      createdAt: new Date().getTime(),
      environments: [
        {
          consumers: ['1', '2', '3'],
          enabled: true,
          enabledForAll: true,
          key: 'development',
          name: 'Development',
        },
        {
          consumers: ['1', '2', '3'],
          enabled: true,
          enabledForAll: false,
          key: 'staging',
          name: 'Staging',
        },
        {
          consumers: ['1', '2', '3', '4', '5', '6'],
          enabled: false,
          enabledForAll: true,
          key: 'production',
          name: 'Production',
        },
      ],
      key: 'feature-toggle-1',
      name: 'Feature Toggle 1',
      updatedAt: new Date().getTime(),
    },
    {
      createdAt: new Date().getTime(),
      environments: [
        {
          consumers: ['1', '2', '3'],
          enabled: true,
          enabledForAll: true,
          key: 'development',
          name: 'Development',
        },
        {
          consumers: ['1', '2', '3'],
          enabled: true,
          enabledForAll: false,
          key: 'staging',
          name: 'Staging',
        },
        {
          consumers: ['1', '2', '3', '4', '5', '6'],
          enabled: false,
          enabledForAll: true,
          key: 'prodcution',
          name: 'Production',
        },
      ],
      key: 'feature-toggle-2',
      name: 'Feature Toggle 2',
      updatedAt: new Date().getTime(),
    },
  ];

  constructor(protected httpClient: HttpClient) {}

  public create(featureToggle: IFeatureToggle): Observable<IFeatureToggle> {
    return this.httpClient.post<IFeatureToggle>(`${environment.uri}/api/FeatureToggle/${featureToggle.key}`, featureToggle);
  }

  public find(key: string): Observable<IFeatureToggle> {
    return this.httpClient.get<IFeatureToggle>(`${environment.uri}/api/FeatureToggle/${key}`);
  }

  public findAll(): Observable<Array<IFeatureToggle>> {
    return this.httpClient.get<Array<IFeatureToggle>>(`${environment.uri}/api/FeatureToggle`);
  }

  public update(featureToggle: IFeatureToggle): Observable<IFeatureToggle> {
    return this.httpClient.put<IFeatureToggle>(`${environment.uri}/api/FeatureToggle/${featureToggle.key}`, featureToggle);
  }
}
