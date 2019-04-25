import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatToolbarModule,
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
} from '@angular/material';
import { FeatureTogglesRouteComponent } from './feature-toggles-route/feature-toggles-route.component';
import { FeatureToggleEditRouteComponent } from './feature-toggle-edit-route/feature-toggle-edit-route.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeatureToggleCreateComponent } from './feature-toggle-create/feature-toggle-create.component';
import { HttpClientModule } from '@angular/common/http';
import { OpenIDService, CustomOpenIDService } from './core';
import { CallbackRouteComponent } from './callback-route/callback-route.component';
import { AuditsRouteComponent } from './audits-route/audits-route.component';
import { DocumentationRouteComponent } from './documentation-route/documentation-route.component';
import { RoleBasedAccessControlRouteComponent } from './role-based-access-control-route/role-based-access-control-route.component';
import { RoleBasedAccessControlCreateComponent } from './role-based-access-control-create/role-based-access-control-create.component';

@NgModule({
  declarations: [
    AppComponent,
    FeatureTogglesRouteComponent,
    FeatureToggleEditRouteComponent,
    FeatureToggleCreateComponent,
    CallbackRouteComponent,
    AuditsRouteComponent,
    DocumentationRouteComponent,
    RoleBasedAccessControlRouteComponent,
    RoleBasedAccessControlCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
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
  ],
  providers: [
    {
      provide: OpenIDService,
      useClass: CustomOpenIDService,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [RoleBasedAccessControlCreateComponent, FeatureToggleCreateComponent],
})
export class AppModule {}
