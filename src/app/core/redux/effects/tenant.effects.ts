import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { delayWhen, map, mergeMap, retryWhen, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { IState } from '../state';
import { ITenant } from '@app/core/models';
import { Md5 } from 'ts-md5';
import { of, throwError, timer } from 'rxjs';
import { TenantService } from '../../services';
import {
  ActionTypes,
  TenantCreate,
  TenantsLoad,
  TenantsSet,
  TenantUpdate,
  TenantUpdateAddUser,
  TenantUpdateRemoveUser,
  TenantSet,
} from '../actions';

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
          .pipe(take(1))
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
  public set = this.actions.pipe(ofType(ActionTypes.TenantsSet)).pipe(
    map((action: Action) => {
      const tenants: Array<ITenant> = (action as TenantsSet).tenants;

      const tenantKey: string = localStorage.getItem('feature-toggle:tenant:key');

      const tenant: ITenant = tenants.find((x: ITenant) => x.key === tenantKey) || tenants[0];

      return new TenantSet({
        ...tenant,
        users: [...tenant.users],
      });
    }),
  );

  @Effect({ dispatch: false })
  public update = this.actions
    .pipe(ofType(ActionTypes.TenantUpdate))
    .pipe(mergeMap((action: Action) => this.tenantService.update((action as TenantUpdate).tenant)));

  @Effect()
  public updateAddUser = this.actions.pipe(ofType(ActionTypes.TenantUpdateAddUser)).pipe(
    map((action: Action) => {
      const tenant: ITenant = {
        ...(action as TenantUpdateAddUser).tenant,
        users: [...(action as TenantUpdateAddUser).tenant.users],
      };

      const user: string = (action as TenantUpdateAddUser).user;

      tenant.users.push(user);

      return new TenantUpdate(tenant);
    }),
  );

  @Effect()
  public updateRemoveUser = this.actions.pipe(ofType(ActionTypes.TenantUpdateRemoveUser)).pipe(
    map((action: Action) => {
      const tenant: ITenant = {
        ...(action as TenantUpdateRemoveUser).tenant,
        users: [...(action as TenantUpdateRemoveUser).tenant.users],
      };

      const user: string = (action as TenantUpdateRemoveUser).user;

      const index: number = tenant.users.indexOf(user);

      if (index === -1) {
        return;
      }

      tenant.users.splice(index, 1);

      return new TenantUpdate(tenant);
    }),
  );
}
