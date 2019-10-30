import { Component, OnInit, Inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-contact-us-dialog',
  templateUrl: './contact-us-dialog.component.html',
  styleUrls: ['./contact-us-dialog.component.scss'],
})
export class ContactUsDialogComponent implements OnInit {
  constructor(
    protected dialogRef: MatDialogRef<ContactUsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public emailAddress: string,
    protected oauthService: OAuthService,
  ) {}

  public ngOnInit(): void {}

  public onClickClose(): void {
    this.dialogRef.close();
  }
}
