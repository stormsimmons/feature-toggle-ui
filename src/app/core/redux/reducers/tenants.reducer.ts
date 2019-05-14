import { Action } from '@ngrx/store';
import { ActionTypes, TenantsSet, TenantUpdate } from '../actions';
import { ITenant } from '../../models';

export const initialState: Array<ITenant> = null;

export function tenantsReducer(state = initialState, action: Action): Array<ITenant> {
  switch (action.type) {
    case ActionTypes.TenantUpdate:
      return [...state].map((x: ITenant) => {
        if (x.key === (action as TenantUpdate).tenant.key) {
          return {
            ...(action as TenantUpdate).tenant,
            users: [...(action as TenantUpdate).tenant.users],
          };
        }

        return {
          ...x,
          users: [...x.users],
        };
      });
    case ActionTypes.TenantsSet:
      return (action as TenantsSet).tenants;
    default:
      return state;
  }
}
