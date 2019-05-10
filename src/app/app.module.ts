import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
  MatExpansionModule,
  MatDividerModule,
} from '@angular/material';
import { FeatureTogglesRouteComponent } from './feature-toggles-route/feature-toggles-route.component';
import { FeatureToggleEditRouteComponent } from './feature-toggle-edit-route/feature-toggle-edit-route.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeatureToggleCreateComponent } from './feature-toggle-create/feature-toggle-create.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OpenIDService, CustomOpenIDService, CustomHttpInterceptor } from '@app/core';
import { CallbackRouteComponent } from './callback-route/callback-route.component';
import { AuditsRouteComponent } from './audits-route/audits-route.component';
import { DocumentationRouteComponent } from './documentation-route/documentation-route.component';

import { AuditModule, FeatureToggleModule, ToolbarModule } from './features';
import { ProfileRouteComponent } from './profile-route/profile-route.component';
import { TenantRouteComponent } from './tenant-route/tenant-route.component';
import { TenantEditRouteComponent } from './tenant-edit-route/tenant-edit-route.component';
import { TenantUserAddComponent } from './tenant-user-add/tenant-user-add.component';

@NgModule({
  declarations: [
    AppComponent,
    FeatureTogglesRouteComponent,
    FeatureToggleEditRouteComponent,
    FeatureToggleCreateComponent,
    CallbackRouteComponent,
    AuditsRouteComponent,
    DocumentationRouteComponent,
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
    MatExpansionModule,
    MatDividerModule,

    AuditModule,
    FeatureToggleModule,
    ToolbarModule,
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
