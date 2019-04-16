import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FeatureToggleService } from '../core';

@Component({
  selector: 'app-feature-toggle-create',
  templateUrl: './feature-toggle-create.component.html',
  styleUrls: ['./feature-toggle-create.component.scss'],
})
export class FeatureToggleCreateComponent implements OnInit {
  public key = '';

  public name = '';

  constructor(
    protected dialogRef: MatDialogRef<FeatureToggleCreateComponent>,
    protected featureToggleService: FeatureToggleService,
  ) {}

  public ngOnInit(): void {}

  public onClickClose(): void {
    this.dialogRef.close();
  }

  public onClickSubmit(): void {
    this.featureToggleService
      .create({
        archived: false,
        createdAt: new Date().getTime(),
        environments: [
          {
            consumers: [],
            enabled: false,
            enabledForAll: false,
            key: 'development',
            name: 'Development',
          },
          {
            consumers: [],
            enabled: false,
            enabledForAll: false,
            key: 'staging',
            name: 'Staging',
          },
          {
            consumers: [],
            enabled: false,
            enabledForAll: false,
            key: 'production',
            name: 'Production',
          },
        ],
        key: this.key,
        name: this.name,
        updatedAt: new Date().getTime(),
      })
      .subscribe(() => {
        this.dialogRef.close();
      });
  }
}
