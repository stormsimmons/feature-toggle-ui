import { BaseComponent, IState, OpenIDService, TenantService } from '@app/core';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent {
  @ViewChild('sidenav')
  public sidenav: MatSidenav = null;

  constructor(
    protected openIdService: OpenIDService,
    protected router: Router,
    store: Store<IState>,
    tenantService: TenantService,
  ) {
    super(openIdService, store, tenantService);
  }

  public onClickAudits(): void {
    this.router.navigateByUrl('/audits');
  }

  public onClickDocumentation(): void {
    this.router.navigateByUrl('/documentation');
  }

  public onClickHome(): void {
    this.router.navigateByUrl('');
  }

  public onClickProfile(): void {
    this.router.navigateByUrl('/profile');
  }

  public onClickSignOut(): void {
    this.openIdService.signOut().subscribe();
  }

  public onClickTenants(): void {
    this.router.navigateByUrl('/tenant');
  }
}
