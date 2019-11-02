import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { MOCK_DATA } from '../core';
import { ContactUsDialogComponent } from '../components/dialogs';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-app-route',
  templateUrl: './app-route.component.html',
  styleUrls: ['./app-route.component.scss'],
})
export class AppRouteComponent implements OnInit {
  public user: any = MOCK_DATA.USER;

  public sideNavMode: string = screen.width > 768 ? 'side' : 'over';

  public sideNavOpened: boolean = screen.width > 768 ? true : false;

  constructor(protected dialog: MatDialog, protected oauthService: OAuthService, protected snackBar: MatSnackBar) {}

  public ngOnInit(): void {
    this.initialize();
  }

  public onClickContactUs(): void {
    const dialogRef: MatDialogRef<ContactUsDialogComponent> = this.dialog.open(ContactUsDialogComponent, {
      data: this.user.email.toLowerCase(),
    });

    dialogRef.afterClosed().subscribe((x) => {
      if (!x) {
        return;
      }

      this.snackBar.open(`Message successfully sent. We'll get in touch with you.`, undefined, {
        duration: 2000,
      });
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
