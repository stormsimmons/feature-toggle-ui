import { Action } from '@ngrx/store';
import { ActionTypes } from './action-types';
import { ITenant, IUser } from '../../models';

export class TenantsSet implements Action {
  readonly type = ActionTypes.TenantsSet;

  constructor(public tenants: Array<ITenant>) {}
}

export class UserSet implements Action {
  readonly type = ActionTypes.UserSet;

  constructor(public user: IUser) {}
}
