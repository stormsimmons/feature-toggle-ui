import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-in-route',
  templateUrl: './sign-in-route.component.html',
  styleUrls: ['./sign-in-route.component.scss'],
})
export class SignInRouteComponent implements OnInit {
  public ENVIRONMENT = environment;

  constructor(protected oauthService: OAuthService) {}

  public ngOnInit(): void {}

  public onClickSignIn(): void {
    this.oauthService.initLoginFlow();
  }
}
