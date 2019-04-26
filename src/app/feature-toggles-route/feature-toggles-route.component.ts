import { Component, OnInit } from '@angular/core';
import { IFeatureToggle, FeatureToggleService, OpenIDService } from '../core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FeatureToggleCreateComponent } from '../feature-toggle-create/feature-toggle-create.component';
import { mergeMap, tap } from 'rxjs/operators';
import { BaseComponent } from '../components';

@Component({
  selector: 'app-feature-toggles-route',
  templateUrl: './feature-toggles-route.component.html',
  styleUrls: ['./feature-toggles-route.component.scss'],
})
export class FeatureTogglesRouteComponent extends BaseComponent implements OnInit {
  public displayedColumns: Array<string> = ['name', 'status', 'actions'];

  public featureToggles: Array<IFeatureToggle> = null;

  public includeArchived = false;

  public user: any = null;

  constructor(
    protected dialog: MatDialog,
    protected featureToggleService: FeatureToggleService,
    protected openIDService: OpenIDService,
    protected router: Router,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.openIDService
      .getUser()
      .pipe(tap((user) => (this.user = user)))
      .pipe(mergeMap(() => this.featureToggleService.findAll()))
      .subscribe((featureToggles: Array<IFeatureToggle>) => {
        this.featureToggles = featureToggles;
      });
  }

  public onChangeFeatureToggle(featureToggle: IFeatureToggle): void {
    this.featureToggleService.update(featureToggle).subscribe();
  }

  public onChangeIncludeArchived(): void {
    this.featureToggles = null;

    this.featureToggleService.findAll(this.includeArchived).subscribe((featureToggles: Array<IFeatureToggle>) => {
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

  public onClickArchive(featureToggle: IFeatureToggle): void {
    featureToggle.archived = true;

    this.featureToggleService
      .update(featureToggle)
      .pipe(mergeMap(() => this.featureToggleService.findAll()))
      .subscribe((featureToggles: Array<IFeatureToggle>) => {
        this.featureToggles = featureToggles;
      });
  }

  public onClickView(featureToggle: IFeatureToggle): void {
    this.router.navigateByUrl(`/feature-toggle/${featureToggle.key}`);
  }
}
