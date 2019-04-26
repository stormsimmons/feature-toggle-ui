import { IFeatureToggle } from '../core';

export class BaseComponent {
  public authorized(user: any, featureToggle: IFeatureToggle, roles: Array<string>): boolean {
    if (featureToggle.user === user.profile.email) {
      return true;
    }

    if (
      featureToggle.roleBasedAccessControlItems.find((x) => x.subject === user.profile.email && roles.includes(x.role))
    ) {
      return true;
    }

    return false;
  }
}
