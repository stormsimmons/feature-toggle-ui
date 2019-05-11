import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { OpenIDService, TenantService, ITenant } from '@app/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input()
  public sidenav: MatSidenav = null;

  public tenants: Array<ITenant> = null;

  constructor(
    protected openIDService: OpenIDService,
    protected router: Router,
    protected tenantService: TenantService,
  ) {}

  public ngOnInit(): void {
    if (environment.multiTenancy.enabled) {
      this.tenantService.findAll().subscribe((tenants: Array<ITenant>) => (this.tenants = tenants));
    }
  }

  public onClickManageTenants(): void {
    this.router.navigateByUrl('/tenant');
  }

  public onClickProfile(): void {
    this.router.navigateByUrl('/profile');
  }

  public onClickSignOut(): void {
    this.openIDService.signOut().subscribe();
  }

  public onClickTenant(tenant: ITenant): void {
    this.tenantService.setSelectedTenant(tenant).subscribe(() => {
      window.location.reload();
    });
  }
}
