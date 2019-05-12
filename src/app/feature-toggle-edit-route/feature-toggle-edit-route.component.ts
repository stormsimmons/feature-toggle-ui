import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FeatureToggleService, IEnvironment, IFeatureToggle } from '@app/core';

@Component({
  selector: 'app-feature-toggle-edit-route',
  templateUrl: './feature-toggle-edit-route.component.html',
  styleUrls: ['./feature-toggle-edit-route.component.scss'],
})
export class FeatureToggleEditRouteComponent implements OnInit {
  public featureToggle: IFeatureToggle = null;

  public selectedEnvironment: IEnvironment = null;

  public selectedEnvironmentKey: string = null;

  constructor(protected activatedRoute: ActivatedRoute, protected featureToggleService: FeatureToggleService) {}

  public ngOnInit(): void {
    const key: string = this.activatedRoute.snapshot.params.key;

    this.featureToggleService.find(key).subscribe((featureToggle: IFeatureToggle) => {
      this.featureToggle = featureToggle;

      this.selectedEnvironmentKey = this.featureToggle.environments[0].key;

      this.onSelectionChangeEnvironmentKey();
    });
  }

  public onChangeFeatureToggle(): void {
    this.featureToggleService.update(this.featureToggle).subscribe();
  }

  public onChangeFeatureToggleEditConsumers(): void {
    this.featureToggleService.update(this.featureToggle).subscribe();
  }

  public onSelectionChangeEnvironmentKey(): void {
    this.selectedEnvironment = this.featureToggle.environments.find(
      (x: IEnvironment) => x.key === this.selectedEnvironmentKey,
    );
  }
}
