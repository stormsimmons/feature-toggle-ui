import { Component, OnInit } from '@angular/core';
import { IFeatureToggle, FeatureToggleService } from '../core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feature-toggles-route',
  templateUrl: './feature-toggles-route.component.html',
  styleUrls: ['./feature-toggles-route.component.scss'],
})
export class FeatureTogglesRouteComponent implements OnInit {
  public displayedColumns: Array<string> = ['name', 'status', 'actions'];

  public featureToggles: Array<IFeatureToggle> = [];

  constructor(protected featureToggleService: FeatureToggleService, protected router: Router) {}

  public ngOnInit(): void {
    this.featureToggleService.findAll().subscribe((featureToggles: Array<IFeatureToggle>) => {
      this.featureToggles = featureToggles;
    });
  }

  public onClickView(featureToggle: IFeatureToggle): void {
    this.router.navigateByUrl(`/feature-toggle/${featureToggle.key}`);
  }
}
