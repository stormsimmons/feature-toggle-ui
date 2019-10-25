import { catchError, delayWhen, map, mergeMap, retryWhen } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { forkJoin, Observable, of, throwError, timer } from 'rxjs';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models';
import { OpenIDService, TenantService } from '../services';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(protected openIdService: OpenIDService, protected tenantService: TenantService) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isMultiTenant: boolean = !req.url.startsWith('/tenant');

    const observables: Array<Observable<any>> = isMultiTenant
      ? [this.getUser(), this.tenantService.findEnsure()]
      : [this.getUser()];

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

  protected getUser(): Observable<IUser> {
    return this.openIdService
      .getUser()
      .pipe(mergeMap((user: IUser) => (user ? of(user) : throwError(new Error()))))
      .pipe(retryWhen((errors) => errors.pipe(delayWhen(() => timer(1000)))));
  }
}
