import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeRouteComponent } from './home-route/home-route.component';
import { CallbackRouteComponent } from './callback-route/callback-route.component';
import { OpenIDGuard } from './open-id.guard';
import { SignInRouteComponent } from './sign-in-route/sign-in-route.component';
import { AppRouteComponent } from './app-route/app-route.component';
import { CreateFeatureToggleRouteComponent } from './create-feature-toggle-route/create-feature-toggle-route.component';

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
        component: CreateFeatureToggleRouteComponent,
        path: 'feature-toggle/create',
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
