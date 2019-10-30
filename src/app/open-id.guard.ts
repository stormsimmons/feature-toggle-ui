import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class OpenIDGuard implements CanActivate {
  constructor(protected oauthService: OAuthService, protected router: Router) {}

  public async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    await this.oauthService.loadDiscoveryDocument();

    const accessToken: string = this.oauthService.getAccessToken();

    const result: boolean = accessToken ? true : false;

    if (!result) {
      this.router.navigateByUrl('/sign-in');
    }

    return result;
  }
}
