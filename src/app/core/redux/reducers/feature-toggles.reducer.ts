import { Action } from '@ngrx/store';
import { ActionTypes, FeatureTogglesSet, FeatureToggleUpdate } from '../actions';
import { IFeatureToggle } from '../../models';

export const initialState: Array<IFeatureToggle> = null;

export function featureTogglesReducer(state = initialState, action: Action): Array<IFeatureToggle> {
  switch (action.type) {
    case ActionTypes.FeatureToggleUpdate:
      return [...state].map((x: IFeatureToggle) => {
        if (x.key === (action as FeatureToggleUpdate).featureToggle.key) {
          return {
            ...(action as FeatureToggleUpdate).featureToggle,
            environments: [...(action as FeatureToggleUpdate).featureToggle.environments],
          };
        }

        return {
          ...x,
          environments: [...x.environments],
        };
      });
    case ActionTypes.FeatureTogglesSet:
      return [...(action as FeatureTogglesSet).featureToggles];
    default:
      return state;
  }
}
