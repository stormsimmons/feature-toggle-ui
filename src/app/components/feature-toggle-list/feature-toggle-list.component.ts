import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IFeatureToggle } from 'src/app/core';
import { CreateFeatureToggleDialogComponent } from '../dialogs';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-feature-toggle-list',
  templateUrl: './feature-toggle-list.component.html',
  styleUrls: ['./feature-toggle-list.component.scss'],
})
export class FeatureToggleListComponent implements OnInit {
  @Output()
  public createFeatureToggle: EventEmitter<IFeatureToggle> = new EventEmitter();

  @Input()
  public featureToggles: Array<IFeatureToggle> = null;

  constructor(protected dialog: MatDialog) {}

  public ngOnInit() {}

  public getFeatureToggles(): Array<IFeatureToggle> {
    return this.featureToggles.filter((x) => !x.archived);
  }

  public onClickCreateFeatureToggle(): void {
    const dialogRef: MatDialogRef<CreateFeatureToggleDialogComponent> = this.dialog.open(
      CreateFeatureToggleDialogComponent,
    );

    dialogRef.afterClosed().subscribe((x) => {
      if (x) {
        this.createFeatureToggle.emit(x);
      }
    });
  }
}
