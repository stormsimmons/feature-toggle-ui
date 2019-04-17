import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OpenIDService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public user: any = null;

  constructor(protected openIDService: OpenIDService, protected router: Router) {
    this.openIDService.getUser().subscribe((user) => (this.user = user));
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

  public onClickSignOut(): void {
    this.openIDService.signOut().subscribe(console.log);
  }
}
