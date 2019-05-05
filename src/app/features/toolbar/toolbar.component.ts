import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { OpenIDService } from '@app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input()
  public sidenav: MatSidenav = null;

  constructor(protected openIDService: OpenIDService, protected router: Router) {}

  public ngOnInit(): void {}

  public onClickProfile(): void {
    this.router.navigateByUrl('/profile');
  }

  public onClickSignOut(): void {
    this.openIDService.signOut().subscribe();
  }
}
