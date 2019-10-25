import { Component, OnInit } from '@angular/core';
import { FeatureToggleCreateComponent } from '../features/feature-toggle/feature-toggle-create/feature-toggle-create.component';
import { MatDialog } from '@angular/material';
import { IFeatureToggle, FeatureToggleService } from '@app/core';

@Component({
  selector: 'app-feature-toggles-route',
  templateUrl: './feature-toggles-route.component.html',
  styleUrls: ['./feature-toggles-route.component.scss'],
})
export class FeatureTogglesRouteComponent implements OnInit {
  public featureToggles: Array<IFeatureToggle> = null;

  constructor(protected dialog: MatDialog, protected featureToggleService: FeatureToggleService) {}

  public ngOnInit(): void {
    this.featureToggleService
      .findAll(false)
      .subscribe((featureToggles: Array<IFeatureToggle>) => (this.featureToggles = featureToggles));
  }

  public onChangeFeatureToggle(featureToggle: IFeatureToggle): void {
    this.featureToggleService.update(featureToggle).subscribe();
  }

  public onChangeIncludeArchived(includeArchived: boolean): void {
    this.featureToggleService
      .findAll(includeArchived)
      .subscribe((featureToggles: Array<IFeatureToggle>) => (this.featureToggles = featureToggles));
  }

  public onClickFabAdd(): void {
    const dialogRef = this.dialog.open(FeatureToggleCreateComponent, {});

    dialogRef.afterClosed().subscribe((dialogResult: IFeatureToggle) => {
      if (dialogResult) {
        this.featureToggleService.create(dialogResult).subscribe(() => {
          this.featureToggleService
            .findAll(false)
            .subscribe((featureToggles: Array<IFeatureToggle>) => (this.featureToggles = featureToggles));
        });
      }
    });
  }
}
