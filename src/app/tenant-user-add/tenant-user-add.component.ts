import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { ITenant, TenantService } from '@app/core';

@Component({
  selector: 'app-tenant-user-add',
  templateUrl: './tenant-user-add.component.html',
  styleUrls: ['./tenant-user-add.component.scss'],
})
export class TenantUserAddComponent implements OnInit {
  public user = new FormControl('', [Validators.required]);

  constructor(
    @Inject(MAT_DIALOG_DATA) protected tenant: ITenant,
    protected dialogRef: MatDialogRef<TenantUserAddComponent>,
    protected tenantService: TenantService,
  ) {}

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
    if (!this.user.valid) {
      return;
    }

    this.tenant.users.push(this.user.value.toLowerCase());

    this.tenantService.update(this.tenant).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
