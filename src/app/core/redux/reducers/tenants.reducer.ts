import { Action } from '@ngrx/store';
import { ActionTypes, TenantsSet } from '../actions';
import { ITenant } from '../../models';

export const initialState: Array<ITenant> = null;

export function tenantsReducer(state = initialState, action: Action): Array<ITenant> {
  switch (action.type) {
    case ActionTypes.TenantsSet:
      return (action as TenantsSet).tenants;
    default:
      return state;
  }
}
