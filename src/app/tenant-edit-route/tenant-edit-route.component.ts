import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ITenant, TenantService } from '@app/core';
import { MatDialog, MatTable } from '@angular/material';
import { TenantUserAddComponent } from '@app/tenant-user-add/tenant-user-add.component';

@Component({
  selector: 'app-tenant-edit-route',
  templateUrl: './tenant-edit-route.component.html',
  styleUrls: ['./tenant-edit-route.component.scss'],
})
export class TenantEditRouteComponent implements OnInit {
  public displayedColumns: Array<string> = ['user', 'action'];

  @ViewChild('table')
  public table: MatTable<ITenant> = null;

  public tenant: ITenant = null;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected dialog: MatDialog,
    protected tenantService: TenantService,
  ) {}

  public ngOnInit(): void {
    const key: string = this.activatedRoute.snapshot.params.key;

    this.tenantService.find(key).subscribe((tenant: ITenant) => (this.tenant = tenant));
  }

  public onClickTenantAddUser(tenant: ITenant): void {
    const dialogRef = this.dialog.open(TenantUserAddComponent, {
      data: tenant,
    });

    dialogRef.afterClosed().subscribe(() => {
      const key: string = this.activatedRoute.snapshot.params.key;

      this.tenantService.find(key).subscribe((x: ITenant) => (this.tenant = x));
    });
  }

  public onClickTenantRemoveUser(tenant: ITenant, user: string): void {
    const index: number = tenant.users.indexOf(user);

    if (index === -1) {
      return;
    }

    tenant.users.splice(index, 1);

    this.table.renderRows();

    this.tenantService.update(tenant).subscribe();
  }
}
