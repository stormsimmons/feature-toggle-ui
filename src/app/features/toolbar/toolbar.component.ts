import { Component, Input, OnInit } from '@angular/core';
import { delayWhen, mergeMap, retryWhen } from 'rxjs/operators';
import { ITenant, OpenIDService, TenantService } from '@app/core';
import { MatSidenav } from '@angular/material';
import { of, throwError, timer } from 'rxjs';
import { Router } from '@angular/router';

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
    protected openIdService: OpenIDService,
    protected router: Router,
    protected tenantService: TenantService,
  ) {}

  public ngOnInit(): void {
    this.tenantService
      .findAll()
      .pipe(mergeMap((tenants: Array<ITenant>) => (tenants.length ? of(tenants) : throwError(new Error()))))
      .pipe(retryWhen((errors) => errors.pipe(delayWhen(() => timer(1000)))))
      .subscribe((tenants: Array<ITenant>) => (this.tenants = tenants));
  }

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
    // TODO
  }
}
