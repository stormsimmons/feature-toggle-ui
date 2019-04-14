import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(protected router: Router) {}

  public onClickAudit(): void {
    this.router.navigateByUrl('');
  }

  public onClickHome(): void {
    this.router.navigateByUrl('');
  }
}
