import { Component, OnInit } from '@angular/core';
import { IFeatureToggle, IEnvironment } from '../core';

@Component({
  selector: 'app-feature-toggle-edit-route',
  templateUrl: './feature-toggle-edit-route.component.html',
  styleUrls: ['./feature-toggle-edit-route.component.scss'],
})
export class FeatureToggleEditRouteComponent implements OnInit {
  public featureToggle: IFeatureToggle = {
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
  };

  public selectedEnvironment: IEnvironment = null;

  public selectedEnvironmentKey: string = null;

  constructor() {}

  public ngOnInit(): void {
    this.selectedEnvironmentKey = this.featureToggle.environments[0].key;

    this.onSelectionChangeEnvironmentKey();
  }

  public onSelectionChangeEnvironmentKey(): void {
    this.selectedEnvironment = this.featureToggle.environments.find((x) => x.key === this.selectedEnvironmentKey);
  }
}
