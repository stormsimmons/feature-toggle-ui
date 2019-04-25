import { Component, OnInit } from '@angular/core';
import { IFeatureToggle, IEnvironment, FeatureToggleService, OpenIDService } from '../core';
import { ActivatedRoute } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { tap, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-feature-toggle-edit-route',
  templateUrl: './feature-toggle-edit-route.component.html',
  styleUrls: ['./feature-toggle-edit-route.component.scss'],
})
export class FeatureToggleEditRouteComponent implements OnInit {
  public featureToggle: IFeatureToggle = null;

  public selectedEnvironment: IEnvironment = null;

  public selectedEnvironmentKey: string = null;

  public separatorKeysCodes: Array<number> = [ENTER, COMMA];

  public user: any = null;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected featureToggleService: FeatureToggleService,
    protected openIDService: OpenIDService,
  ) {}

  public ngOnInit(): void {
    const key: string = this.activatedRoute.snapshot.params.key;

    this.openIDService
      .getUser()
      .pipe(tap((user) => (this.user = user)))
      .pipe(mergeMap(() => this.featureToggleService.find(key)))
      .subscribe((featureToggle: IFeatureToggle) => {
        this.featureToggle = featureToggle;

        this.selectedEnvironmentKey = this.featureToggle.environments[0].key;

        this.onSelectionChangeEnvironmentKey();
      });
  }

  public authorized(roles: Array<string>): boolean {
    if (this.featureToggle.user === this.user.profile.email) {
      return true;
    }

    if (
      this.featureToggle.roleBasedAccessControlItems.find(
        (x) => x.subject === this.user.profile.email && roles.includes(x.role),
      )
    ) {
      return true;
    }

    return false;
  }

  public onChangeFeatureToggle(): void {
    this.featureToggleService.update(this.featureToggle).subscribe();
  }

  public onClickAddConsumer(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.selectedEnvironment.consumers.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

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

  public onSelectionChangeEnvironmentKey(): void {
    this.selectedEnvironment = this.featureToggle.environments.find((x) => x.key === this.selectedEnvironmentKey);
  }
}
