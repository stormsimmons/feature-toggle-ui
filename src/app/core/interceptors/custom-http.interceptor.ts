import { catchError, mergeMap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITenant } from '../models';
import { Md5 } from 'ts-md5';
import { OpenIDService, TenantService } from '../services';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(protected openIdService: OpenIDService, protected tenantService: TenantService) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isMultiTenant: boolean = environment.multiTenancy.enabled && !req.url.startsWith('/tenant');

    const observables: Array<Observable<any>> = isMultiTenant
      ? [this.openIdService.getUser(), this.openIdService.getUser().pipe(mergeMap((user) => this.getTenant(user)))]
      : [this.openIdService.getUser()];

    return forkJoin(observables)
      .pipe(
        mergeMap((result: Array<any>) => {
          const user = result[0];
          const tenant = result[1];

          const requestClone = req.clone({
            headers: req.headers.set('authorization', `Bearer ${user.id_token}`),
            url: isMultiTenant ? `${environment.uri}/${tenant.key}${req.url}` : `${environment.uri}${req.url}`,
          });

          return next.handle(requestClone);
        }),
      )
      .pipe(
        catchError((error: Error) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            this.openIdService.signIn(true).subscribe();
          }

          return throwError(error);
        }),
      );
  }

  // TODO: Move creation of tenant to base component.
  protected getTenant(user: any): Observable<ITenant> {
    return this.tenantService.findSelected().pipe(
      mergeMap((tenant: ITenant) => {
        if (!tenant) {
          return this.tenantService
            .create({
              key: Md5.hashStr(user.profile.email.toLowerCase()).toString(),
              name: `Default (${user.profile.email.toLowerCase()})`,
              users: [user.profile.email.toLowerCase()],
            })
            .pipe(mergeMap(() => this.getTenant(user)));
        }

        return of(tenant);
      }),
    );
  }
}
