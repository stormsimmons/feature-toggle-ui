import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ActionTypes, TenantCreate, TenantsLoad, TenantsSet, TenantUpdate } from '../actions';
import { delayWhen, map, mergeMap, retryWhen } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { IState } from '../state';
import { ITenant } from '@app/core/models';
import { Md5 } from 'ts-md5';
import { of, throwError, timer } from 'rxjs';
import { TenantService } from '../../services';

@Injectable()
export class TenantEffects {
  constructor(protected actions: Actions, protected store: Store<IState>, protected tenantService: TenantService) {}

  @Effect()
  public create = this.actions
    .pipe(ofType(ActionTypes.TenantCreate))
    .pipe(mergeMap((action: Action) => this.tenantService.create((action as TenantCreate).tenant)))
    .pipe(map(() => new TenantsLoad()));

  @Effect()
  public load = this.actions
    .pipe(ofType(ActionTypes.TenantsLoad))
    .pipe(mergeMap(() => this.tenantService.findAll()))
    .pipe(
      mergeMap((tenants: Array<ITenant>) => {
        if (tenants.length) {
          return of(tenants).pipe(map((tenants: Array<ITenant>) => new TenantsSet(tenants)));
        }

        return this.store
          .pipe(mergeMap((state: IState) => (state.user ? of(state) : throwError(new Error()))))
          .pipe(retryWhen((errors) => errors.pipe(delayWhen(() => timer(1000)))))
          .pipe(
            map(
              (state: IState) =>
                new TenantCreate({
                  key: Md5.hashStr(state.user.profile.email).toString(),
                  name: `Default (${state.user.profile.email})`,
                  users: [state.user.profile.email],
                }),
            ),
          );
      }),
    );

  @Effect()
  public update = this.actions
    .pipe(ofType(ActionTypes.TenantUpdate))
    .pipe(mergeMap((action: Action) => this.tenantService.update((action as TenantUpdate).tenant)))
    .pipe(map(() => new TenantsLoad()));
}
