import { Component, OnInit } from '@angular/core';
import { IEnvironment } from '../core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-feature-toggle-route',
  templateUrl: './create-feature-toggle-route.component.html',
  styleUrls: ['./create-feature-toggle-route.component.scss'],
})
export class CreateFeatureToggleRouteComponent implements OnInit {
  public date: number = new Date().getTime();

  public displayedColumns: Array<string> = ['key', 'name'];

  public environments: Array<IEnvironment> = [
    {
      consumers: [],
      enabled: false,
      enabledForAll: false,
      key: 'development',
      name: 'Development',
    },
    {
      consumers: [],
      enabled: false,
      enabledForAll: false,
      key: 'quality-assurance',
      name: 'Quality Assurance',
    },
    {
      consumers: [],
      enabled: false,
      enabledForAll: false,
      key: 'user-acceptance-testing',
      name: 'User Acceptance Testing',
    },
    {
      consumers: [],
      enabled: false,
      enabledForAll: false,
      key: 'staging',
      name: 'Staging',
    },
    {
      consumers: [],
      enabled: false,
      enabledForAll: false,
      key: 'production',
      name: 'Production',
    },
  ];

  public formGroup: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  });

  constructor() {}

  public ngOnInit(): void {}

  public toSlug(str: string): string {
    if (!str) {
      return str;
    }
    
    return str
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }
}
