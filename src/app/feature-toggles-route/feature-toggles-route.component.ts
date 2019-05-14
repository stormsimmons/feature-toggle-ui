import { Component, OnInit } from '@angular/core';
import { FeatureToggleCreateComponent } from '../feature-toggle-create/feature-toggle-create.component';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import {
  IFeatureToggle,
  IState,
  BaseComponent,
  FeatureTogglesLoad,
  FeatureToggleCreate,
  FeatureToggleUpdate,
} from '@app/core';

@Component({
  selector: 'app-feature-toggles-route',
  templateUrl: './feature-toggles-route.component.html',
  styleUrls: ['./feature-toggles-route.component.scss'],
})
export class FeatureTogglesRouteComponent extends BaseComponent implements OnInit {
  public includeArchived: boolean = false;

  constructor(protected dialog: MatDialog, store: Store<IState>) {
    super(store);
  }

  public ngOnInit(): void {
    super.ngOnInit();

    this.store.dispatch(new FeatureTogglesLoad(false));
  }

  public onChangeFeatureToggle(featureToggle: IFeatureToggle): void {
    this.store.dispatch(new FeatureToggleUpdate(featureToggle, this.includeArchived));
  }

  public onChangeIncludeArchived(includeArchived: boolean): void {
    this.includeArchived = includeArchived;

    this.store.dispatch(new FeatureTogglesLoad(this.includeArchived));
  }

  public onClickFabAdd(): void {
    const dialogRef = this.dialog.open(FeatureToggleCreateComponent, {});

    dialogRef.afterClosed().subscribe((dialogResult: IFeatureToggle) => {
      if (dialogResult) {
        this.store.dispatch(new FeatureToggleCreate(dialogResult, this.includeArchived));
      }
    });
  }
}
