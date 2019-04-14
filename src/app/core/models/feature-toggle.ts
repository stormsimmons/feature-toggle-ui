import { IEnvironment } from './environment';

export interface IFeatureToggle {
  createdAt: number;

  environments: Array<IEnvironment>;

  key: string;

  name: string;
}
