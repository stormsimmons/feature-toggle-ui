import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-integration-route',
  templateUrl: './integration-route.component.html',
  styleUrls: ['./integration-route.component.scss'],
})
export class IntegrationRouteComponent implements OnInit {
  public date: number = new Date().getTime();

  constructor() {}

  public ngOnInit(): void {}
}
