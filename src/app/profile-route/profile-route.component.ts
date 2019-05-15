import { Component, OnInit } from '@angular/core';
import { delayWhen, mergeMap, retryWhen } from 'rxjs/operators';
import { IUser, OpenIDService } from '@app/core';
import { of, throwError, timer } from 'rxjs';

@Component({
  selector: 'app-profile-route',
  templateUrl: './profile-route.component.html',
  styleUrls: ['./profile-route.component.scss'],
})
export class ProfileRouteComponent implements OnInit {
  public user: IUser = null;

  constructor(protected openIdService: OpenIDService) {}

  public ngOnInit() {
    this.openIdService
      .getUser()
      .pipe(mergeMap((user: IUser) => (user ? of(user) : throwError(new Error()))))
      .pipe(retryWhen((errors) => errors.pipe(delayWhen(() => timer(1000)))))
      .subscribe((user: IUser) => (this.user = user));
  }
}
