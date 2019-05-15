import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { auditsReducer } from './audits.reducer';
import { environment } from '@environments/environment';
import { featureTogglesReducer } from './feature-toggles.reducer';
import { IState } from '../state';
import { tenantReducer } from './tenant.reducer';
import { tenantsReducer } from './tenants.reducer';
import { userReducer } from './user.reducer';

export const reducers: ActionReducerMap<IState> = {
  audits: auditsReducer,
  featureToggles: featureTogglesReducer,
  tenant: tenantReducer,
  tenants: tenantsReducer,
  user: userReducer,
};

export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];
