import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

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

  constructor(protected dialogRef: MatDialogRef<RoleBasedAccessControlCreateComponent>) {}

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
  }
}
