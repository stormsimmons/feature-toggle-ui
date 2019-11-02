import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-integration-route',
  templateUrl: './integration-route.component.html',
  styleUrls: ['./integration-route.component.scss'],
})
export class IntegrationRouteComponent implements OnInit {
  public date: number = new Date().getTime();

  public ENVIRONMENT = environment;

  public programmingLanguages: Array<Array<string>> = [
    ['C++', 'CSharp (C#)'],
    ['Go', 'Java'],
    ['JavaScript', 'Kotlin'],
    ['Objective-C', 'PowerShell'],
    ['Python', 'Ruby'],
    ['Swift'],
  ];

  constructor() {}

  public ngOnInit(): void {}
}
