import { ActivatedRoute } from '@angular/router';
import { BaseComponent, FeatureToggleUpdate, IEnvironment, IFeatureToggle, IState } from '@app/core';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-feature-toggle-edit-route',
  templateUrl: './feature-toggle-edit-route.component.html',
  styleUrls: ['./feature-toggle-edit-route.component.scss'],
})
export class FeatureToggleEditRouteComponent extends BaseComponent implements OnInit {
  public featureToggle: IFeatureToggle = null;

  public selectedEnvironment: IEnvironment = null;

  public selectedEnvironmentKey: string = null;

  constructor(protected activatedRoute: ActivatedRoute, store: Store<IState>) {
    super(store);
  }

  public ngOnInit(): void {
    const key: string = this.activatedRoute.snapshot.params.key;

    this.store.subscribe((state: IState) => {
      this.featureToggle = state.featureToggles.find((featureToggle: IFeatureToggle) => featureToggle.key === key);

      this.selectedEnvironmentKey = this.featureToggle.environments[0].key;

      this.onSelectionChangeEnvironmentKey();
    });
  }

  public onChangeFeatureToggle(): void {
    this.store.dispatch(new FeatureToggleUpdate(this.featureToggle, false));
  }

  public onChangeFeatureToggleEditConsumers(): void {
    this.store.dispatch(new FeatureToggleUpdate(this.featureToggle, false));
  }

  public onSelectionChangeEnvironmentKey(): void {
    this.selectedEnvironment = this.featureToggle.environments.find(
      (x: IEnvironment) => x.key === this.selectedEnvironmentKey,
    );
  }
}
