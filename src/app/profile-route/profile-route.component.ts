import { BaseComponent, IState } from '@app/core';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-profile-route',
  templateUrl: './profile-route.component.html',
  styleUrls: ['./profile-route.component.scss'],
})
export class ProfileRouteComponent extends BaseComponent implements OnInit {
  constructor(store: Store<IState>) {
    super(store);
  }

  public ngOnInit() {}
}
