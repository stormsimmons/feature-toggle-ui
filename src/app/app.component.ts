import { BaseComponent, IState, OpenIDService } from '@app/core';
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

  constructor(protected openIdService: OpenIDService, protected router: Router, store: Store<IState>) {
    super(store);
  }

  public onClickProfile(): void {
    this.router.navigateByUrl('/profile');
  }

  public onClickSignOut(): void {
    this.openIdService.signOut().subscribe();
  }
}
