import { BaseComponent, IState, ITenant, OpenIDService, TenantService } from '@app/core';
import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent extends BaseComponent implements OnInit {
  @Input()
  public sidenav: MatSidenav = null;

  constructor(
    protected openIdService: OpenIDService,
    protected router: Router,
    store: Store<IState>,
    protected tenantService: TenantService,
  ) {
    super(openIdService, store, tenantService);
  }

  public ngOnInit(): void {}

  public onClickManageTenants(): void {
    this.router.navigateByUrl('/tenant');
  }

  public onClickProfile(): void {
    this.router.navigateByUrl('/profile');
  }

  public onClickSignOut(): void {
    this.openIdService.signOut().subscribe();
  }

  public onClickTenant(tenant: ITenant): void {
    this.tenantService.setSelectedTenant(tenant).subscribe(() => {
      window.location.reload();
    });
  }
}
