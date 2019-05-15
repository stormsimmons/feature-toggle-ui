import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { IEnvironment, IFeatureToggle, FeatureToggleService, ITenant, TenantService } from '@app/core';

@Component({
  selector: 'app-feature-toggle-edit-route',
  templateUrl: './feature-toggle-edit-route.component.html',
  styleUrls: ['./feature-toggle-edit-route.component.scss'],
})
export class FeatureToggleEditRouteComponent implements OnInit {
  public ENVIRONMENT = environment;

  public featureToggle: IFeatureToggle = null;

  public selectedEnvironment: IEnvironment = null;

  public selectedEnvironmentKey: string = null;

  public tenant: ITenant = null;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected featureToggleService: FeatureToggleService,
    public tenantService: TenantService,
  ) {}

  public ngOnInit(): void {
    const key: string = this.activatedRoute.snapshot.params.key;

    this.featureToggleService.find(key).subscribe((featureToggle: IFeatureToggle) => {
      this.featureToggle = featureToggle;

      this.selectedEnvironmentKey = this.featureToggle.environments[0].key;

      this.onSelectionChangeEnvironmentKey();
    });

    this.tenantService.findEnsure().subscribe((tenant: ITenant) => (this.tenant = tenant));
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
