import { Component, OnInit } from '@angular/core';
import { IFeatureToggle, FeatureToggleService } from '@app/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FeatureToggleCreateComponent } from '../feature-toggle-create/feature-toggle-create.component';

@Component({
  selector: 'app-feature-toggles-route',
  templateUrl: './feature-toggles-route.component.html',
  styleUrls: ['./feature-toggles-route.component.scss'],
})
export class FeatureTogglesRouteComponent implements OnInit {
  public featureToggles: Array<IFeatureToggle> = null;

  constructor(
    protected dialog: MatDialog,
    protected featureToggleService: FeatureToggleService,
    protected router: Router,
  ) {}

  public ngOnInit(): void {
    this.featureToggleService.findAll(true).subscribe((featureToggles: Array<IFeatureToggle>) => {
      this.featureToggles = featureToggles;
    });
  }

  public onChangeFeatureToggle(featureToggle: IFeatureToggle): void {
    this.featureToggleService.update(featureToggle).subscribe();
  }

  public onChangeIncludeArchived(includeArchived: boolean): void {
    this.featureToggles = null;

    this.featureToggleService.findAll(includeArchived).subscribe((featureToggles: Array<IFeatureToggle>) => {
      this.featureToggles = featureToggles;
    });
  }

  public onClickFabAdd(): void {
    const dialogRef = this.dialog.open(FeatureToggleCreateComponent, {});

    dialogRef.afterClosed().subscribe(() => {
      this.featureToggles = null;

      this.featureToggleService.findAll().subscribe((featureToggles: Array<IFeatureToggle>) => {
        this.featureToggles = featureToggles;
      });
    });
  }

  public onClickView(featureToggle: IFeatureToggle): void {
    this.router.navigateByUrl(`/feature-toggle/${featureToggle.key}`);
  }
}
