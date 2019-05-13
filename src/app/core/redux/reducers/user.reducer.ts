import { Action } from '@ngrx/store';
import { ActionTypes, UserSet } from '../actions';
import { IUser } from '../../models';
import { Md5 } from 'ts-md5';

export const initialState: IUser = null;

export function userReducer(state = initialState, action: Action): IUser {
  switch (action.type) {
    case ActionTypes.UserSet:
      return {
        ...(action as UserSet).user,
        profile: {
          ...(action as UserSet).user.profile,
          email: (action as UserSet).user.profile.email.toLowerCase(),
          picture: (action as UserSet).user.profile.picture
            ? (action as UserSet).user.profile.picture
            : `https://www.gravatar.com/avatar/${Md5.hashStr(
                (action as UserSet).user.profile.email.toLowerCase(),
              ).toString()}`,
        },
      };
    default:
      return state;
  }
}
