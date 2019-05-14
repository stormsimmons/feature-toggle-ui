import { Action } from '@ngrx/store';
import { ActionTypes } from './action-types';
import { IAudit, IFeatureToggle, ITenant, IUser } from '../../models';

export class AuditsLoad implements Action {
  readonly type = ActionTypes.AuditsLoad;
}

export class AuditsLoadByUser implements Action {
  readonly type = ActionTypes.AuditsLoad;

  constructor(public user: string) {}
}

export class AuditsSet implements Action {
  readonly type = ActionTypes.AuditsSet;

  constructor(public audits: Array<IAudit>) {}
}

export class FeatureToggleCreate implements Action {
  readonly type = ActionTypes.FeatureToggleCreate;

  constructor(public featureToggle: IFeatureToggle, public includeArchived: boolean) {}
}

export class FeatureToggleUpdate implements Action {
  readonly type = ActionTypes.FeatureToggleUpdate;

  constructor(public featureToggle: IFeatureToggle, public includeArchived: boolean) {}
}

export class FeatureTogglesLoad implements Action {
  readonly type = ActionTypes.FeatureTogglesLoad;

  constructor(public includeArchived: boolean) {}
}

export class FeatureTogglesSet implements Action {
  readonly type = ActionTypes.FeatureTogglesSet;

  constructor(public featureToggles: Array<IFeatureToggle>) {}
}

export class TenantCreate implements Action {
  readonly type = ActionTypes.TenantCreate;

  constructor(public tenant: ITenant) {}
}

export class TenantUpdate implements Action {
  readonly type = ActionTypes.TenantUpdate;

  constructor(public tenant: ITenant) {}
}

export class TenantUpdateAddUser implements Action {
  readonly type = ActionTypes.TenantUpdateAddUser;

  constructor(public tenant: ITenant, public user: string) {}
}

export class TenantUpdateRemoveUser implements Action {
  readonly type = ActionTypes.TenantUpdateRemoveUser;

  constructor(public tenant: ITenant, public user: string) {}
}

export class TenantsLoad implements Action {
  readonly type = ActionTypes.TenantsLoad;
}

export class TenantsSet implements Action {
  readonly type = ActionTypes.TenantsSet;

  constructor(public tenants: Array<ITenant>) {}
}

export class UserLoad implements Action {
  readonly type = ActionTypes.UserLoad;
}

export class UserSet implements Action {
  readonly type = ActionTypes.UserSet;

  constructor(public user: IUser) {}
}
