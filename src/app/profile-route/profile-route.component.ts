import { Component, OnInit } from '@angular/core';
import { OpenIDService, TenantService } from '@app/core';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-profile-route',
  templateUrl: './profile-route.component.html',
  styleUrls: ['./profile-route.component.scss'],
})
export class ProfileRouteComponent implements OnInit {
  public user: any = null;

  constructor(protected openIDService: OpenIDService, protected tenantService: TenantService) {}

  public ngOnInit() {
    this.openIDService.getUser().subscribe((user: any) => (this.user = user));
  }

  public hashedEmailAddress(): string {
    return Md5.hashStr(this.user.profile.email).toString();
  }
}
