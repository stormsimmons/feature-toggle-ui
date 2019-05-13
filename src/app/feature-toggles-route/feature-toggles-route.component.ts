import { Component, OnInit } from '@angular/core';
import { empty } from 'rxjs';
import { FeatureToggleCreateComponent } from '../feature-toggle-create/feature-toggle-create.component';
import { FeatureToggleService, IFeatureToggle, IState, BaseComponent } from '@app/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-feature-toggles-route',
  templateUrl: './feature-toggles-route.component.html',
  styleUrls: ['./feature-toggles-route.component.scss'],
})
export class FeatureTogglesRouteComponent extends BaseComponent implements OnInit {
  public featureToggles: Array<IFeatureToggle> = null;

  constructor(
    protected dialog: MatDialog,
    protected featureToggleService: FeatureToggleService,
    protected router: Router,
    protected snackBar: MatSnackBar,
    store: Store<IState>,
  ) {
    super(store);
  }

  public ngOnInit(): void {
    this.featureToggleService.findAll(false).subscribe((featureToggles: Array<IFeatureToggle>) => {
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

    dialogRef
      .afterClosed()
      .pipe(
        switchMap((dialogResult: IFeatureToggle) =>
          dialogResult ? this.featureToggleService.create(dialogResult) : empty(),
        ),
      )
      .subscribe(
        (dialogResult: IFeatureToggle) => {
          this.featureToggles.push(dialogResult);
        },
        (error: Error) => {
          if (error instanceof HttpErrorResponse) {
            switch (error.status) {
              case 303:
                this.showErrorMessage(`Key is already taken. Please choose a different key.`);
                this.onClickFabAdd();
                break;
              default:
                this.showErrorMessage('An error occurred.');
                this.onClickFabAdd();
                break;
            }
          }
        },
      );
  }

  public onClickView(featureToggle: IFeatureToggle): void {
    this.router.navigateByUrl(`/feature-toggle/${featureToggle.key}`);
  }

  protected showErrorMessage(message: string): void {
    this.snackBar.open(message, undefined, {
      duration: 5000,
    });
  }
}
