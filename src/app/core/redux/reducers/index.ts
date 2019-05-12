import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '@environments/environment';
import { userReducer } from './user.reducer';
import { IState } from '../state';
import { tenantsReducer } from './tenants.reducer';

export const reducers: ActionReducerMap<IState> = {
  tenants: tenantsReducer,
  user: userReducer,
};

export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];
