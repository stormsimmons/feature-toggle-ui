import { Component, OnInit } from '@angular/core';
import { OpenIDService } from '@app/core';

@Component({
  selector: 'app-profile-route',
  templateUrl: './profile-route.component.html',
  styleUrls: ['./profile-route.component.scss'],
})
export class ProfileRouteComponent implements OnInit {
  public user: any = null;

  constructor(protected openIDService: OpenIDService) {}

  public ngOnInit() {
    this.openIDService.getUser().subscribe((user: any) => (this.user = user));
  }
}
