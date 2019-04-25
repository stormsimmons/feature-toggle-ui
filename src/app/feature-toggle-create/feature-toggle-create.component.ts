import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FeatureToggleService } from '../core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-feature-toggle-create',
  templateUrl: './feature-toggle-create.component.html',
  styleUrls: ['./feature-toggle-create.component.scss'],
})
export class FeatureToggleCreateComponent implements OnInit {
  public key = new FormControl('', [Validators.required]);

  public message: string = null;

  public name = new FormControl('', [Validators.required]);

  constructor(
    protected dialogRef: MatDialogRef<FeatureToggleCreateComponent>,
    protected featureToggleService: FeatureToggleService,
    protected snackBar: MatSnackBar,
  ) {}

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

    this.featureToggleService
      .create({
        archived: false,
        createdAt: new Date().getTime(),
        environments: [
          ['development', 'Development'],
          ['quality-assurance', 'Quality Assurance'],
          ['user-acceptance-testing', 'User Acceptance Testing'],
          ['staging', 'Staging'],
          ['production', 'Production'],
        ].map((x) => {
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
        roleBasedAccessControlItems: [],
        updatedAt: new Date().getTime(),
        user: null,
      })
      .subscribe(
        () => {
          this.dialogRef.close();
        },
        (error: Error) => {
          if (error instanceof HttpErrorResponse) {
            switch (error.status) {
              case 303:
                this.showErrorMessage(`Key '${this.key.value}' is already taken. Please choose a different key.`);
                break;
              default:
                this.showErrorMessage('An error occurred.');
                break;
            }
          }
        },
      );
  }

  protected showErrorMessage(message: string): void {
    this.snackBar.open(message, undefined, {
      duration: 5000,
    });
  }
}
