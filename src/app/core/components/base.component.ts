import { environment } from '@environments/environment';
import { IState, TenantsLoad, UserLoad } from '../redux';
import { Store } from '@ngrx/store';
import { OnInit } from '@angular/core';

export class BaseComponent implements OnInit {
  public state: IState = {
    audits: null,
    featureToggles: null,
    tenant: null,
    tenants: null,
    user: null,
  };

  constructor(protected store: Store<IState>) {}

  public ngOnInit(): void {
    this.store.dispatch(new UserLoad());

    if (environment.multiTenancy.enabled) {
      this.store.dispatch(new TenantsLoad());
    }

    this.store.subscribe((state: IState) => {
      this.state = state;
    });
  }
}
