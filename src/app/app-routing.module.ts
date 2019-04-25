import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeatureTogglesRouteComponent } from './feature-toggles-route/feature-toggles-route.component';
import { FeatureToggleEditRouteComponent } from './feature-toggle-edit-route/feature-toggle-edit-route.component';
import { OpenIDGuard } from './open-id.guard';
import { CallbackRouteComponent } from './callback-route/callback-route.component';
import { AuditsRouteComponent } from './audits-route/audits-route.component';
import { DocumentationRouteComponent } from './documentation-route/documentation-route.component';

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
    component: CallbackRouteComponent,
    path: 'callback',
  },
  {
    component: DocumentationRouteComponent,
    path: 'documentation',
  },
  {
    canActivate: [OpenIDGuard],
    component: FeatureToggleEditRouteComponent,
    path: 'feature-toggle/:key',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
