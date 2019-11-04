import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-route',
  templateUrl: './profile-route.component.html',
  styleUrls: ['./profile-route.component.scss'],
})
export class ProfileRouteComponent implements OnInit {
  public date: number = new Date().getTime();

  public ENVIRONMENT = environment;

  public user: any = null;

  constructor(protected oauthService: OAuthService) {}

  public ngOnInit(): void {
    this.initialize();
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
