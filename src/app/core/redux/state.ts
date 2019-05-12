import { ITenant, IUser } from '../models';

export interface IState {
  tenants: Array<ITenant>;

  user: IUser;
}
