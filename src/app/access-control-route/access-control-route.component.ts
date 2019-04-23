import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-access-control-route',
  templateUrl: './access-control-route.component.html',
  styleUrls: ['./access-control-route.component.scss'],
})
export class AccessControlRouteComponent implements OnInit {
  public accessControls: Array<any> = [];

  public displayedColumns: Array<string> = ['user', 'role'];

  constructor() {}

  public ngOnInit(): void {}
}
