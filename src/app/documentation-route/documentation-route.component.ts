import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-documentation-route',
  templateUrl: './documentation-route.component.html',
  styleUrls: ['./documentation-route.component.scss'],
})
export class DocumentationRouteComponent implements OnInit {
  public ENVIRONMENT = environment;

  constructor() {}

  public ngOnInit(): void {}
}
