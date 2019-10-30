import { Component, OnInit, Input } from '@angular/core';
import { IFeatureToggle } from 'src/app/core';

@Component({
  selector: 'app-feature-toggle-list',
  templateUrl: './feature-toggle-list.component.html',
  styleUrls: ['./feature-toggle-list.component.scss'],
})
export class FeatureToggleListComponent implements OnInit {
  @Input()
  public featureToggles: Array<IFeatureToggle> = null;

  constructor() {}

  public ngOnInit() {}
}
