import { environment } from '@environments/environment';
import { IState, TenantsSet, UserSet } from '../redux';
import { ITenant } from '../models';
import { OpenIDService, TenantService } from '../services';
import { Store } from '@ngrx/store';

export class BaseComponent {
  public state: IState = {
    tenants: null,
    user: null,
  };

  constructor(
    protected openIdService: OpenIDService,
    protected store: Store<IState>,
    protected tenantService: TenantService,
  ) {
    this.store.subscribe((state: IState) => {
      this.state = state;

      if (!this.state.tenants && environment.multiTenancy.enabled) {
        this.loadTenants();
      }

      if (!this.state.user) {
        this.loadUser();
      }
    });
  }

  protected loadTenants(): void {
    this.tenantService.findAll().subscribe((tenants: Array<ITenant>) => {
      this.store.dispatch(new TenantsSet(tenants));
    });
  }

  protected loadUser(): void {
    this.openIdService.getUser().subscribe((user) => {
      if (!user) {
        setTimeout(() => this.loadUser(), 1000);

        return;
      }

      this.store.dispatch(new UserSet(user));
    });
  }
}
