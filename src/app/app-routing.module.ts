import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeatureTogglesRouteComponent } from './feature-toggles-route/feature-toggles-route.component';
import { FeatureToggleEditRouteComponent } from './feature-toggle-edit-route/feature-toggle-edit-route.component';

const routes: Routes = [
  {
    component: FeatureTogglesRouteComponent,
    path: '',
  },
  {
    component: FeatureToggleEditRouteComponent,
    path: 'feature-toggle/:key',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
