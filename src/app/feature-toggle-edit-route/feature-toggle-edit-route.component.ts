import { Component, OnInit } from '@angular/core';
import { IFeatureToggle, IEnvironment, FeatureToggleService } from '@app/core';
import { ActivatedRoute } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';

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

  public onClickAddConsumer(event: MatChipInputEvent): void {
    const input: HTMLInputElement = event.input;
    const value: string = event.value;

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
    this.selectedEnvironment = this.featureToggle.environments.find(
      (x: IEnvironment) => x.key === this.selectedEnvironmentKey,
    );
  }
}
