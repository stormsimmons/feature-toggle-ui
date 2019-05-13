import { catchError, delayWhen, map, mergeMap, retryWhen, take, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { forkJoin, Observable, of, throwError, timer } from 'rxjs';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IState } from '../redux';
import { ITenant } from '../models';
import { OpenIDService, TenantService } from '../services';
import { Store } from '@ngrx/store';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(
    protected openIdService: OpenIDService,
    protected store: Store<IState>,
    protected tenantService: TenantService,
  ) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isMultiTenant: boolean = environment.multiTenancy.enabled && !req.url.startsWith('/tenant');

    const observables: Array<Observable<any>> = isMultiTenant
      ? [this.openIdService.getUser(), this.getTenant()]
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

  protected getTenant(): Observable<ITenant> {
    return this.store
      .pipe(take(1))
      .pipe(
        mergeMap((state: IState) => {
          return state.tenants ? of(state) : throwError(new Error());
        }),
      )
      .pipe(retryWhen((errors) => errors.pipe(delayWhen(() => timer(1000)))))
      .pipe(map((state: IState) => state.tenants[0]));
  }
}
