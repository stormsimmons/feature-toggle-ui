import { Component, OnInit } from '@angular/core';
import { IFeatureToggle, IEnvironment, FeatureToggleService } from '../core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feature-toggle-edit-route',
  templateUrl: './feature-toggle-edit-route.component.html',
  styleUrls: ['./feature-toggle-edit-route.component.scss'],
})
export class FeatureToggleEditRouteComponent implements OnInit {
  public displayedColumnsForRoleBasedAccessControlItems: Array<string> = ['user', 'role'];

  public featureToggle: IFeatureToggle = null;

  public newConsumer = '';

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

  public onClickRemoveConsumer(consumer: string): void {
    const index: number = this.selectedEnvironment.consumers.indexOf(consumer);

    if (index === -1) {
      return;
    }

    this.selectedEnvironment.consumers.splice(index, 1);

    this.featureToggleService.update(this.featureToggle).subscribe();
  }

  public onKeyUpEnterNewConsumer(): void {
    if (!this.newConsumer) {
      return;
    }

    this.selectedEnvironment.consumers.push(this.newConsumer);

    this.newConsumer = '';

    this.featureToggleService.update(this.featureToggle).subscribe();
  }

  public onSelectionChangeEnvironmentKey(): void {
    this.selectedEnvironment = this.featureToggle.environments.find((x) => x.key === this.selectedEnvironmentKey);
  }
}
