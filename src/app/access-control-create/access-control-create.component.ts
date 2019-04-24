import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-access-control-create',
  templateUrl: './access-control-create.component.html',
  styleUrls: ['./access-control-create.component.scss'],
})
export class AccessControlCreateComponent implements OnInit {
  public roleKey: string = null;

  public roles: Array<any> = [
    {
      key: 'viewer',
      name: 'Viewer',
    },
  ];

  public user = new FormControl('', [Validators.required]);

  constructor(protected dialogRef: MatDialogRef<AccessControlCreateComponent>) {}

  public ngOnInit(): void {}

  public getErrorMessage(fieldName: string): string {
    if (fieldName === 'user' && this.user.hasError('required')) {
      return 'Please enter a user.';
    }

    return null;
  }

  public onClickClose(): void {
    this.dialogRef.close();
  }

  public onClickSubmit(): void {
    if (!this.user.valid || !this.roleKey) {
      return;
    }
  }

  public onSelectionChangeRoleKey(): void {}
}
