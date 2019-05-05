import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OpenIDService } from '@app/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('sidenav')
  public sidenav: MatSidenav = null;

  public user: any = null;

  constructor(protected openIDService: OpenIDService, protected router: Router) {
    this.loadUser();
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
    this.openIDService.signOut().subscribe();
  }

  protected loadUser(): void {
    this.openIDService.getUser().subscribe((user) => {
      if (!user) {
        setTimeout(() => this.loadUser(), 1000);

        return;
      }

      this.user = user;
    });
  }
}
