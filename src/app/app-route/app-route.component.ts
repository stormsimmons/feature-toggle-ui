import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { MOCK_DATA } from '../core';
import { ContactUsDialogComponent } from '../components/dialogs';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-app-route',
  templateUrl: './app-route.component.html',
  styleUrls: ['./app-route.component.scss'],
})
export class AppRouteComponent implements OnInit {
  public user: any = MOCK_DATA.USER;

  constructor(protected dialog: MatDialog, protected oauthService: OAuthService) {}

  public ngOnInit(): void {
    this.initialize();
  }

  public onClickContactUs(): void {
    const dialogRef: MatDialogRef<ContactUsDialogComponent> = this.dialog.open(ContactUsDialogComponent, {
      data: this.user.email.toLowerCase(),
    });
  }

  protected async initialize(): Promise<void> {
    await this.oauthService.loadDiscoveryDocumentAndTryLogin();

    if (!this.oauthService.getAccessToken()) {
      this.oauthService.initLoginFlow();

      return;
    }

    this.user = await this.oauthService.loadUserProfile();
  }
}
