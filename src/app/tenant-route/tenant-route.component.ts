import { BaseComponent, IState, OpenIDService, TenantService } from '@app/core';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-tenant-route',
  templateUrl: './tenant-route.component.html',
  styleUrls: ['./tenant-route.component.scss'],
})
export class TenantRouteComponent extends BaseComponent implements OnInit {
  public displayedColumns: Array<string> = ['name'];

  constructor(openIdService: OpenIDService, store: Store<IState>, tenantService: TenantService) {
    super(openIdService, store, tenantService);
  }

  public ngOnInit(): void {}
}
