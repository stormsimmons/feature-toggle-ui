import { Component, OnInit } from '@angular/core';
import { IFeatureToggle, FeatureToggleService } from '../core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-role-based-access-control-route',
  templateUrl: './role-based-access-control-route.component.html',
  styleUrls: ['./role-based-access-control-route.component.scss'],
})
export class RoleBasedAccessControlRouteComponent implements OnInit {
  public displayedColumnsForRoleBasedAccessControlItems: Array<string> = ['subject', 'role'];

  public featureToggle: IFeatureToggle = null;

  constructor(protected activatedRoute: ActivatedRoute, protected featureToggleService: FeatureToggleService) {}

  public ngOnInit(): void {
    const key: string = this.activatedRoute.snapshot.params.key;

    this.featureToggleService.find(key).subscribe((featureToggle: IFeatureToggle) => {
      this.featureToggle = featureToggle;
    });
  }
}
