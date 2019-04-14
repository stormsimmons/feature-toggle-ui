import { Component, OnInit } from '@angular/core';
import { IFeatureToggle } from '../core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feature-toggles-route',
  templateUrl: './feature-toggles-route.component.html',
  styleUrls: ['./feature-toggles-route.component.scss'],
})
export class FeatureTogglesRouteComponent implements OnInit {
  public displayedColumns: Array<string> = ['name', 'status', 'actions'];

  public featureToggles: Array<IFeatureToggle> = [
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
    },
  ];

  constructor(protected router: Router) {}

  public ngOnInit(): void {}

  public onClickView(featureToggle: IFeatureToggle): void {
    this.router.navigateByUrl(`/feature-toggle/${featureToggle.key}`);
  }
}
