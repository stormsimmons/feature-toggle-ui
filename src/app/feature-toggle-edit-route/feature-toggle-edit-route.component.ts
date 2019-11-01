import { Component, OnInit } from '@angular/core';
import { FeatureToggleService, IFeatureToggle } from '../core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feature-toggle-edit-route',
  templateUrl: './feature-toggle-edit-route.component.html',
  styleUrls: ['./feature-toggle-edit-route.component.scss'],
})
export class FeatureToggleEditRouteComponent implements OnInit {
  public date: number = new Date().getTime();

  public environmentdisplayedColumns: Array<string> = ['value'];

  public featureToggle: IFeatureToggle = null;

  constructor(protected activatedRoute: ActivatedRoute, protected featureToggleService: FeatureToggleService) {}

  public ngOnInit(): void {
    this.featureToggleService.find(this.activatedRoute.snapshot.params.key).subscribe((x) => (this.featureToggle = x));
  }

  public onChangeFeatureToggle(): void {
    this.featureToggleService.update(this.featureToggle).subscribe();
  }
}
