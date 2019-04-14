import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IFeatureToggle } from '../models';

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

  constructor() {}

  public find(key: string): Observable<IFeatureToggle> {
    return of(this.featureToggles.find((x) => x.key === key));
  }

  public findAll(): Observable<Array<IFeatureToggle>> {
    return of(this.featureToggles);
  }

  public update(featureToggle: IFeatureToggle): Observable<IFeatureToggle> {
    const index: number = this.featureToggles.indexOf(featureToggle);

    this.featureToggles[index] = featureToggle;

    return of(featureToggle);
  }
}
