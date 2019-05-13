import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuditModule, FeatureToggleModule, ToolbarModule } from './features';
import { AuditsRouteComponent } from './audits-route/audits-route.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CallbackRouteComponent } from './callback-route/callback-route.component';
import { EffectsModule } from '@ngrx/effects';
import { FeatureToggleCreateComponent } from './feature-toggle-create/feature-toggle-create.component';
import { FeatureToggleEditRouteComponent } from './feature-toggle-edit-route/feature-toggle-edit-route.component';
import { FeatureTogglesRouteComponent } from './feature-toggles-route/feature-toggles-route.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ProfileRouteComponent } from './profile-route/profile-route.component';
import { StoreModule } from '@ngrx/store';
import { TenantEditRouteComponent } from './tenant-edit-route/tenant-edit-route.component';
import { TenantRouteComponent } from './tenant-route/tenant-route.component';
import { TenantUserAddComponent } from './tenant-user-add/tenant-user-add.component';
import {
  CustomHttpInterceptor,
  CustomOpenIDService,
  metaReducers,
  OpenIDService,
  reducers,
  AuditsEffects,
  UserEffects,
  TenantEffects,
  FeatureToggleEffects,
} from '@app/core';
import {
  MatTableModule,
  MatListModule,
  MatCheckboxModule,
  MatButtonModule,
  MatChipsModule,
  MatCardModule,
  MatSelectModule,
  MatInputModule,
  MatIconModule,
  MatSidenavModule,
  MatDialogModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatDividerModule,
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    FeatureTogglesRouteComponent,
    FeatureToggleEditRouteComponent,
    FeatureToggleCreateComponent,
    CallbackRouteComponent,
    AuditsRouteComponent,
    ProfileRouteComponent,
    TenantRouteComponent,
    TenantEditRouteComponent,
    TenantUserAddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatListModule,
    MatCheckboxModule,
    MatButtonModule,
    MatChipsModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatDividerModule,

    AuditModule,
    FeatureToggleModule,
    ToolbarModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([AuditsEffects, FeatureToggleEffects, TenantEffects, UserEffects]),
  ],
  providers: [
    {
      provide: OpenIDService,
      useClass: CustomOpenIDService,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [FeatureToggleCreateComponent, TenantUserAddComponent],
})
export class AppModule {}
