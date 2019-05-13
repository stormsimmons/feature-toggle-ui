import { AuditsRouteComponent } from './audits-route/audits-route.component';
import { CallbackRouteComponent } from './callback-route/callback-route.component';
import { FeatureToggleEditRouteComponent } from './feature-toggle-edit-route/feature-toggle-edit-route.component';
import { FeatureTogglesRouteComponent } from './feature-toggles-route/feature-toggles-route.component';
import { NgModule } from '@angular/core';
import { OpenIDGuard } from './open-id.guard';
import { ProfileRouteComponent } from './profile-route/profile-route.component';
import { RouterModule, Routes } from '@angular/router';
import { TenantEditRouteComponent } from './tenant-edit-route/tenant-edit-route.component';
import { TenantRouteComponent } from './tenant-route/tenant-route.component';

const routes: Routes = [
  {
    canActivate: [OpenIDGuard],
    component: FeatureTogglesRouteComponent,
    path: '',
  },
  {
    canActivate: [OpenIDGuard],
    component: AuditsRouteComponent,
    path: 'audits',
  },
  {
    canActivate: [OpenIDGuard],
    component: AuditsRouteComponent,
    path: 'audits/:user',
  },
  {
    component: CallbackRouteComponent,
    path: 'callback',
  },
  {
    canActivate: [OpenIDGuard],
    component: FeatureToggleEditRouteComponent,
    path: 'feature-toggle/:key',
  },
  {
    canActivate: [OpenIDGuard],
    component: ProfileRouteComponent,
    path: 'profile',
  },
  {
    canActivate: [OpenIDGuard],
    component: TenantRouteComponent,
    path: 'tenant',
  },
  {
    canActivate: [OpenIDGuard],
    component: TenantEditRouteComponent,
    path: 'tenant/:key',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
