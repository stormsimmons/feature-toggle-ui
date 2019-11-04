import { Component, OnInit } from '@angular/core';
import { IFeatureToggle, IAudit, MOCK_DATA, FeatureToggleService, TenantService, AuditService } from '../core';
import { mergeMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import * as Uuid from 'uuid';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-route',
  templateUrl: './home-route.component.html',
  styleUrls: ['./home-route.component.scss'],
})
export class HomeRouteComponent implements OnInit {
  public audits: Array<IAudit> = null;

  public date: number = new Date().getTime();

  public ENVIRONMENT = environment;

  public featureToggles: Array<IFeatureToggle> = null;

  constructor(
    protected auditService: AuditService,
    protected featureToggleService: FeatureToggleService,
    protected oauthService: OAuthService,
    protected router: Router,
    protected tenantService: TenantService,
  ) {}

  public ngOnInit(): void {
    this.tenantService
      .findAll()
      .pipe(mergeMap((x) => (x.length ? of(null) : from(this.oauthService.loadUserProfile()))))
      .pipe(
        mergeMap((x) =>
          !x
            ? of(null)
            : this.tenantService.create({
                key: Uuid.v4(),
                name: x.email.toLowerCase(),
                users: [x.email.toLowerCase()],
              }),
        ),
      )
      .subscribe();

    this.auditService.findAll().subscribe((x: Array<IAudit>) => (this.audits = x));

    this.featureToggleService.findAll(true).subscribe((x: Array<IFeatureToggle>) => (this.featureToggles = x));
  }

  public numberOfFeatureToggles(): number {
    if (!this.featureToggles) {
      return null;
    }

    return this.featureToggles.length;
  }

  public numberOfArchivedFeatureToggles(): number {
    if (!this.featureToggles) {
      return null;
    }

    return this.featureToggles.filter((x: IFeatureToggle) => x.archived).length;
  }

  public onCreateFeatureToggle(featureToggle: IFeatureToggle): void {
    const featureToggles: Array<IFeatureToggle> = this.featureToggles;

    this.featureToggles = null;

    this.featureToggleService.create(featureToggle).subscribe(
      () => {
        this.router.navigateByUrl(`/feature-toggle/${featureToggle.key}/edit`);
      },
      () => {
        this.featureToggles = featureToggles;
      },
    );
  }
}
