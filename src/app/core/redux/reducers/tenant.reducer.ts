import { Action } from '@ngrx/store';
import { ActionTypes, TenantSet, TenantUpdate } from '../actions';
import { ITenant } from '../../models';

export const initialState: ITenant = null;

export function tenantReducer(state = initialState, action: Action): ITenant {
  switch (action.type) {
    case ActionTypes.TenantSet:
      return {
        ...(action as TenantSet).tenant,
        users: [...(action as TenantUpdate).tenant.users],
      };
    case ActionTypes.TenantUpdate:
      return state.key === (action as TenantSet).tenant.key
        ? {
            ...(action as TenantSet).tenant,
            users: [...(action as TenantUpdate).tenant.users],
          }
        : state;
    default:
      return state;
  }
}
