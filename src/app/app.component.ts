import { Component, ViewChild } from '@angular/core';
import { delayWhen, mergeMap, retryWhen, tap } from 'rxjs/operators';
import { ITenant, IUser, OpenIDService, TenantService } from '@app/core';
import { MatSidenav } from '@angular/material';
import { Md5 } from 'ts-md5';
import { of, throwError, timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('sidenav')
  public sidenav: MatSidenav = null;

  public tenants: Array<ITenant> = null;

  public user: IUser = null;

  constructor(
    protected openIdService: OpenIDService,
    protected router: Router,
    protected tenantService: TenantService,
  ) {
    this.tenantService
      .findAll()
      .pipe(mergeMap((tenants: Array<ITenant>) => (tenants.length ? of(tenants) : throwError(new Error()))))
      .pipe(retryWhen((errors) => errors.pipe(delayWhen(() => timer(1000)))))
      .subscribe((tenants: Array<ITenant>) => (this.tenants = tenants));

    this.openIdService
      .getUser()
      .pipe(mergeMap((user: IUser) => (user ? of(user) : throwError(new Error()))))
      .pipe(retryWhen((errors) => errors.pipe(delayWhen(() => timer(1000)))))
      .pipe(tap((user: IUser) => (this.user = user)))
      .pipe(mergeMap(() => this.tenantService.findAll()))
      .pipe(
        mergeMap((tenants: Array<ITenant>) =>
          tenants.length
            ? of(null)
            : this.tenantService.create({
                key: Md5.hashStr(this.user.profile.email).toString(),
                name: `Default (${this.user.profile.email})`,
                users: [this.user.profile.email],
              }),
        ),
      )
      .subscribe();
  }

  public onClickProfile(): void {
    this.router.navigateByUrl('/profile');
  }

  public onClickSignOut(): void {
    this.openIdService.signOut().subscribe();
  }
}
