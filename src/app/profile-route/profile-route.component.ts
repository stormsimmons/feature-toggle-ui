import { Component, OnInit, ViewChild } from '@angular/core';
import { OpenIDService, ITenant, TenantService } from '@app/core';
import { Md5 } from 'ts-md5';
import { environment } from '@environments/environment';
import { MatTable } from '@angular/material';

@Component({
  selector: 'app-profile-route',
  templateUrl: './profile-route.component.html',
  styleUrls: ['./profile-route.component.scss'],
})
export class ProfileRouteComponent implements OnInit {
  public displayedColumns: Array<string> = ['user', 'action'];

  @ViewChild('table')
  public table: MatTable<ITenant> = null;

  public tenants: Array<ITenant> = null;

  public user: any = null;

  constructor(protected openIDService: OpenIDService, protected tenantService: TenantService) {}

  public ngOnInit() {
    this.openIDService.getUser().subscribe((user: any) => (this.user = user));

    if (environment.multiTenancy.enabled) {
      this.tenantService.findAll().subscribe((tenants: Array<ITenant>) => (this.tenants = tenants));
    }
  }

  public hashedEmailAddress(): string {
    return Md5.hashStr(this.user.profile.email).toString();
  }

  public onClickTenantAddUser(tenant: ITenant): void {}

  public onClickTenantRemoveUser(tenant: ITenant, user: string): void {
    const index: number = tenant.users.indexOf(user);

    if (index === -1) {
      return;
    }

    tenant.users.splice(index, 1);

    this.table.renderRows();

    // this.tenantService.update(tenant).subscribe();
  }
}
