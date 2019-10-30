import { Component } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(protected oauthService: OAuthService) {
    this.oauthService.configure({
      issuer: 'https://demo.identityserver.io',
      redirectUri: `${window.location.origin}/callback`,
      clientId: 'implicit',
      scope: 'openid profile email',
    });

    this.oauthService.tokenValidationHandler = new JwksValidationHandler();

    this.initialize();
  }

  protected async initialize(): Promise<void> {
    await this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}
