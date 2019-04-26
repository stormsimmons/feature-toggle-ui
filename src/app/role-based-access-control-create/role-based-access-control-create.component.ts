import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IFeatureToggle, FeatureToggleService } from '../core';

@Component({
  selector: 'app-role-based-access-control-create',
  templateUrl: './role-based-access-control-create.component.html',
  styleUrls: ['./role-based-access-control-create.component.scss'],
})
export class RoleBasedAccessControlCreateComponent implements OnInit {
  public roleKey: string = 'administrator';

  public roles: Array<any> = [
    {
      key: 'administrator',
      name: 'Administrator',
    },
    {
      key: 'viewer',
      name: 'Viewer',
    },
  ];

  public subject = new FormControl('', [Validators.required]);

  constructor(
    @Inject(MAT_DIALOG_DATA) protected featureToggle: IFeatureToggle,
    protected dialogRef: MatDialogRef<RoleBasedAccessControlCreateComponent>,
    protected featureToggleService: FeatureToggleService,
  ) {}

  public ngOnInit(): void {}

  public getErrorMessage(fieldName: string): string {
    if (fieldName === 'subject' && this.subject.hasError('required')) {
      return 'Please enter a subject.';
    }

    return null;
  }

  public onClickClose(): void {
    this.dialogRef.close();
  }

  public onClickSubmit(): void {
    if (!this.subject.valid || !this.roleKey) {
      return;
    }

    this.featureToggle.roleBasedAccessControlItems.push({
      role: this.roleKey,
      subject: this.subject.value,
    });

    this.featureToggleService.update(this.featureToggle).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
