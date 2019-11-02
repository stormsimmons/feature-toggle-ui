import { AppComponent } from './app.component';

import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';

import { HomeRouteComponent } from './home-route/home-route.component';
import { CallbackRouteComponent } from './callback-route/callback-route.component';
import { SignInRouteComponent } from './sign-in-route/sign-in-route.component';

import { AngularMaterialModule } from './angular-material.module';
import { ComponentsModule } from './components';
import { CustomHttpInterceptor } from './core';
import { AppRouteComponent } from './app-route/app-route.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeatureToggleEditRouteComponent } from './feature-toggle-edit-route/feature-toggle-edit-route.component';
import { IntegrationRouteComponent } from './integration-route/integration-route.component';

@NgModule({
  declarations: [
    AppComponent,
    AppRouteComponent,
    HomeRouteComponent,
    CallbackRouteComponent,
    FeatureToggleEditRouteComponent,
    IntegrationRouteComponent,
    SignInRouteComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    AngularMaterialModule,
    ComponentsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
