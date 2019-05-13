import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-feature-toggle-create',
  templateUrl: './feature-toggle-create.component.html',
  styleUrls: ['./feature-toggle-create.component.scss'],
})
export class FeatureToggleCreateComponent implements OnInit {
  public key = new FormControl('', [Validators.required]);

  public name = new FormControl('', [Validators.required]);

  constructor(protected dialogRef: MatDialogRef<FeatureToggleCreateComponent>) {}

  public ngOnInit(): void {}

  public getErrorMessage(fieldName: string): string {
    if (fieldName === 'key' && this.key.hasError('required')) {
      return 'Please enter a key.';
    }

    if (fieldName === 'name' && this.name.hasError('required')) {
      return 'Please enter a name.';
    }

    return null;
  }

  public onClickClose(): void {
    this.dialogRef.close();
  }

  public onClickSubmit(): void {
    if (!this.key.valid || !this.name.valid) {
      return;
    }

    this.dialogRef.close({
      archived: false,
      createdAt: new Date().getTime(),
      environments: environment.featureToggle.defaultEnvironments.map((x) => {
        return {
          consumers: [],
          enabled: false,
          enabledForAll: false,
          key: x[0],
          name: x[1],
        };
      }),
      key: this.key.value,
      name: this.name.value,
      updatedAt: new Date().getTime(),
      user: null,
    });
  }
}
