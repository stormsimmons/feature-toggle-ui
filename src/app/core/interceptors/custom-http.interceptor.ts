import { catchError, mergeMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITenant } from '../models';
import { TenantService } from '../services';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(protected oauthService: OAuthService, protected tenantService: TenantService) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isMultiTenant: boolean = !req.url.startsWith('/tenant') && !req.url.startsWith('https://');

    return (isMultiTenant ? this.tenantService.findEnsure() : of(null))
      .pipe(
        mergeMap((tenant: ITenant) => {
          let url: string = req.url;

          if (req.url.startsWith('https://')) {
          } else if (req.url.startsWith('/tenant')) {
            url = `${environment.uri}${req.url}`;
          } else {
            url = `${environment.uri}/${tenant.key}${req.url}`;
          }

          const requestClone = req.clone({
            headers: req.headers.set('authorization', `Bearer ${this.oauthService.getAccessToken()}`),
            url,
          });

          return next.handle(requestClone);
        }),
      )
      .pipe(
        catchError((error: Error) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            // this.oauthService.initLoginFlow();
          }

          return throwError(error);
        }),
      );
  }
}
