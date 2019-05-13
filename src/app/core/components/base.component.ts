import { environment } from '@environments/environment';
import { IState, TenantsLoad, UserLoad } from '../redux';
import { Store } from '@ngrx/store';

export class BaseComponent {
  public state: IState = {
    audits: null,
    featureToggles: null,
    tenants: null,
    user: null,
  };

  constructor(protected store: Store<IState>) {
    if (environment.multiTenancy.enabled) {
      this.store.dispatch(new TenantsLoad());
    }

    this.store.dispatch(new UserLoad());

    this.store.subscribe((state: IState) => {
      this.state = state;
    });
  }
}
