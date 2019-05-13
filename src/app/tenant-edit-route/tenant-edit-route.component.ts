import { ActivatedRoute } from '@angular/router';
import { BaseComponent, IState, ITenant, TenantUpdate } from '@app/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { empty } from 'rxjs';
import { MatDialog, MatTable } from '@angular/material';
import { Store } from '@ngrx/store';
import { TenantUserAddComponent } from '@app/tenant-user-add/tenant-user-add.component';

@Component({
  selector: 'app-tenant-edit-route',
  templateUrl: './tenant-edit-route.component.html',
  styleUrls: ['./tenant-edit-route.component.scss'],
})
export class TenantEditRouteComponent extends BaseComponent implements OnInit {
  public displayedColumns: Array<string> = ['user', 'action'];

  @ViewChild('table')
  public table: MatTable<ITenant> = null;

  public tenant: ITenant = null;

  constructor(protected activatedRoute: ActivatedRoute, protected dialog: MatDialog, store: Store<IState>) {
    super(store);
  }

  public ngOnInit(): void {
    const key: string = this.activatedRoute.snapshot.params.key;

    this.store.subscribe((state: IState) => {
      if (state.tenants) {
        this.tenant = state.tenants.find((x: ITenant) => x.key === key);
      }
    });
  }

  public onClickTenantAddUser(tenant: ITenant): void {
    const dialogRef = this.dialog.open(TenantUserAddComponent, {
      data: tenant,
    });

    dialogRef.afterClosed().subscribe((dialogResult: string) => {
      if (!tenant) {
        return empty();
      }

      tenant.users.push(dialogResult);

      this.table.renderRows();

      this.store.dispatch(new TenantUpdate(tenant));
    });
  }

  public onClickTenantRemoveUser(tenant: ITenant, user: string): void {
    const index: number = tenant.users.indexOf(user);

    if (index === -1) {
      return;
    }

    tenant.users.splice(index, 1);

    this.table.renderRows();

    this.store.dispatch(new TenantUpdate(tenant));
  }
}
