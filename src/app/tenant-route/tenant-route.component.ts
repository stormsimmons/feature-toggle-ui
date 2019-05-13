import { BaseComponent, IState } from '@app/core';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-tenant-route',
  templateUrl: './tenant-route.component.html',
  styleUrls: ['./tenant-route.component.scss'],
})
export class TenantRouteComponent extends BaseComponent implements OnInit {
  public displayedColumns: Array<string> = ['name'];

  constructor(store: Store<IState>) {
    super(store);
  }

  public ngOnInit(): void {}
}
