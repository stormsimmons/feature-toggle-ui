import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { OpenIDService } from './core';

@Injectable({
  providedIn: 'root',
})
export class OpenIDGuard implements CanActivate {
  constructor(protected openIDService: OpenIDService) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.openIDService.signIn();
  }
}
