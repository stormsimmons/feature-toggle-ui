import { Action } from '@ngrx/store';
import { ActionTypes, FeatureTogglesSet } from '../actions';
import { IFeatureToggle } from '../../models';

export const initialState: Array<IFeatureToggle> = null;

export function featureTogglesReducer(state = initialState, action: Action): Array<IFeatureToggle> {
  switch (action.type) {
    case ActionTypes.FeatureTogglesSet:
      return (action as FeatureTogglesSet).featureToggles;
    default:
      return state;
  }
}
