import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeRouteComponent } from './home-route/home-route.component';
import { CallbackRouteComponent } from './callback-route/callback-route.component';
import { OpenIDGuard } from './open-id.guard';
import { SignInRouteComponent } from './sign-in-route/sign-in-route.component';
import { AppRouteComponent } from './app-route/app-route.component';
import { FeatureToggleEditRouteComponent } from './feature-toggle-edit-route/feature-toggle-edit-route.component';
import { IntegrationRouteComponent } from './integration-route/integration-route.component';
import { FeatureTogglesRouteComponent } from './feature-toggles-route/feature-toggles-route.component';

const routes: Routes = [
  { path: '', redirectTo: '/app/home', pathMatch: 'full' },
  {
    canActivate: [OpenIDGuard],
    children: [
      {
        component: HomeRouteComponent,
        path: 'home',
      },
      {
        component: FeatureTogglesRouteComponent,
        path: 'feature-toggles',
      },
      {
        component: FeatureToggleEditRouteComponent,
        path: 'feature-toggles/:key/edit',
      },
      {
        component: IntegrationRouteComponent,
        path: 'integration',
      },
    ],
    component: AppRouteComponent,
    path: 'app',
  },
  {
    component: CallbackRouteComponent,
    path: 'callback',
  },
  {
    component: SignInRouteComponent,
    path: 'sign-in',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
