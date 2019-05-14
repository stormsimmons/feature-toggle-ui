import * as OIDC from 'oidc-client';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { from, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

export class OpenIDService {
  protected manager: OIDC.UserManager = null;

  constructor(
    protected configuration: {
      authority: string;
      client_id: string;
      redirect_uri: string;
      scope: string;
      signingKeys: Array<any>;
      post_logout_redirect_uri: string;
    },
    protected router: Router,
  ) {
    this.manager = new OIDC.UserManager({
      ...this.configuration,
      userStore: new OIDC.WebStorageStateStore({ store: window.localStorage }),
    });
  }

  public authenticated(): Observable<boolean> {
    return this.getUser().pipe(
      map((user: any) => {
        return user ? true : false;
      }),
    );
  }

  public callback(): Observable<void> {
    return from(this.manager.signinRedirectCallback()).pipe(
      catchError((error: Error) => {
        return of(null);
      }),
    );
  }

  public getUser(): Observable<any> {
    return of(null).pipe(mergeMap(() => from(this.manager.getUser())));
  }

  public signIn(force: boolean = false): Observable<boolean> {
    return this.authenticated().pipe(
      tap((result: boolean) => {
        if (force || !result) {
          this.manager.signinRedirect();
        }
      }),
    );
  }

  public signOut(): Observable<void> {
    return from(this.manager.signoutRedirect()).pipe(
      catchError((error: Error) => {
        return of(null);
      }),
    );
  }
}
