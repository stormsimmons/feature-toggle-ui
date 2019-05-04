import { IRole } from './models';

export class RoleBasedAccessControl {
  constructor(protected roles: Array<IRole>) {}

  public authorized(roleName: string, resource: string, operation: string): boolean {
    if (!roleName || !resource || !operation) {
      return false;
    }

    const role: IRole = this.roles.find((x: IRole) => x.name === roleName);

    if (!role) {
      return false;
    }

    if (role.permissions) {
      for (const permission of role.permissions) {
        if (permission.operation === operation && permission.resource === resource) {
          return true;
        }
      }
    }

    if (role.inheritedRoles) {
      for (const inheritedRole of role.inheritedRoles) {
        if (this.authorized(inheritedRole, resource, operation)) {
          return true;
        }
      }
    }

    return false;
  }
}
