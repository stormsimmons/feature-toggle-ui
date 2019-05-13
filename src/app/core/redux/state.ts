import { IAudit, IFeatureToggle, ITenant, IUser } from '../models';

export interface IState {
  audits: Array<IAudit>;

  featureToggles: Array<IFeatureToggle>;

  tenants: Array<ITenant>;

  user: IUser;
}
