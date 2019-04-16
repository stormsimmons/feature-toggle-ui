import { Observable, from, of } from 'rxjs';
import * as OIDC from 'oidc-client';
import { Router } from '@angular/router';
import { map, tap, catchError } from 'rxjs/operators';

export class OpenIDService {
  protected manager: OIDC.UserManager = null;

  constructor(
    protected configuration: {
      authority: string;
      client_id: string;
      redirect_uri: string;
      scope: string;
      signingKeys: Array<any>,
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
    return from(this.manager.getUser());
  }

  public signIn(): Observable<boolean> {
    return this.authenticated().pipe(
      tap((result: boolean) => {
        if (!result) {
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
