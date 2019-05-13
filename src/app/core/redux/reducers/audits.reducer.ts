import { Action } from '@ngrx/store';
import { ActionTypes, AuditsSet } from '../actions';
import { IAudit } from '../../models';

export const initialState: Array<IAudit> = null;

export function auditsReducer(state = initialState, action: Action): Array<IAudit> {
  switch (action.type) {
    case ActionTypes.AuditsSet:
      return (action as AuditsSet).audits;
    default:
      return state;
  }
}
