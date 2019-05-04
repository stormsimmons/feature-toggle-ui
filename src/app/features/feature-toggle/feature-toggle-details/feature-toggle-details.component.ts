import { Component, OnInit, Input } from '@angular/core';
import { IFeatureToggle } from '@app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feature-toggle-details',
  templateUrl: './feature-toggle-details.component.html',
  styleUrls: ['./feature-toggle-details.component.scss'],
})
export class FeatureToggleDetailsComponent implements OnInit {
  @Input()
  public featureToggle: IFeatureToggle = null;

  constructor(protected router: Router) {}

  public ngOnInit(): void {}
}
