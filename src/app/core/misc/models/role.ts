import { IPermission } from './permission';

export interface IRole {
  inheritedRoles: Array<string>;
  name: string;
  permissions: Array<IPermission>;
}
